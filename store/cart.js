import { commonMutators } from '@/helpers/store/mutators'
import { getProductData, getProductSize } from '@/helpers/store/cart'

export const state = () => ({
  /**
   * @example
   * {
   *   id: 1,
   *   count: 3,
   *   size: 1
   * }
   */
  goods: [],
  isVisible: false
})

export const mutations = commonMutators

export const actions = {
  toggleVisibility({ commit, state }) {
    commit('SET', {
      name: 'isVisible',
      value: !state.isVisible
    })
  },

  add({ commit, state, dispatch }, newProduct) {
    const existProduct = getProductData(
      state.goods,
      newProduct.productId,
      'productId'
    )

    if (existProduct && existProduct.sizeId === newProduct.sizeId) {
      dispatch('update', {
        ...existProduct,
        count: newProduct.count + existProduct.count
      })
    } else {
      commit('PUSH', {
        name: 'goods',
        value: {
          ...newProduct,
          id: `${newProduct.productId}${newProduct.sizeId}salt`
        }
      })
    }
  },

  reset({ commit }) {
    commit('SET', {
      name: 'goods',
      value: []
    })
  },

  delete({ commit }, id) {
    commit('DELETE_BY_PROPERTY', {
      name: 'goods',
      property: 'id',
      value: id
    })
  },

  update({ commit }, data) {
    commit('INNER_UPDATE_BY_ID', {
      name: 'goods',
      id: data.id,
      newValue: data
    })
  }
}

export const getters = {
  isVisible: ({ isVisible }) => isVisible,

  all: ({ goods }) => goods,

  count: ({ goods }) => goods.reduce((sum, product) => sum + product.count, 0),

  sum: ({ goods }, getters, rootState, rootGetters) => {
    return goods.reduce((sum, product) => {
      const productData = getProductData(
        rootGetters['goods/all'],
        product.productId
      )
      const sizeData = getProductSize(productData.sizes, product.sizeId)
      return sum + sizeData.price * product.count
    }, 0)
  },

  allWithData: ({ goods }, getters, rootState, rootGetters) => {
    return goods.map((product) => {
      const productData = getProductData(
        rootGetters['goods/all'],
        product.productId
      )
      const sizeData = getProductSize(productData.sizes, product.sizeId)

      return {
        id: product.id,
        payload: productData,
        count: product.count,
        sum: sizeData ? sizeData.price * product.count : 0,
        sizeData
      }
    })
  }
}
