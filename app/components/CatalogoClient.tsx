'use client'
import { useState } from "react";
import { Product } from "../lib/types/product"
import ProductCard from "./ProductCard"
import ShopCart from "./ShopCart";

interface CatalogoProp{
    products:Product[];
 

}


export default function CatalogoClient({products}:CatalogoProp){

    const [items,setItems] = useState<Product[]>([])
    const [openCart,setOpenCart] =useState<boolean>(false)
    
    const deleteFromCart =(id:number)=>{
   const newItems = items.filter(prod => prod.id != id )
    setItems(newItems) 

   console.log("funcion delete", items)

  }

    const selectedItems = (prod:Product) => {

          
          const inItems = items.find(i => i.id === prod.id)
          if(inItems) return
        setItems(currentItems => [...currentItems, prod])
          console.log(items)
    }

    return(
        <>
        <div className="flex flex-col h-screen w-full items-center  bg-sky-100">
            <h2 className="text-2xl font-semibold p-4"> Catalogo de Productos</h2>
            <div className="grid grid-colds-1 md:grid-cols-3 gap-4">
            {products.map(p=> (
                
                 <ProductCard product={p} btn={true} onAdd={selectedItems} key={p.id}/>
            ))}
            </div>

            
               {openCart && (
            <div className="fixed bottom-20 right-5 z-40 max-h-[70vh] md:w-120 w-70 overflow-y-auto rounded-xl bg-white p-4 shadow-xl">
                
                <ShopCart items={items} onRemove={deleteFromCart} key={null} />
            </div>
        )}

        <button
            type="button"
            onClick={() => setOpenCart(open => !open)}
            className="fixed bottom-5 right-5 z-50 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg hover:bg-blue-700"
            aria-expanded={openCart}
            aria-label={openCart ? "Cerrar carrito" : "Abrir carrito"}
        >
            🛒 Carrito ({items.length})
        </button>
           
        </div>



        
        </>
        )
}