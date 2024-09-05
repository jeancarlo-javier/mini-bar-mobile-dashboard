export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-PE', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

export const formatTime = (time: Date) => {
  return new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}
