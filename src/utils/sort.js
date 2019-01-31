export default (type, direction) => {
  const dirFactor = direction === 'ascending' ? 1 : -1
  switch (type) {
  case 'string':
    return (a, b) => {
      const aName = a.toLowerCase()
      const bName = b.toLowerCase()
      if (aName < bName) {
        return dirFactor
      }
      if (aName > bName) {
        return -dirFactor
      }
      return 0
    }
  case 'date':
    return (a, b) => {
      const aDate = new Date(a)
      const bDate = new Date(b)
      if (aDate < bDate) {
        return -dirFactor
      }
      if (aDate > bDate) {
        return dirFactor
      }
      return 0
    }
  case 'basic':
    return (a, b) => dirFactor * (a - b)
  default:
    return (a, b) => dirFactor * (a - b)
  }
}
