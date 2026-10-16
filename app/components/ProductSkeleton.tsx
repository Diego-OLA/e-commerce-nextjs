// components/ProductSkeleton.tsx
export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-40 bg-slate-200 rounded-lg p-4 space-y-3">
          <div className="h-4 bg-slate-300 rounded w-3/4"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
          <div className="h-8 bg-slate-300 rounded w-full mt-auto"></div>
        </div>
      ))}
    </div>
  )
}   