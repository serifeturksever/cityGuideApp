import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Todo from '@/components/Todo'
import Welcome from '@/components/Welcome'
import Card from '@/components/Card'
import NearbyAttractions from '@/components/NearbyAttractions'
import Navbar from '@/components/Navbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/todos',
      component: Todo
    },
    {
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/card',
      component: Card
    },
    {
      path: '/nearby-attractions',
      component: NearbyAttractions
    },
    {
      path: '/',
      component: Navbar
    }
  ]
})
