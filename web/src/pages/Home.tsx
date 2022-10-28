import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { useBox } from '@/state/blackbox'
import { noop } from '@/utils/functional'
import { stopPropagation } from '@/utils/ui'
import { formBox, setEmail, setFile } from '@/stores/home'

export default function Home() {
  const form = useBox(formBox)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log('Rendered')
  })

  return (
    <div className="grid h-screen w-full place-items-center">
      <main className="border p-16">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tighter text-blue-700">
          Bem vindo
        </h1>
        <p className="mb-8 text-center">Faça login no formulário abaixo</p>
        <form onSubmit={stopPropagation(noop)} className="grid gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">E-mail:</label>
            <input
              value={form.email}
              onChange={(event) => setEmail(event.target.value)}
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              autoComplete="off"
              className="
                rounded
                border
                py-2
                px-4
                outline-none
                transition
                ease-in-out
                focus:border-transparent
                focus:shadow-lg
                focus:shadow-blue-200
                focus:ring-2
                focus:ring-blue-600
              "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha (foto):</label>
            <button
              type="button"
              className={
                form.file
                  ? 'rounded border border-blue-600 py-2 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-300'
                  : 'rounded border-2 border-dashed py-2 text-gray-400'
              }
              onClick={() => fileInputRef.current!.click()}
            >
              {form.file ? form.file.name : 'Você ainda não fez o upload'}
            </button>
            <input
              name="password"
              id="password"
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(event) => setFile(event.target.files![0])}
              ref={fileInputRef}
            />
          </div>
          <button className="rounded bg-blue-600 py-2 text-white transition ease-in-out hover:bg-blue-700">
            Login
          </button>
          <Link
            className="text-center text-blue-600 hover:underline"
            to="/register"
          >
            Registre-se
          </Link>
        </form>
      </main>
    </div>
  )
}
