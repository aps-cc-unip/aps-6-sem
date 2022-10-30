import Title from '@/components/Title'

export default function NotFound() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <Title>APS | Not found</Title>
      <main className="grid grid-cols-2 text-2xl">
        <p className="border-r border-gray-400 pr-4 font-light">Not found</p>
        <p className="pl-4">404</p>
      </main>
    </div>
  )
}
