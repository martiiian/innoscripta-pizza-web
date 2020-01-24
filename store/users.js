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
   * @param state
   * @param phone
   * @param password
   * @param data
   * @returns {Promise<{}>}
   */
  async signIn({ state }, { phone, password }) {
    try {
      await this.$auth.loginWith('local', {
        data: {
          phone,
          password
        }
      })
      return {}
    } catch (e) {
      if (
        e.response &&
        (e.response.status === 422 || e.response.status === 401)
      ) {
        return e.response.data.errors
      }
    }
  },

  /**
   * Register user
   *
   * @param state
   * @param phone
   * @param password
   * @param name
   * @param data
   * @returns {Promise<{}>}
   */
  async signUp({ state }, { phone, password, name }) {
    try {
      await this.$auth.loginWith('registration', {
        data: {
          phone,
          password,
          name
        }
      })
      return {}
    } catch (e) {
      if (
        e.response &&
        (e.response.status === 422 || e.response.status === 401)
      ) {
        return e.response.data.errors
      }
    }
  },

  /**
   * @param state
   * @param data
   * @returns {Promise<void>}
   */
  async register({ state }, data) {}
}

export const getters = {
  isVisible: (s) => s.isVisible
}
