
'use client'
import { login } from "@/app/actions/login"
import { useActionState } from 'react'


export default function LoginView(){

    const [state, formAction, isPending] = useActionState(login, null)
    return(
        <div className="w-full h-screen bg-sky-100 flex-col-reverse gap-2.5 flex justify-center items-center">
              {state?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm font-medium">
                    {state.error}
                </div>
                )}
            <div className="bg-slate-200 rounded-md h-11/12 w-11/12 md:h-96 md:w-1/4 shadow-md shadow-blue-500 p-4">
              
                <form action={formAction} className="flex flex-col h-full ">
                <div className="p-3">
                <p>Correo</p>
                <input name="correo" type="text"  placeholder="Ingresa el correo" />
                <p className="mt-8">Contraseña</p>
                <input name="contraseña" type="password" placeholder="Ingresa tu contraseña" />
                </div>
                <div className="mt-auto">
                <button
                 type="submit" className="bg-blue-600 p-1 w-full" disabled={isPending}>
                    {isPending ? 'Iniciando sesión...' : 'Log in'}
                 </button>
                </div>
                </form>
            </div>
        </div>
    )
}