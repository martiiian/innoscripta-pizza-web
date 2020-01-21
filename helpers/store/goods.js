/**
 * @param basketProducts
 * @param productId
 * @returns {*}
 */
export function findProductInBasket(basketProducts, productId) {
  try {
    return basketProducts.find(
      (basketProduct) => basketProduct.productId === productId
    )
  } catch (e) {
    return false
  }
}
