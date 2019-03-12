const normalizeBy = (type) => (value) => ({
  string: String(value === undefined || value === null ? '' : value).toLowerCase(),
  date: Date.parse(value),
}[type])

const sortBy = (type, dirFactor) => (a, b) => {
  const [aNorm, bNorm] = [a,b].map(normalizeBy(type))
  if (!aNorm && !bNorm) {
    return 0
  }
  if (aNorm < bNorm || !aNorm) {
    return -dirFactor
  }
  if (aNorm > bNorm || !bNorm) {
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
    return (a, b) => {
      if (!parseInt(a) && !parseInt(b)) {
        return 0
      }
      if (!parseInt(a)) {
        return -dirFactor
      }
      if (!parseInt(b)) {
        return dirFactor
      }
      return dirFactor * (a - b)
    }
  }
}
