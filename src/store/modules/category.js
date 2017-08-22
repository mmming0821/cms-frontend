import * as types from '../types'
import api from '../api'

const state = {
  categoryList: [],
  backLoading: false
}

const getters = {
  categoryList: state => state.categoryList,
  backLoading: state => state.backLoading
}

const actions = {
  // 获取分类列表
  async getCategory ({
    commit,
    dispatch
  }, {
    context,
    tag
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    let res = await api.getCategory({ tag })
    let { code, data } = res.data
    if (code === 1) {
      commit(types.GET_CATEGORY, { data })
    } else if (code !== 4) {
      context.$message.error(res.data.msg)
    } else {
      dispatch('logout')
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  },
  // 编辑分类列表
  async editCategory ({
    commit,
    dispatch
  }, {
    context,
    tag,
    newTag
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    let res = await api.editCategory({
      tag,
      newTag
    })
    let { code, msg } = res.data
    if (code === 1) {
      context.$message({
        message: msg,
        type: 'success'
      })
      dispatch('getCategory', context)
    } else if (code === 4) {
      dispatch('logout')
    } else {
      context.$message.error(res.data.msg)
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  },
  // 删除分类
  delCategory ({
    commit,
    dispatch
  }, {
    context,
    tag
  }) {
    context.$confirm('将删除此分类，是否继续？', {
      type: 'warning'
    }).then(async () => {
      commit(types.UPDATE_CATEGORY_LOADING)
      let res = await api.delCategory({ tag })
      let { code, msg } = res.data
      if (code === 1) {
        context.$message({
          message: msg,
          type: 'success'
        })
        dispatch('getCategory', context)
      } else if (code === 4) {
        dispatch('logout')
      } else {
        context.$message.error(res.data.msg)
      }
      commit(types.UPDATE_CATEGORY_LOADING)
    }).catch(() => {})
  },
  // 添加分类
  async addCategory ({
    commit,
    dispatch
  }, {
    context,
    tag
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    let res = await api.addCategory({ tag })
    let { code, msg } = res.data
    if (code === 1) {
      context.$message({
        message: msg,
        type: 'success'
      })
      dispatch('getCategory', context)
    } else if (code === 4) {
      dispatch('logout')
    } else {
      context.$message({
        message: msg,
        type: 'warning'
      })
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  }
}

const mutations = {
  // 获取分类列表
  [types.GET_CATEGORY] (state, { data }) {
    state.categoryList = data
  },
  // 分类列表loading
  [types.UPDATE_CATEGORY_LOADING] (state) {
    state.backLoading = !state.backLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
