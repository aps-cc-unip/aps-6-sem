import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useBox } from '@/lib/blackbox'
import { noop } from '@/utils/functional'
import { preventDefault } from '@/utils/ui'
import { loginFormBox, setEmail, setFile } from '@/stores/login'

import Title from '@/components/Title'

export default function Login() {
  const navigate = useNavigate()
  const form = useBox(loginFormBox)

  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="grid h-screen w-full place-items-center bg-gray-100">
      <Title>APS | Login</Title>
      <main className="rounded bg-white p-16 shadow-xl">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tighter text-blue-700">
          Bem vindo
        </h1>
        <p className="mb-8 text-center">Faça login no formulário abaixo</p>
        <form onSubmit={preventDefault(noop)} className="grid gap-4">
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
          <button
            onClick={() => navigate('/home')}
            className="rounded bg-blue-600 py-2 text-white transition ease-in-out hover:bg-blue-700"
          >
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
