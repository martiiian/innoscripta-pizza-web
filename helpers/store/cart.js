/**
 * Get size for certain product
 *
 * @param sizes
 * @param selectedSizeId
 * @returns {*}
 */
export function getProductSize(sizes, selectedSizeId) {
  return sizes.find((size) => size.id === selectedSizeId)
}

/**
 * Get product payload by id
 *
 * @param allProducts
 * @param productId
 * @param property
 */
export function getProductData(allProducts, productId, property = 'id') {
  return allProducts.find((item) => productId === item[property])
}
