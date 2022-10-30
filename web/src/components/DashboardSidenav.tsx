import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  RectangleStackIcon,
  BanknotesIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'

export default function DashboardSidenav() {
  return (
    <nav className="flex h-full w-16 flex-col bg-gray-900">
      <SidenavLink
        icon={HomeIcon}
        title="Dashboard"
        className="bg-gradient-to-br from-sky-400 to-blue-600"
        link="/home"
      />
      <SidenavLink icon={RectangleStackIcon} title="Tarefas" link="/tasks" />
      <SidenavLink icon={UserGroupIcon} title="Usuários" link="/users" />
      <SidenavLink icon={BanknotesIcon} title="Faturas" link="/invoices" />
      <SidenavLink icon={UserPlusIcon} title="Admin" link="/admin" />
      <SidenavLink
        icon={ArrowRightOnRectangleIcon}
        className="mt-auto"
        title="Sair"
        link="/"
      />
    </nav>
  )
}

type SidenavLinkProps = {
  icon: React.FC<React.ComponentProps<'svg'>>
  title: string
  link: string
  className?: string
}

const SidenavLink: React.FC<SidenavLinkProps> = ({
  icon: Icon,
  link,
  className,
  title,
}) => {
  return (
    <Link
      to={link}
      title={title}
      className={'grid h-16 w-16 place-items-center ' + className}
    >
      {<Icon className="h-8 w-8 text-white" />}
    </Link>
  )
}
