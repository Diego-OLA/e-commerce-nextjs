
import { Product } from "@/app/lib/types/product"
import { apiFetch } from "@/app/lib/api-client"
import { Metadata } from "next"
import ProductCard from "@/app/components/ProductCard"
interface PageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${id}`, {
      tags: [`product-${id}`],
      revalidate: 60, // Caché en servidor por 60s
    })
  } catch {
    return null
  }
}

export async function generateMetadata({params}:PageProps):Promise<Metadata>{
    const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  return {
    title: `${product.name} | Mi E-Commerce`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  // En Next.js 15/16 'params' es una Promesa que debe ser esperada con await
  const { id } = await params
  const product = await getProduct(id)

  // Si el producto no existe en la API, redirige a la página 404 nativa
  if (!product) {
    //notFound()
  }
  return(
    <>
    <div className="bg-sky-100 flex flex-col items-center h-screen justify-center">
    {product && (
     <ProductCard product={product} btn={false}   key={product? product.id : 1}/> )
    }
    </div>
    </>
  )
}