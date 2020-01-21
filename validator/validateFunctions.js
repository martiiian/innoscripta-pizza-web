const validateFunctions = {
  /**
   * @param val
   * @return boolean
   */
  required(val) {
    return !val
  },

  /**
   * @param val
   */
  email(val) {
    const EMAIL_CHECK_PATTERN = /^.+@.+\..+$/
    return !val.match(EMAIL_CHECK_PATTERN)
  },

  /**
   * @param val
   * @param count
   * @returns {boolean}
   */
  mustBeEqual(val, { count }) {
    return val.length !== count
  },

  /**
   * @param val
   * @param count
   * @returns {*}
   */
  mustBeMoreThan(val, { count }) {
    return val.length < count
  },

  /**
   * @param val
   * @param count
   * @returns {string}
   */
  mustBeSmallerThan(val, { count }) {
    return val.length > count
  },

  /**
   * @param val
   * @returns {boolean}
   */
  mustBeString(val) {
    return !isNaN(+val)
  },

  /**
   * @param val
   * @returns {boolean}
   */
  mustBeNumber(val) {
    return isNaN(+val)
  },

  /**
   * @param val
   * @returns {boolean}
   */
  phone(val) {
    const PHONE_REGEX = /^((8|\+7)[-\s]?)?(\(?\d{3}\)?[-\s]?)?[\d\-\s]{7,10}$/
    return validateFunctions.mustBeEqual(val, 12) && !val.match(PHONE_REGEX)
  }
}

export { validateFunctions }
