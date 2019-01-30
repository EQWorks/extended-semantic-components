export default (type, direction) => {
  let dirFactor = direction === 'ascending' ? 1 : -1
  switch(type){
  case 'string':
    return (a,b) => {
      let aName = a.toLowerCase()
      let bName = b.toLowerCase()
      if (aName < bName) {
        return dirFactor
      }
      if (aName > bName) {
        return -1*dirFactor
      }
      return 0
    }
  case 'date':
    return (a,b) => {
      let aDate = new Date(a)
      let bDate = new Date(b)
      if (aDate < bDate) {
        return -1*dirFactor
      }
      if (aDate > bDate) {
        return dirFactor
      }
      return 0
    }
  case 'basic':
    return (a,b) => dirFactor*(a-b)
  default:
    return (a,b) => dirFactor*(a-b)
  }
}