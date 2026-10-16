'use client'

import { useState, useTransition } from "react"
import { Product } from "../lib/types/product"

import { createOrderAction } from "../actions/order"

interface CartProps {
  items: Product[]
  onRemove?: (id: number) => void
}

export default function ShopCart({ items }: CartProps) {
  const [cantidades, setCantidades] = useState<Record<string | number, number>>({})
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleCantidadChange = (id: string | number, value: number) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const calcularTotal = () => {
    return items.reduce((acc, item) => {
      const qty = cantidades[item.id] ?? 1
      return acc + item.price * qty
    }, 0)
  }

  // Handler para crear la orden
  const handleHacerPedido = () => {
    setError(null)

    // Formateamos los items con sus cantidades seleccionadas
    const payloadItems = items.map((item) => ({
      product_id: String(item.id),
      quantity: cantidades[item.id] ?? 1,
    }))

    startTransition(async () => {
      const result = await createOrderAction({ items: payloadItems })

      
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="bg-slate-100 p-4 rounded-lg">
      <div className="bg-blue-500 text-white flex flex-row gap-3.5 p-2 mb-1 justify-between rounded-t">
        <span className="font-semibold w-1/3">Producto</span>
        <span className="font-semibold w-1/4 text-center">Precio</span>
        <span className="font-semibold w-1/3 text-right">Cantidad / Stock</span>
      </div>

      {items.map((i) => {
        const cantidadActual = cantidades[i.id] ?? 1

        return (
          <div key={i.id} className="bg-slate-200 flex flex-row gap-3.5 p-2 mb-1 justify-between items-center rounded">
            <div className="w-1/3">
              <span>{i.name}</span>
            </div>
            <div className="w-1/4 text-center">
              <span>${i.price}</span>
            </div>
            <div className="w-1/3 flex items-center justify-end gap-2">
              <input
                className="w-16 p-1 bg-slate-300 border border-slate-400 rounded text-center"
                type="number"
                min={1}
                max={i.stock}
                value={cantidadActual}
                onChange={(e) => handleCantidadChange(i.id, Number(e.target.value))}
                disabled={isPending}
              />
              <span className="text-xs text-gray-600">/ {i.stock}</span>
            </div>
          </div>
        )
      })}

      {/* Mensaje de error si la API rechaza el pedido */}
      {error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Resumen del Total */}
      <div className="mt-4 p-3 bg-white rounded-md flex justify-between items-center font-bold">
        <span>Total a pagar:</span>
        <span className="text-emerald-600 text-xl">${calcularTotal().toFixed(2)}</span>
      </div>

      {/* Botón conectado a la Server Action */}
      <button
        onClick={handleHacerPedido}
        disabled={isPending || items.length === 0}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full p-2 rounded mt-3 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Creando Orden...' : 'Hacer Pedido'}
      </button>
    </div>
  )
}