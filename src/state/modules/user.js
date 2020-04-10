import Vue from 'vue'
import { login, getInfo } from '@api/userApi'
import { ACCESS_TOKEN, CURRENT_USER } from '@state/types'

const user = {
  state: {
    token: '',
    info: {},
  },

  getters: {
    token: (state) => state.token,
    userName: (state) => state.info && state.info.username,
    userRole: (state) => state.info && state.info.role,
    userInfo: (state) => state.info,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },

  actions: {
    Init({ commit }) {
      commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
      commit('SET_INFO', Vue.ls.get(CURRENT_USER))
    },
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            const result = response.result

            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(CURRENT_USER, result.user, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', result.user)

            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const result = response.result

            commit('SET_INFO', result)

            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    Logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_INFO', {})
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(CURRENT_USER)
        resolve()
      })
    },
  },
}

export default user
