
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      {/* Spinner animado */}
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500">Cargando...</p>
    </div>
  )
}