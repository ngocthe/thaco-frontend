/**
 * Created by PanJiaChen on 16/11/18.
 */

import i18n from '@/i18n'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const reg = /^[a-zA-Z0-9_-]+$/
  return reg.test(str.trim())
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param {any} str
 * @returns {Boolean}
 */
export function isStringEmpty(str) {
  return str === '' || str === null
}

/**
 * @param {any} num
 * @returns {Boolean}
 */
export function isNumber(num) {
  if (num instanceof Number) {
    return true
  }

  if ((num + '').match(/^-?\d+$/)) {
    return true
  } else return !!num.match(/^\d+\.\d+$/)
}

export function checkTrimValue(rule, value, callback) {
  if (!value) {
    callback()
  } else {
    if (value.trim().length > 0) {
      callback()
    } else {
      // hàm ko check required
      if (rule.field === 'remark') {
        callback()
      } else {
        callback(new Error(i18n.t('input_required')))
      }
    }
  }
}

// don't use for field remark
export function checkTrimValueWithFieldName(rule, value, callback) {
  if (!value) {
    callback()
  } else {
    if (value.trim().length > 0) {
      callback()
    } else {
      callback(new Error(i18n.t('input_required_with_field_name', { field: i18n.t(rule.field_name) })))
    }
  }
}

