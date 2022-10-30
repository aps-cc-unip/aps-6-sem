import { useEffect } from 'react'

type TitleProps = {
  children: string | string[]
}

export default function Title({ children: title }: TitleProps) {
  useEffect(() => {
    document.title = typeof title === 'string' ? title : title.join(' ')
  }, [title])

  return null
}
