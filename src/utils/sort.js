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

const sort = (type, direction) => {
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

const getDefaultSortType = (data, key) => {
  if (data.length === 0) {
    return null
  }

  const value = data[0][key]
  if ([null, undefined, NaN].includes(value)) {
    return null
  }

  if (Number.isInteger(value)) {
    return 'basic'
  } else if (Number.isInteger(Date.parse(value))) {
    return 'date'
  } else {
    return 'string'
  }
}

export {
  sort,
  getDefaultSortType,
}
