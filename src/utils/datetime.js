
export function formatDate(dateData) {
  const d = new Date(dateData)
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${da}/${mo}/${ye}`
}
export function getMonthYear(dateTimeString = null, hasMonth = true, hasYear = true) {
  const currentDate = dateTimeString ? new Date(dateTimeString) : new Date()
  const ye = hasYear ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate) : ''
  const mo = hasMonth ? new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDate) : ''

  return `${mo} ${ye}`.trim()
}

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @return {{total_week: number, week_detail: {}}}
 */
export function getTotalWeekByMonthYear(month, year) {
  const firstDayOfMonth = __getFirstOrLastDayOfMonth(month, year, true)
  const lastDayOfMonth = __getFirstOrLastDayOfMonth(month, year, false)

  let totalWeek = 0
  const weekDetail = {}

  let pointToCalcDate = firstDayOfMonth
  while (pointToCalcDate < lastDayOfMonth) {
    if (__getDayInWeekToPopular(pointToCalcDate) === 2) {
      totalWeek++

      const firstDate = new Date(pointToCalcDate)
      let lastDate = new Date(pointToCalcDate)
      lastDate = addDays(lastDate, 6)

      weekDetail[totalWeek] = __wrapperWeekDetail(firstDate, lastDate)
    }

    pointToCalcDate = addDays(pointToCalcDate, 7)
  }

  return {
    total_week: totalWeek,
    week_detail: weekDetail
  }
}

/**
 *
 * @param {Date} firstDay
 * @param {Date} lastDay
 * @return {{firstDay: *, lastDay: *}}
 * @private
 */
function __wrapperWeekDetail(firstDay, lastDay) {
  return {
    firstDay: firstDay,
    lastDay: lastDay
  }
}

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @param {boolean} isFirst , true = first | false = last
 * @return Date
 * @private
 *
 * Get first date of month by THACO standard
 */
export function __getFirstOrLastDayOfMonth(month, year, isFirst = true) {
  if (isFirst) {
    const lastDatePrevMonth = month === 1 ? new Date(year - 1, 12, 0) : new Date(year, month - 1, 0)
    const dayOfWeek_lastDatePrevMonth = __getDayInWeekToPopular(lastDatePrevMonth)

    if (dayOfWeek_lastDatePrevMonth >= 4) { // => First day in next week
      const diffForFirstDay = 8 - dayOfWeek_lastDatePrevMonth + 1
      return addDays(lastDatePrevMonth, diffForFirstDay)
    } else { // => First day in this week
      const diffForFirstDay = 2 - dayOfWeek_lastDatePrevMonth
      return addDays(lastDatePrevMonth, diffForFirstDay)
    }
  } else {
    const firstDateNextMonth = new Date(year, month, 1)
    const dayOfWeek_firstDateNextMonth = __getDayInWeekToPopular(firstDateNextMonth)

    if (dayOfWeek_firstDateNextMonth <= 4) { // => Last day in prev week
      const diffForLastDay = 1 - dayOfWeek_firstDateNextMonth
      return addDays(firstDateNextMonth, diffForLastDay)
    } else { // => Last day in this week
      const diffForLastDay = 8 - dayOfWeek_firstDateNextMonth
      return addDays(firstDateNextMonth, diffForLastDay)
    }
  }
}

/**
 *
 * @param {Date} date
 * @private
 *
 * convert day in week to 2 - 8
 */
export function __getDayInWeekToPopular(date) {
  const day = date.getDay()
  switch (day) {
    case 0: return 8
    case 1: return 2
    case 2: return 3
    case 3: return 4
    case 4: return 5
    case 5: return 6
    case 6: return 7
  }
}

/**
 *
 * @param {Date} dateObj Reference Types
 * @param {number} days
 * @param {Date} dateObj Reference Types
 */
export function addDays(dateObj, days = 0) {
  dateObj.setDate(dateObj.getDate() + days)
  return dateObj
}

/**
 *
 * @param {Array} dateList
 * Used to group by DAY
 */
export function chuckDateListPerWeek(dateList) {
  const datePerWeek = {
    1: [], 2: [], 3: [], 4: [], 5: []
  }

  dateList.forEach(date => {
    datePerWeek[date.week_no].push(date.date.replaceAll('-', '/'))
  })

  datePerWeek[1].sort()
  datePerWeek[2].sort()
  datePerWeek[3].sort()
  datePerWeek[4].sort()
  datePerWeek[5].sort()

  return datePerWeek
}

/**
 *
 * @param {Array} weekList
 * Used to group by WEEK
 */
export function getDataVolumeByWeek(weekList) {
  const datePerWeek = {
    1: null, 2: null, 3: null, 4: null, 5: null
  }

  weekList.forEach(week => {
    if (weekList.week_no) {
      datePerWeek[weekList.week_no] = weekList.volume
    }
  })

  return datePerWeek
}

/**
 *
 * @param {Number} month
 * @param {Number} year
 * @return {JSON} fullWeekInMonth{...{ $weekNo: dates<Array> } }
 *
 * fill all date for all week in month
 */
export function getTotalWeekByMonthYearFullWeek(month, year) {
  const monthData = getTotalWeekByMonthYear(month, year)

  const fullWeekInMonth = {}
  for (let weekNo = 1; weekNo <= monthData.total_week; weekNo++) {
    if (!fullWeekInMonth[weekNo]) {
      fullWeekInMonth[weekNo] = []
    }
    let pointDate = monthData.week_detail[weekNo].firstDay
    const lastDayInWeek = monthData.week_detail[weekNo].lastDay
    while (pointDate <= lastDayInWeek) {
      fullWeekInMonth[weekNo].push(new Date(pointDate))
      pointDate = addDays(pointDate, 1)
    }
  }

  return fullWeekInMonth
}

/**
 *
 * @param month
 * @param year
 * @return {{endDate: string, startDate: string}}
 */
export function getRangeDateOfMonth(month, year) {
  const dataWeekMonthFull = getTotalWeekByMonthYearFullWeek(month, year)
  const rangeMonth = { startDate: '', endDate: '' }
  for (const weekNo in dataWeekMonthFull) {
    if (weekNo === 1) {
      rangeMonth.startDate = dataWeekMonthFull[weekNo][0]
    }
    rangeMonth.endDate = dataWeekMonthFull[weekNo][6]
  }

  return rangeMonth
}

/**
 *
 * @param date
 * @return {null| { weekNo: {number},
            monthNo: {number},
            year: {number},
            startDateOnWeek: {Date.toString},
            currentDate: {Date.toString}}
 */
export function getWeekMonthYearFromDate(date) {
  const dateObj = new Date(date)
  const dateObjPrev = new Date(date)
  const dateObjNext = new Date(date)

  addDays(dateObjPrev, -7)
  addDays(dateObjNext, 7)
  const weekDetailFromPrevMonth = getWeekDetailFromDateMonthYear(dateObj, dateObjPrev.getMonth() + 1, dateObjPrev.getFullYear())

  if (weekDetailFromPrevMonth) {
    return weekDetailFromPrevMonth
  } else {
    const weekDetailFromNextMonth = getWeekDetailFromDateMonthYear(dateObj, dateObjNext.getMonth() + 1, dateObjNext.getFullYear())
    return weekDetailFromNextMonth
  }
}

/**
 *
 * @param dateObj
 * @param month
 * @param year
 * @return {null| { weekNo: {number},
            monthNo: {number},
            year: {number},
            startDateOnWeek: {Date.toString},
            currentDate: {Date.toString}}
 */
export function getWeekDetailFromDateMonthYear(dateObj, month, year) {
  const dataWeekMonthFull = getTotalWeekByMonthYearFullWeek(month, year)

  const dateObjNew = new Date(dateObj)
  let objectPrepareReturn = null

  try {
    for (const weekNo in dataWeekMonthFull) {
      dataWeekMonthFull[weekNo].forEach(dateOnWeek => {
        if (formatDate(dateOnWeek) === formatDate(dateObjNew)) {
          objectPrepareReturn = {
            weekNo: weekNo,
            monthNo: month,
            year: year,
            startDateOnWeek: (new Date(dataWeekMonthFull[weekNo][0])).toString(),
            currentDate: dateObj.toString()
          }
          throw new Error('success')
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
  return objectPrepareReturn
}
