import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { noop } from '@/utils/functional'
import { preventDefault } from '@/utils/ui'

export default function Register() {
  const inputFileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="grid h-screen w-full place-items-center">
      <main className="flex flex-col border p-16">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tighter text-blue-700">
          Registre-se
        </h1>
        <p className="mb-8 text-center">Registre-se no formulário abaixo</p>
        <form onSubmit={preventDefault(noop)} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              id="name"
              name="name"
              autoComplete="off"
              className="rounded border py-2 px-4 outline-none transition ease-in-out focus:border-transparent focus:shadow-lg focus:shadow-blue-200 focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              autoComplete="off"
              className="rounded border py-2 px-4 outline-none transition ease-in-out focus:border-transparent focus:shadow-lg focus:shadow-blue-200 focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Senha (Foto):</label>
            <button
              className="rounded border-2 border-dashed py-2 text-gray-400"
              onClick={() => inputFileRef.current!.click()}
            >
              Você ainda não fez o upload
            </button>
            <input
              type="file"
              placeholder="Foto"
              className="hidden"
              id="password"
              name="password"
              accept="image/png,image/jpeg"
              ref={inputFileRef}
            />
          </div>
          <button className="rounded bg-blue-600 py-2 text-white transition ease-in-out hover:bg-blue-700">
            Enviar
          </button>
          <Link to="/" className="text-center text-blue-600 hover:underline">
            Login
          </Link>
        </form>
      </main>
    </div>
  )
}
