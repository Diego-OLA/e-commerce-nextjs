import Image from "next/image";
import Catalogo from "./(shop)/catalogo/page";
import { Suspense } from "react";
import ProductSkeleton from "./components/ProductSkeleton";
import { cookies } from 'next/headers';
import Link from "next/link";

export default async function Home() {
   const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value; 
  
  return (
    
    <>
    
    {!token && <div className="flex bg-slate-100 ">
      <Link className="bg-blue-500 p-2 text-white font-bold hover:bg-blue-700"  href={'/login'}>
      Iniciar sesion
      </Link>
    </div>}
    <Suspense fallback={<ProductSkeleton />}>
        <Catalogo />
      </Suspense>
    </>
  );
}
