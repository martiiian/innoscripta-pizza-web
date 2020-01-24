import { commonMutators } from '@/helpers/store/mutators'
import { getOrderSum } from '@/helpers/store/orders'

export const state = () => ({
  orders: [],
  isVisible: false,
  ordersIsVisible: false,
  deliveryPrice: 2,
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
  async load({ commit }) {
    const { data: orders } = await this.$axios.get('/orders/user')
    commit('SET', {
      name: 'orders',
      value: orders.data
    })
  },

  reset({ commit }) {
    commit('SET', {
      name: 'orders',
      value: []
    })
  },

  toggleVisibility({ commit, state }) {
    commit('SET', {
      name: 'isVisible',
      value: !state.isVisible
    })
  },

  toggleOrdersVisibility({ commit, state }) {
    commit('SET', {
      name: 'ordersIsVisible',
      value: !state.ordersIsVisible
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
  ordersIsVisible: ({ ordersIsVisible }) => ordersIsVisible,
  current: ({ current }) => current,
  deliveryPrice: ({ deliveryPrice }) => deliveryPrice,
  sum: ({ orders }) => {
    return orders.reduce((sum, order) => {
      const orderSum = getOrderSum(order)
      return sum + orderSum
    }, 0)
  }
}
