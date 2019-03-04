export const getDate = date => {
  // eslint-disable-line import/prefer-default-export
  const time = date.split('/')
  return new Date(`${time[1]}/${time[0]}/${time[2]}`) // Month-Date-Year
}