// required_status : trường hợp field đó required thì truyền true
export function customRequired(rule, value, callback) {
  if (rule.required_status) {
    if (!value) {
      callback(new Error(`The ${i18n.t(rule.field)} field is required.`))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export function checkBetweenMax(rule, value, callback) {
  if (value) {
    value = +value
    if (!Number.isInteger(value)) {
      callback(new Error(i18n.t('numeric')))
    } else {
      if (rule.max) {
        let strNumber = ''
        for (let index = 0; index < rule.max; index++) {
          strNumber = strNumber + '9'
        }
        if (value < 1 || value > parseInt(strNumber)) {
          callback(new Error(i18n.t('the') + i18n.t(rule.field) + i18n.t('field_between') + ` ${strNumber}`))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  } else {
    callback()
  }
}

export function checkPositiveInteger(rule, value, callback) {
  if (value) {
    value = +value
    if (!Number.isInteger(value)) {
      callback(new Error(i18n.t('numeric')))
    } else {
      if (value <= 0) {
        callback(new Error(i18n.t('the') + i18n.t(rule.field) + ' ' + i18n.t('positive_integer')))
      } else {
        callback()
      }
    }
  }
}

export function alphaBe(rule, value, callback) {
  if (value) {
    var letters = /^[A-Z0-9]+(?:[-][A-Z0-9]+)*$/
    if (value.match(letters)) {
      callback()
    } else {
      callback(new Error(i18n.t('alpha_numeric')))
    }
  }
  callback()
}

export function notXX(rule, value, callback) {
  if (value) {
    if (value === 'XX') {
      callback(new Error('The Part Color Code is invalid.'))
    } else {
      callback()
    }
  }
  callback()
}

export function allCharacterExcepJapanese(rule, value, callback) {
  if (value) {
    var letters = /([ァ-ヶ])/
    if (!value.match(letters)) {
      callback()
    } else {
      callback(new Error(i18n.t('regex_japan_title')))
    }
  }
}

export function alphaBeSpace(rule, value, callback) {
  if (value) {
    var letters = /^[a-zA-Z0-9- ]+$/u
    if (value.match(letters)) {
      callback()
    } else {
      callback(new Error(i18n.t('alpha_numeric')))
    }
  }
  callback()
}

// First and last characters must be alphanumeric
export function startEndCharacter(rule, value, callback) {
  if (value) {
    var letters = /^[a-zA-Z0-9]+$/u
    if (value.charAt(0).match(letters) && value.substr(value.length - 1).match(letters)) {
      callback()
    } else {
      callback(new Error(i18n.t('start_end_character', { attribute: i18n.t(rule.field) })))
    }
  }
  callback()
}

export function validUserCode(rule, value, callback) {
  if (value) {
    var letters = /^[a-zA-Z0-9_-]+$/
    if (value.match(letters)) {
      callback()
    } else {
      callback(new Error(i18n.t('alpha_numeric')))
    }
  }
}

export function validCode(rule, value, callback, errMessage = null) {
  if (value) {
    var letters = /^[a-z0-9_-]+$/
    if (value.match(letters)) {
      callback()
    } else {
      callback(new Error(i18n.t(errMessage ?? 'correct_username')))
    }
  }
  callback()
}

/**
 * @param {JSON} objectParam
 * @param {String} attributeName
 * @param {String} errorCode
 * @returns {String}
 */
export function fillAttributeToMessage(attributeName, errorCode, objectParam = null) {
  let stringMessage = i18n.t(errorCode).replace(':attribute', attributeName)
  if (objectParam) {
    for (const keyParam in objectParam) {
      stringMessage = stringMessage.replace(keyParam, objectParam[keyParam])
    }
  }

  return stringMessage
}

/**
 * @param {any} num
 * @returns {Boolean}
 */
export function validNumber(rule, value, callback) {
  if (isNumber(value)) {
    callback()
  } else {
    callback(new Error(i18n.t(10073)))
  }
}

export function validNumberZero(rule, value, callback) {
  // eslint-disable-next-line
  if (value == 0) {
    callback(new Error(i18n.t(10079)))
  } else {
    callback()
  }
}

export function validNumberMax(rule, value, callback) {
  if (rule.max) {
    let strNumber = ''
    for (let index = 0; index < rule.max; index++) {
      strNumber = strNumber + '9'
    }
    if (value < parseInt('-' + strNumber) || value > parseInt(strNumber)) {
      callback(new Error(i18n.t('between') + ' -' + strNumber + i18n.t(' and ') + `${strNumber}`))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export function validDateAfter(rule, value, callback) {
  // eslint-disable-next-line eqeqeq
  if (value == 0) {
    callback(new Error(i18n.t(10079)))
  } else {
    callback()
  }
}

/**
 *
 * @param {Number} min
 * @param {Number} max
 * @param callback
 * @param {Number} value
 * @param {string} fieldKey
 */
export function isNumberBetween(fieldKey, callback, value, min, max) {
  if (value) {
    value = +value
    if (!Number.isInteger(value)) {
      callback(new Error(i18n.t('numeric')))
    } else {
      if (value < min || value > max) {
        callback(new Error(fillAttributeToMessage(i18n.t(fieldKey), 10014, { ':min': min, ':max': max })))
      } else {
        callback()
      }
    }
  }
}

export function checkPositiveNumber(rule, value, callback) {
  if (value) {
    value = value + ''
    const regex = /^\d+\.\d+$/
    const regex2 = /^-\d+(\.\d+)?$/
    if (value === 0 || value === '0' || value.match(regex) || value.match(regex2) || parseInt(value) === 0) {
      callback(new Error(fillAttributeToMessage(i18n.t(rule.field), 10108, {})))
    }
    callback()
  }
}

export function checkDecimal(rule, value, callback) {
  value = value + ''
  if (value) {
    const regex = /^\d+\.\d+$/
    const regex2 = /^-\d+(\.\d+)?$/
    if (value.match(regex) || value.match(regex2)) {
      callback(new Error())
    }
    callback()
  } else {
    callback()
  }
}

export function checkNumber(rule, value, callback) {
  if (value) {
    const regExp = /^[0-9]+$/u
    if (!value.match(regExp)) {
      callback(new Error(i18n.t('numeric')))
    }
  }
  callback()
}

export function checkNumberWHAdjustment(rule, value, callback) {
  if (value) {
    const regExp = /^[0-9_-]+$/u
    if (!value.match(regExp)) {
      callback(new Error(i18n.t('numeric')))
    }
  }
  callback()
}
