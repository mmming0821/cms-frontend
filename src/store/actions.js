import * as types from './types'
import api from './api'
import router from '../router'

const actions = {
  // 注销
  logout () {
    window.localStorage.removeItem('token')
    router.push('/login')
  },
  // 获取当前用户信息
  async userInfo ({
    commit,
    dispatch
  }) {
    let res = await api.userInfo()
    let { code, data } = res.data
    if (code === 1) {
      commit(types.SET_USER_INFO, { data })
    } else {
      // token超时
      dispatch('logout')
    }
  },
  // 更新个人资料
  async updateUserInfo ({
    commit,
    dispatch
  }, {
    context,
    nickname
  }) {
    let res = await api.updateUserInfo({ nickname })
    let { code, msg, data } = res.data
    if (code === 1) {
      context.$message({
        message: msg,
        type: 'success'
      })
      commit(types.SET_USER_INFO, { data })
    } else {
      // token超时
      dispatch('logout')
    }
  }
}

export default actions
