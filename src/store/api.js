import axios from 'axios'

const instance = axios.create()
axios.default.timeout = 5000
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// instance.defaults.headers.post['Content-Type'] = 'application/json'
// axios.interceptors.request.use = instance.interceptors.request.use

instance.interceptors.request.use((config) => {
  if (window.localStorage.getItem('token')) {
    config.headers.Authorization = `token ${window.localStorage.getItem('token')}`.replace(/(^")|("$)/g, '')
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use((response) => {
  return response
}, (err) => {
  return Promise.reject(err)
})

let domain = '/ms'
export default {
  // 用户
  register: params => instance.post(`${domain}/user/register`, params),
  login: params => instance.post(`${domain}/user/login`, params),
  userInfo: () => instance.get(`${domain}/user/userInfo`),
  updateUserInfo: params => instance.put(`${domain}/user/update`, params),
  // 分类
  getCategory: params => {
    const query = params && params.tag ? `?tag=${params.tag}` : ''
    return instance.get(`${domain}/category/get${query}`)
  },
  addCategory: params => instance.post(`${domain}/category/add`, params),
  editCategory: params => instance.put(`${domain}/category/edit`, params),
  delCategory: params => instance.delete(`${domain}/category/del?tag=${params.tag}`),
  // 文章
  getArticleList: params => {
    let query = ''
    let limit = 3
    if (params.pageIndex) {
      query = `?index=${params.pageIndex}&limit=${limit}`
    }
    if (params.title) {
      query += query === '' ? `?title=${params.title}` : `&title=${params.title}`
    }
    return instance.get(`${domain}/article/getlist${query}`)
  },
  addArticle: params => instance.post(`${domain}/article/add`, params),
  delArticle: params => instance.delete(`${domain}/article/del?title=${params.title}`),
  getArticle: params => instance.get(`${domain}/article/get?title=${params.title}`),
  editArticle: params => instance.put(`${domain}/article/edit`, params),
  uploadImg: () => `${domain}/user/profile`
}
