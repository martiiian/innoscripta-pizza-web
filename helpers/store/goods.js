/**
 * @param basketProducts
 * @param productId
 * @returns {*}
 */
export function findProductInBasket(basketProducts, productId) {
  try {
    return basketProducts.find(
      (basketProduct) => basketProduct.payload.id === productId
    )
  } catch (e) {
    return false
  }
}
