'use server'
import {API_BASE_URL} from '@/app/lib/api-client'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any,formData:FormData){
    const email = formData.get('correo')
    const password = formData.get('contraseña')

    console.log('Este es el correo: ',email)

    try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email':email, 'password':password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Credenciales incorrectas.' };
    }

    // Extraer token (funciona con 'token' o 'accessToken')
    const token = data.token || data.access_token;

    if (!token) {
      return { error: 'Error al recibir el token de sesión.' };
    }

    // Guardar cookie HTTP-Only segura en el navegador
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600, // 7 días
    });
  } catch (error) {
    console.error(error)
    return { error: 'Error de conexión con el servidor.' }
  }

  // Redireccionar al catálogo o inicio tras login exitoso
  redirect('/');

}