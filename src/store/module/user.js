import { getToken, setToken, removeToken } from '@/utlis/auth'
import { mockData, getUsers, login, loginOut, registerUser } from '@/api/user'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res.code === 200) {
            console.log(res)
            setToken(res.token)
            commit('SET_TOKEN', res.token)
            commit('SET_NAME', res.data.userName)
            commit('SET_PHONE', res.data.phone)
          }
          resolve()
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginOut(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_PHONE', '')
          removeToken('token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_PHONE', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
