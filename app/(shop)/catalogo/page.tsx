
import CatalogoClient from "@/app/components/CatalogoClient"
import ProductCard from "@/app/components/ProductCard"
import ProductSkeleton from "@/app/components/ProductSkeleton"
import { apiFetch } from "@/app/lib/api-client"
import { ApiResponse } from "@/app/lib/types/api"
import { Product } from "@/app/lib/types/product"
import Link from "next/link"
import { Suspense } from "react"

export default async function Catalogo(){
    let products:Product[] = []
    const data:any = await apiFetch<any>('/products',
        {tags:['products'],
            revalidate: 60, // Caché por 60 segundos
        })

    
    if(data.data){
        console.log(data.data)
         products = data.data
        console.log(products)
    }
    console.log('Data might be empty', data)
        
    return(
        <>
        <Suspense fallback={<ProductSkeleton />}>
        <CatalogoClient products={products} />
      </Suspense>
        </>
    
    )
}