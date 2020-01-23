const required = {
  name: 'required',
  data: {
    text: 'Field is required'
  }
}

const mustBeMoreThan = (count) => ({
  name: 'mustBeMoreThan',
  data: {
    count,
    text: `Must be more than ${count + 1}`
  }
})

const signInFormValidationRules = [
  {
    name: 'phone',
    rules: [
      required,
      {
        name: 'phone',
        data: {
          text: 'Wrong phone format'
        }
      }
    ]
  },
  {
    name: 'password',
    rules: [required, mustBeMoreThan(6)]
  }
]

export { signInFormValidationRules }
