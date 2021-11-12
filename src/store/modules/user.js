import { login, logout, getInfo, loginByPhone, loginByJN } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    college: 0,
    isSuperAdmin: '',
    job_number: '',
    phone: '',
    username: '',
    avatar: 'https://img.alicdn.com/tps/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_IsSuperAdmin: (state, authority) => {
    if (authority == 1) {
      state.isSuperAdmin = true
    } else {
      state.isSuperAdmin = false
    }
  },
  SET_Admin: (state, admin) => {
    state.admin = admin
  }
}

const actions = {

  loginByPhone({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      loginByPhone({ phone: account.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginByJN({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      loginByJN({ job_number: account.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_IsSuperAdmin', data.authority)
        const admin = {
          _id: data._id,
          job_number: data.job_number,
          phone: data.phone,
          username: data.username,
          college: data.college
        }
        commit('SET_Admin', admin)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

