export const changeDateFormat = date => {
  const dateToID = new Date(date)
    .toLocaleDateString('id-ID')
    .replace(/\//g, '-')

  const [day, month, year] = dateToID.split('-')

  let selectedMonth = ''
  switch (month) {
    case '1':
      selectedMonth = 'Januari'
      break
    case '2':
      selectedMonth = 'Februari'
      break
    case '3':
      selectedMonth = 'Maret'
      break
    case '4':
      selectedMonth = 'April'
      break
    case '5':
      selectedMonth = 'Mei'
      break
    case '6':
      selectedMonth = 'Juni'
      break
    case '7':
      selectedMonth = 'Juli'
      break
    case '8':
      selectedMonth = 'Agustus'
      break
    case '9':
      selectedMonth = 'September'
      break
    case '10':
      selectedMonth = 'Oktober'
      break
    case '11':
      selectedMonth = 'November'
      break
    case '12':
      selectedMonth = 'Desember'
      break
  }

  const result = `${day} ${selectedMonth} ${year}`
  return result
}

export const formatText = text => {
  if (text) {
    const result = text
      .toString()
      .toLowerCase()
      .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    return result
  }
}

export const toCurrencyFormat = number => {
  if (number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace('Rp', '')
  } else {
    return '-'
  }
}
