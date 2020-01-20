import { commonMutators } from '@/helpers/store/mutators'
import { findProductInBasket } from '@/helpers/store/goods'

export const state = () => ({
  goods: []
})

export const mutations = commonMutators

export const actions = {
  async load({ commit }) {
    const { data: goods } = await this.$axios.get('/goods')
    commit('SET', {
      name: 'goods',
      value: goods.data
    })
  }
}

export const getters = {
  all: ({ goods }) => goods,

  allWithData: ({ goods }, getters, rootState, rootGetters) => {
    return goods.map((product) => ({
      ...product,
      isAddedToCart: !!findProductInBasket(rootGetters['cart/all'], product.id)
    }))
  }
}
