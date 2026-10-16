// lib/api-client.ts
import { cookies } from 'next/headers';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface FetchOptions extends RequestInit {
  tags?: string[];
  revalidate?: number | false;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    next: {
      tags: options.tags,
      revalidate: options.revalidate,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error HTTP ${response.status}`);
  }

  if (!response.ok) {
  if (response.status === 401) {
    // El backend rechazó la petición por token vencido o inválido
    throw new Error('UNAUTHENTICATED')
  }
  const errorData = await response.json().catch(() => ({}))
  throw new Error(errorData.message || 'Error en la petición')
}
  return response.json();
}