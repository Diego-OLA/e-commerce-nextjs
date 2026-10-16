// app/(shop)/orders/[id]/page.tsx
import PaymentForm from "@/app/components/PaymentForm"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Orden #{id}</h1>
      <PaymentForm orderId={id} />
    </main>
  )
}