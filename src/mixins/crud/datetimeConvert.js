const datetimeConvert = () => ({
  methods: {
    formatDateTime(strTime, format) {
      if (!strTime) {
        return ''
      }
      const d = new Date(strTime)
      const month = d.getMonth() + 1
      const date = d.getDate()
      const hours = d.getHours()
      const minutes = d.getMinutes()
      const second = d.getSeconds()
      let result = null
      if (format === 'd-m-y' || format === 'd-m-y h:i:s') {
        result = (date < 10 ? ('0' + date) : date) + '/' +
        (month < 10 ? ('0' + month) : month) + '/' +
        d.getFullYear()
        if (format === 'd-m-y h:i:s') {
          result += ' ' + (hours < 10 ? ('0' + hours) : hours) + ':' +
          (minutes < 10 ? ('0' + minutes) : minutes) + ':' +
          (second < 10 ? ('0' + second) : second)
        }
      } else if (format === 'y-m-d') {
        result = d.getFullYear() + '-' +
          (month < 10 ? ('0' + month) : month) + '-' +
          (date < 10 ? ('0' + date) : date)
      } else if (format === 'd/m/y') {
        result = (date < 10 ? ('0' + date) : date) + '/' +
          (month < 10 ? ('0' + month) : month) + '/' + d.getFullYear()
      } else {
        result = d.getFullYear() + '/' +
        (month < 10 ? ('0' + month) : month) + '/' +
        (date < 10 ? ('0' + date) : date)
        if (format === 'y-m-d h:i:s') {
          result += ' ' + (hours < 10 ? ('0' + hours) : hours) + ':' +
          (minutes < 10 ? ('0' + minutes) : minutes) + ':' +
          (second < 10 ? ('0' + second) : second)
        }
      }

      return result
    },
    getElementTime(value) {
      let result = null
      const today = new Date()
      if (value) {
        switch (value) {
          case 'd':
            result = today.getDate()
            break
          case 'm':
            result = today.getMonth() + 1
            break
          case 'y':
            result = today.getFullYear()
            break
          default:
            break
        }
      }
      return result
    },
    getTextMonth(month) {
      switch (month) {
        case 1:
          return 'January'
        case 2:
          return 'February'
        case 3:
          return 'March'
        case 4:
          return 'April'
        case 5:
          return 'May'
        case 6:
          return 'June'
        case 7:
          return 'July'
        case 8:
          return 'August'
        case 9:
          return 'September'
        case 10:
          return 'October'
        case 11:
          return 'November'
        default: return 'December'
      }
    },
    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate()
    }
  }
})
export default datetimeConvert
