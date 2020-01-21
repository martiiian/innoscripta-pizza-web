function mapPropsModels(props = []) {
  return props.reduce((obj, prop) => {
    obj[prop] = {
      get() {
        return this.currentOrder[prop]
      },
      set(value) {
        this.updateOrderItem({
          key: prop,
          value
        })
      }
    }
    return obj
  }, {})
}

export { mapPropsModels }
