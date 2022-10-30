export default function Loading() {
  return (
    <div className="grid h-screen w-full place-items-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-xl">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-b-blue-400"></div>
      </div>
    </div>
  )
}
