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

const orderFormValidationRules = [
  {
    name: 'name',
    rules: [required, mustBeMoreThan(1)]
  },
  {
    name: 'email',
    rules: [
      {
        name: 'email',
        data: {
          text: 'Wrong email format'
        }
      }
    ],
    validateIf(data) {
      return !!data.email
    }
  },
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
    name: 'city',
    rules: [required, mustBeMoreThan(3)]
  },
  {
    name: 'address',
    rules: [required, mustBeMoreThan(5)]
  }
]

export { orderFormValidationRules }
