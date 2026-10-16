'use client'
import Link from "next/link";
import { Product } from "../lib/types/product";

interface ProductCardProps {
    product:Product,
    btn:boolean,
    onAdd?:(product: Product )=> void;
    
}

export default function ProductCard({product,btn,onAdd}: ProductCardProps){
    return(
        <>
         <article className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            product.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {product.is_active ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <p className="mb-3 text-sm text-gray-600">
        {product.description}
      </p>

      <p className="text-xs text-gray-500">
        SKU: {product.sku}
      </p>

      <p className="my-4 text-2xl font-bold text-gray-900">
        ${product.price}
      </p>

      <p className="mb-4 text-sm text-gray-600">
        Stock: {product.stock} unidades
      </p>

      <div className="flex gap-2 border-t border-gray-100 pt-4">

       {btn && (
        
        <Link href={`catalogo/products/${product.id}`}>
        <button
          type="button"
          className="flex-1 rounded-lg bg-slate-100 px-4 py-2 text-sm text-blue-600 hover:bg-slate-300"
        >
          Ver detalles
        </button>

        
        </Link>)
        }


        <button
          onClick={()=> {if(onAdd){ onAdd(product)}}}
          type="button"
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Comprar
        </button>

        
      </div>
    </article>

        </>
    )
}