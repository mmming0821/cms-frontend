import * as types from './types'

const state = {
  user: {
    name: '',
    avatar: ''
  }
}

const mutations = {
  // 获取当前用户信息
  [types.SET_USER_INFO] (state, { data }) {
    state.user.name = data.name
    state.user.avatar = data.avatar
  },
  // 设置头像
  [types.SET_USER_AVATAR] (state, avatar) {
    state.user.avatar = avatar
  }
}

export { mutations, state }
