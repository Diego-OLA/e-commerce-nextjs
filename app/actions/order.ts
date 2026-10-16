// app/actions/orders.ts
'use server'

import { apiFetch } from '@/app/lib/api-client'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { CreateOrderPayload } from '../lib/types/order'
export async function processPaymentAction(orderId: string, paymentMethodId: string) {
  try {
    await apiFetch(`/orders/${orderId}/payment`, {
      method: 'POST',
      body: JSON.stringify({ payment_method_id: paymentMethodId }),
    })

    // Invalida la caché para actualizar el estado de la orden a 'pagada'
      revalidateTag(`order-${orderId}`, { expire: 0 })
    revalidateTag('orders', { expire: 0 })
    
  } catch (error: any) {
  
  if (error.message === 'UNAUTHENTICATED') {
    redirect('/login')
  }
  return { error: error.message }
  }

  // Redirección tras pago exitoso
  
  redirect(`/orders/${orderId}/success`)
}
export async function createOrderAction(payload: CreateOrderPayload) {
  // Validación básica
  if (!payload.items || payload.items.length === 0) {
    return { error: 'El carrito no puede estar vacío.' };
  }

  let newOrderId: string;

  try {
    // Petición POST a la API de FastAPI / Swagger
    const order = await apiFetch<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    newOrderId = order.id;

    // Invalida la caché
    revalidateTag('cart',{expire:0});
    revalidateTag('orders',{expire:0});
  } catch (error: any) {
  
  if (error.message === 'UNAUTHENTICATED') {
    redirect('/login')
  }
  return { error: error.message }
  }

  // Redirige a la página de la orden/pago
  redirect(`/orders/${newOrderId}`);
}