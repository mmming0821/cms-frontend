import * as types from '../types'
import api from '../api'
import router from '../../router'

const state = {
  tags: [],
  articleList: [],
  article: {
    oldTitle: '',
    title: '',
    tags: [],
    introduction: '',
    content: ''
  },
  articleCount: 0
}

const getters = {
  tags: state => state.tags,
  articleList: state => state.articleList,
  article: state => state.article,
  articleCount: state => state.articleCount
}

const actions = {
  // 获取文章列表
  async getArticleList ({
    commit,
    dispatch
  }, {
    pageIndex,
    title
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    let res = await api.getArticleList({ pageIndex, title })
    let { code, list, count } = res.data
    if (code === 1) {
      commit(types.SET_ARTICLE_COUNT, { count })
      commit(types.GET_ARTICLE_LIST, { list })
    } else {
      dispatch('logout')
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  },
  // 添加文章
  async addArticle ({
    commit,
    dispatch
  }, {
    context,
    title,
    tags,
    introduction,
    content
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    let res = await api.addArticle({
      title,
      tags: Array.from(tags),
      introduction,
      content
    })
    let { code, msg } = res.data
    if (code === 1) {
      context.$message({
        message: msg,
        type: 'success'
      })
      context.resetForm('articleForm')
    } else if (code === 4) {
      dispatch('logout')
    } else {
      context.$message.error(res.data.msg)
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  },
  // 删除文章
  delArticle ({
    commit,
    dispatch
  }, {
    context,
    title,
    pageIndex
  }) {
    context.$confirm('将删除此文章，是否继续？', {
      type: 'warning'
    }).then(async () => {
      commit(types.UPDATE_CATEGORY_LOADING)
      let res = await api.delArticle({ title })
      let { code, msg } = res.data
      if (code === 1) {
        context.$message({
          message: msg,
          type: 'success'
        })
        commit(types.UPDATE_CATEGORY_LOADING)
        dispatch('getArticleList', { pageIndex })
      } else if (code === 4) {
        dispatch('logout')
      } else {
        context.$message.error(res.data.msg)
      }
    }).catch(() => {})
  },
  // 获取所有分类
  async getTags ({
    commit,
    dispatch
  }, {
    context
  }) {
    let res = await api.getCategory()
    let { code, data } = res.data
    if (code === 1) {
      if (data.length <= 0) {
        context.$message({
          message: '分类为空，请先添加分类',
          type: 'warning'
        })
        router.push('/cms/gategory')
      }
      let tags = []
      data.map(item => tags.push(item.tag))
      commit(types.GET_CATEGORY_TAGS, { tags })
    } else {
      dispatch('logout')
    }
  },
  // 设置编辑文章
  async setEditArticle ({
    commit,
    dispatch
  }, {
    context,
    title
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    dispatch('getTags', { context })
    let res = await api.getArticle({ title })
    let { code, article } = res.data
    if (code === 1) {
      commit(types.SET_ARTICLE, { article })
    } else if (code === 4) {
      dispatch('logout')
    } else {
      context.$message.error(res.data.msg)
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  },
  // 编辑文章提交
  async editArticle ({
    commit,
    dispatch
  }, {
    context,
    article
  }) {
    commit(types.UPDATE_CATEGORY_LOADING)
    let res = await api.editArticle(article)
    let { code, msg } = res.data
    if (code === 1) {
      router.push('/cms/article/list/1')
      context.$message({
        message: msg,
        type: 'success'
      })
    } else if (code === 4) {
      dispatch('logout')
    } else {
      context.$message.error(msg)
    }
    commit(types.UPDATE_CATEGORY_LOADING)
  }
}

const mutations = {
  // 获取所有分类
  [types.GET_CATEGORY_TAGS] (state, { tags }) {
    state.tags = tags
  },
  [types.GET_ARTICLE_LIST] (state, { list }) {
    state.articleList = list
  },
  [types.SET_ARTICLE] (state, { article }) {
    state.article = article
    state.article.oldTitle = article.title
  },
  [types.SET_ARTICLE_COUNT] (state, { count }) {
    state.articleCount = count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
