export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(typeof date === 'string' ? new Date(date) : date)
}
