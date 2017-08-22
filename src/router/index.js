import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'cms'
    }, {
      path: '/login',
      component: resolve => require(['../pages/login.vue'], resolve)
    }, {
      path: '/cms',
      component: resolve => require(['../pages/home.vue'], resolve),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'gategory',
          component: resolve => require(['../pages/gategory.vue'], resolve)
        }, {
          path: 'article/list/:index',
          name: 'article',
          component: resolve => require(['../pages/article.vue'], resolve)
        }, {
          path: 'article/add',
          component: resolve => require(['../pages/articleAdd.vue'], resolve)
        }, {
          path: 'article/edit/:title',
          name: 'articleEdit',
          component: resolve => require(['../pages/articleEdit.vue'], resolve)
        }, {
          path: 'user/info',
          component: resolve => require(['../pages/userInfo.vue'], resolve)
        }
      ]
    }
  ]
})

// 验证token，跳转url
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let token = window.localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router

