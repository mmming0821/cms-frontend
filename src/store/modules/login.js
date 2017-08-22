import api from '../api'
import router from '../../router'

const actions = {
  // 注册
  async register ({
    commit,
    dispatch
  }, {
    context,
    username,
    email,
    password
  }) {
    let res = await api.register({
      name: username,
      email,
      password
    })
    if (res.data.code === 1) {
      window.localStorage.setItem('token', res.data.token)
      router.push('cms')
    } else {
      context.$message.error(res.data.msg)
    }
  },
  // 登录
  async login ({
    commit
  }, {
    context,
    username,
    password
  }) {
    let res = await api.login({
      name: username,
      password
    })
    if (res.data.code === 1) {
      window.localStorage.setItem('token', res.data.token)
      router.push('cms/gategory')
    } else {
      context.$message.error(res.data.msg)
    }
  }
}

export default {
  actions
}
