import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { preventDefault } from '@/utils/ui'

import Title from '@/components/Title'
import { createBox, useBox } from '@/lib/blackbox'
import { register } from '@/services/auth'

const registerFormBox = createBox({
  name: '',
  email: '',
  password: null as Maybe<File>,
})

function setPassword(password: Maybe<File>) {
  registerFormBox.set({
    password,
  })
}

export default function Register() {
  const form = useBox(registerFormBox)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    const form = document.forms[0]!
    const data = new FormData(form)

    console.log(Object.fromEntries(data.entries()))

    // try {
    //   await register(data)
    // } catch (err) {
    //   alert(String(err))
    // }
  }

  return (
    <div className="grid h-screen w-full place-items-center bg-gray-100">
      <Title>APS | Registre-se</Title>
      <main className="flex flex-col rounded bg-white p-16 shadow-xl">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tighter text-blue-700">
          Registre-se
        </h1>
        <p className="mb-8 text-center">Registre-se no formulário abaixo</p>
        <form onSubmit={preventDefault(handleSubmit)} className="grid gap-4">
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
              type="button"
              className={
                form.password
                  ? 'rounded border border-blue-600 py-2 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-300'
                  : 'rounded border-2 border-dashed py-2 text-gray-400'
              }
              onClick={() => inputFileRef.current!.click()}
            >
              {form.password
                ? form.password.name
                : 'Você ainda não fez o upload'}
            </button>
            <input
              type="file"
              placeholder="Foto"
              className="hidden"
              id="password"
              name="password"
              accept="image/png,image/jpeg"
              onChange={(event) => setPassword(event.target.files![0])}
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
