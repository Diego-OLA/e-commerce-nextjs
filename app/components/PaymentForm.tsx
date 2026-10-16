'use client'

import { useState, useTransition } from 'react'
import { processPaymentAction } from '../actions/order'  

interface PaymentFormProps {
  orderId: string
}

export default function PaymentForm({ orderId }: PaymentFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handlePayment = () => {
    setError(null)

    startTransition(async () => {
      // Pasa el ID del método de pago dinámico o fijo
      const result = await processPaymentAction(orderId, 'pm_card_visa')

      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Método de Pago</h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {error}
        </div>
      )}

      <div className="p-3 border rounded-md bg-gray-50 flex items-center justify-between">
        <span className="font-medium text-gray-700">Tarjeta Visa (Prueba)</span>
        <span className="text-sm text-gray-500">•••• pm_card_visa</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={isPending}
        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50"
      >
        {isPending ? 'Procesando Pago...' : 'Pagar Orden'}
      </button>
    </div>
  )
}