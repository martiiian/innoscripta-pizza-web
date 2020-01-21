import { commonMutators } from '@/helpers/store/mutators'

export const state = () => ({
  orders: [],
  isVisible: false,
  deliveryPrice: 200,
  current: {
    phone: '',
    name: '',
    email: '',
    city: '',
    address: ''
  }
})

export const mutations = commonMutators

export const actions = {
  load({ commit }) {},

  toggleVisibility({ commit, state }) {
    commit('SET', {
      name: 'isVisible',
      value: !state.isVisible
    })
  },

  async send({ commit, state }, data) {
    try {
      const { data: newOrder } = await this.$axios.post('/orders', data)
      commit('PUSH', {
        name: 'orders',
        value: newOrder.data
      })
      return {
        status: true,
        result: newOrder.data
      }
    } catch (e) {
      if (e.response && e.response.status === 422) {
        return {
          status: false,
          result: e.response.data.errors
        }
      }
    }
  },

  add({ commit, state, dispatch }, newProduct) {},

  delete({ commit }, id) {},

  updateCurrentItem({ commit }, { key, value }) {
    commit('SET_INNER', {
      parentKey: 'current',
      key,
      value
    })
  }
}

export const getters = {
  all: ({ orders }) => orders,
  isVisible: ({ isVisible }) => isVisible,
  current: ({ current }) => current,
  deliveryPrice: ({ deliveryPrice }) => deliveryPrice
}
