import { commonMutators } from '@/helpers/store/mutators'

export const state = () => ({
  goods: []
})

export const mutations = commonMutators

export const actions = {
  async LOAD_GOODS({ commit }) {
    const { data: goods } = await this.$axios.get('/goods')
    commit('SET', {
      name: 'goods',
      value: goods.data
    })
  }
}

export const getters = {
  all: ({ goods }) => goods
}
