import Vue from 'vue'
import Router from 'vue-router'
import Nproress from 'nprogress'
import Login from '../view/Login/Login'
import Home from '../view/Home/Home'
import Article from '../view/Article/Article'
import Category from '../view/Category/Category'
import Banners from '../view/Banners/Banners'
import Columns from '../view/Columns/Columns'
import Course from '../view/Course/Course'
import Comment from '../view/Comment/Comment'
import Money from '../view/Money/Money'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/course',
      name: 'Course',
      component: Course
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/banners',
      name: 'Banners',
      component: Banners
    },
    {
      path: '/columns',
      name: 'Columns',
      component: Columns
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/money',
      name: 'Money',
      component: Money
    },
  ],
})

router.beforeEach((to, from, next) => {
  Nproress.start();
  if (to.path !== '/login') {
    if (!window.localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  Nproress.done()
})

export default router
