import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  RectangleStackIcon,
  BanknotesIcon,
  UserGroupIcon,
  UserPlusIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

import { authBox } from '@/stores/auth'
import { clearAuthToken } from '@/shared/axios'
import { removeJwtToken } from '@/services/storage/auth'

export default function DashboardSidenav() {
  const navigate = useNavigate()

  const handleSignOut = () => {
    removeJwtToken()
    clearAuthToken()
    navigate('/')
    authBox.reset()
  }

  return (
    <nav className="z-[9999] absolute bottom-0 w-full flex h-16 md:static md:h-full md:w-16 md:flex-col bg-gray-900">
      <SidenavLink
        icon={HomeIcon}
        title="Dashboard"
        className="grid bg-gradient-to-br from-sky-400 to-blue-600"
        link="/app/home"
      />
      <SidenavLink
        icon={RectangleStackIcon}
        className="grid"
        title="Tarefas"
        link="/app/tasks"
      />
      <SidenavLink className="grid" icon={UserGroupIcon} title="Usuários" link="/app/users" />
      <SidenavLink className="grid" icon={BanknotesIcon} title="Faturas" link="/app/invoices" />
      <SidenavLink className="grid" icon={MapPinIcon} title="Incidentes" link="/app/incidents" />
      <SidenavLink className="hidden sm:grid" icon={UserPlusIcon} title="Admin"  link="/app/admin" />
      <SidenavLink
        icon={ArrowRightOnRectangleIcon}
        className="grid ml-auto md:mt-auto"
        title="Sair"
        onClick={handleSignOut}
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
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const SidenavLink: React.FC<SidenavLinkProps> = ({
  icon: Icon,
  link,
  className,
  title,
  onClick,
}) => {
  return (
    <Link
      to={link}
      title={title}
      onClick={onClick && onClick}
      className={'h-16 w-16 place-items-center ' + className || ''}
    >
      {<Icon className="h-8 w-8 text-white" />}
    </Link>
  )
}
