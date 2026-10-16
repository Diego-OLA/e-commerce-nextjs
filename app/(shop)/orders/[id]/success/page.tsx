import Link from 'next/link'
import { apiFetch } from '@/app/lib/api-client'

interface SuccessPageProps {
  params: Promise<{ id: string }>
}

interface OrderDetails {
  id: string | number
  total: number
  status: string
  created_at?: string
}

export default async function OrderSuccessPage({ params }: SuccessPageProps) {
  const { id } = await params

  // Intenta obtener los detalles finales de la orden pagada desde la API
  let order: OrderDetails | null = null
  try {
    order = await apiFetch<OrderDetails>(`/orders/${id}`)
  } catch (error) {
    console.error('Error al obtener el resumen de la orden:', error)
  }

  return (
    <main className="max-w-md mx-auto my-12 p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
      {/* Ícono Check de Confirmación */}
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">¡Pago Realizado con Éxito!</h1>
      <p className="text-sm text-gray-600 mb-6">
        Gracias por tu compra. Tu pedido <span className="font-semibold text-gray-800">#{id}</span> ya está en proceso.
      </p>

      {/* Tarjeta de Resumen */}
      {order && (
        <div className="bg-slate-50 p-4 rounded-md text-left mb-6 space-y-2 border border-slate-200 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Número de Orden:</span>
            <span className="font-medium text-gray-800">#{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estado del Pago:</span>
            <span className="font-semibold text-emerald-600 uppercase">{order.status}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 mt-2 font-bold text-gray-900">
            <span>Total Pagado:</span>
            <span className="text-emerald-600">${order.total}</span>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex flex-col gap-2">
        <Link
          href="/catalogo"
          className="w-full py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
        >
          Seguir Comprando
        </Link>
        <Link
          href="/"
          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md transition-colors"
        >
          Ver Mis Pedidos
        </Link>
      </div>
    </main>
  )
}