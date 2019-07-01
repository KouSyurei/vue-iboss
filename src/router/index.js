import Vue from 'vue'
import login from '../components/common/login/index'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自诉文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/pages/Dashboard.vue'], resolve),
          meta: { title: '工作台' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/common/login/index'], resolve),
    }
  ]
})
