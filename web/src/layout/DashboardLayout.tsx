import DashboardSidenav from '@/components/DashboardSidenav'
import Title from '@/components/Title'

type DashboardLayoutProps = {
  title: string
  children: React.ReactNode[] | React.ReactNode
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  return (
    <div className="relative flex h-screen w-full text-gray-800">
      <Title>APS | {title}</Title>
      <DashboardSidenav />
      <main className="pb-24 max-h-screen flex-1 overflow-y-auto bg-gray-100 pt-8 lg:pb-8">
        <div className="mx-auto w-[90%] max-w-screen-xl">{children}</div>
      </main>
    </div>
  )
}
