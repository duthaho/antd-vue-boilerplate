import Vue from 'vue'
import { login, getMe, register } from '@api/userApi'
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
    userProfile: (state) => state.info && state.info.userProfile,
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
          .then((data) => {
            Vue.ls.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', data.token)

            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    Register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo)
          .then((data) => {
            Vue.ls.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', data.token)

            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    GetMe({ commit }) {
      return new Promise((resolve, reject) => {
        getMe()
          .then((data) => {
            commit('SET_INFO', data)
            Vue.ls.set(CURRENT_USER, data)

            resolve(data)
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
