const getDisplayCategory = category => {
  switch (category) {
    case 'adults':
      return 'Adult'
    case 'children':
      return 'Child'
    case 'srMen':
      return 'Sr Men'
    case 'srWomen':
      return 'Sr Women'
    default:
      return category
  }
}

export default getDisplayCategory
