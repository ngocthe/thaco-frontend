export const keyToValue = {
  methods: {
    keyToValue(val, options) {
      let result = null
      if (val) {
        Object.entries(options).forEach(entry => {
          const [key, value] = entry
          // eslint-disable-next-line eqeqeq
          if (key == val) {
            result = value
          }
        })
      }
      return result
    }
  }
}

/**
 *
 * @param str
 * @return {null|number}
 */
export const convertStringToIntOrNull = (str) => {
  try {
    return parseInt(str)
  } catch (e) {
    return null
  }
}

/**
 *
 * @param value
 * @return {boolean}
 *
 * true: undefined, null, "", [], {}
 * false: true, false, 1, 0, -1, "foo", [1, 2, 3], { foo: 1 }
 */
export const isEmpty = (value) => {
  return (
    // null or undefined
    (value == null) ||

    // has length and it's zero
    ((value + '').length === 0) ||

    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  )
}

export const uniqBy = (arr, key = JSON.stringify) => {
  return [
    ...new Map(
      arr.map(x => [key(x), x])
    ).values()
  ]
}
