import { commonMutators } from '@/helpers/store/mutators'

export const state = () => ({
  isVisible: false
})

export const mutations = commonMutators

export const actions = {
  /**
   * @param commit
   * @param state
   */
  toggleVisibility({ commit, state }) {
    commit('SET', {
      name: 'isVisible',
      value: !state.isVisible
    })
  },

  /**
   *
   */
  async signIn({ state }, data) {
    await this.$auth.loginWith('local', {
      data
    })
  }
}

export const getters = {
  isVisible: (s) => s.isVisible
}
