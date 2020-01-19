const commonMutators = {
  SET(state, { name, value }) {
    state[name] = value
  },
  PUSH(state, { name, value }) {
    state[name].push(value)
  },
  DELETE_BY_INDEX(state, { name, index }) {
    state[name].splice(index, 1)
  },
  DELETE_BY_PROPERTY(state, { name, property, value }) {
    state[name] = state[name].filter((item) => item[property] !== value)
  },
  INNER_UPDATE_BY_ID(state, { name, id, newValue }) {
    state[name] = state[name].map((item) => {
      if (item.id === id) {
        item = { ...newValue }
      }
      return item
    })
  },
  TOGGLE(state, name) {
    state[name] = !state[name]
  },
  SET_INNER(state, { parentKey, key, value }) {
    state[parentKey] = {
      ...state[parentKey],
      [key]: value
    }
  }
}
export { commonMutators }
