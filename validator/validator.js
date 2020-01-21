import { validateFunctions } from '~/validator/validateFunctions'

/**
 * Check if errors exist
 *
 * @returns {boolean}
 */
function hasValidationErrors(errors) {
  return !!Object.entries(errors).find(
    (pair) =>
      pair[1].length ||
      (typeof pair[1] === 'object' && Object.keys(pair[1]).length)
  )
}

/**
 * Get rules, data and return errors
 *
 * @param {array} fieldRules
 * @param {object} inputsData
 *
 * @return {object} errors
 * {
 *   field_name: [
 *     'error_name',
 *     'second_error'
 *   ]
 * }
 */
function validator(fieldRules, inputsData) {
  const errors = {}
  for (const fieldRule of fieldRules) {
    if (fieldRule.validateIf && !fieldRule.validateIf(inputsData)) continue

    if (fieldRule.children) {
      if (!inputsData[fieldRule.name]) continue

      const childrenErrors = validateChildren(
        inputsData[fieldRule.name],
        fieldRule.children
      )
      if (childrenErrors) {
        errors[fieldRule.name] = childrenErrors
      }
    } else {
      for (const rule of fieldRule.rules) {
        if (validateFieldByRule(inputsData[fieldRule.name], rule)) {
          if (!errors[fieldRule.name]) errors[fieldRule.name] = []
          errors[fieldRule.name].push({
            name: rule.name,
            data: rule.data
          })
          break
        }
      }
    }
  }
  return errors
}

/**
 * @param {string|number} dataForValidation inputs data
 * @param {string} name fieldRule name
 * @param {object} data fieldRule data
 * @returns {*}
 */
function validateFieldByRule(dataForValidation, { name, data }) {
  const validateFunction = validateFunctions[name]
  if (typeof validateFunction === 'function') {
    return validateFunction(dataForValidation, data)
  }
}

/**
 * @param formsData
 * @param children
 * @returns {boolean}
 */
function validateChildren(formsData, children) {
  const childrenValidator = (prev, formData, index) => {
    const result = validator(children, formData)
    if (Object.keys(result).length) {
      prev[index] = result
    }
    return prev
  }
  const childrenErrors = formsData.reduce(childrenValidator, {})
  return Object.keys(childrenErrors).length > 0 ? childrenErrors : false
}

export { hasValidationErrors, validator }
