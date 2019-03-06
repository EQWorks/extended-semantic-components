const normalizeBy = (type) => (value) => ({
  string: String(value || '').toLowerCase(),
  date: new Date(value),
}[type] || value)

const sortBy = (type, dirFactor) => (a, b) => {
  const [aNorm, bNorm] = [a,b].map(normalizeBy(type))
  if (aNorm < bNorm) {
    return -dirFactor
  }
  if (aNorm > bNorm) {
    return dirFactor
  }
  return 0
}

export default (type, direction) => {
  const dirFactor = direction === 'ascending' ? 1 : -1
  switch (type) {
  case 'string':
  case 'date':
    return sortBy(type, dirFactor)
  case 'basic':
  default:
    return (a, b) => dirFactor * (a - b)
  }
}
