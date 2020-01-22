export function getOrderSum(order) {
  return order.goods.reduce(
    (sum, product) => sum + product.count * product.size_price,
    0
  )
}

export function getOrderCount(order) {
  return order.goods.reduce((sum, product) => sum + product.count, 0)
}

export function getOrderDate(order) {
  const date = new Date(order.created_at)
  const day = `0${date.getDate()}`.slice(-2)
  const month = `0${date.getMonth() + 1}`.slice(-2)
  return `${day}.${month}.${date.getFullYear()}`
}
