import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
import Layout from "./views/layout/Layout";

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/login", component: () => import("@/views/login/index.vue") },
    { path: "/404", component: () => import("@/views/404.vue") },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: true,
      children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }]
    },
    {
      path: '/test',
      component: Layout,
      redirect: '/test',
      name: 'test',
      // hidden: true,
      children: [
        {
        path: 'test',
        component: () => import('@/views/test/index'),
        meta: { title: '测试', icon: 'table' }
      },
        {
        path: 'test1',
        component: () => import('@/views/test/index-1'),
        meta: { title: '测试1', icon: 'table' }
      },
    ]
    },
    {
      path: '/about',
      component: Layout,
      redirect: '/views/about',
      name: 'about',
      meta: { title: 'Example', icon: 'example' },
      children: [
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/About.vue'),
          meta: { title: 'Table', icon: 'table' }
        },
      ]
    },
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    { path: "*", redirect: "/404" }
  ]
});
