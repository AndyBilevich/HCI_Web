import Vue from 'vue'
import VueRouter from 'vue-router'

import Favourites from '../views/Favourites.vue'
import Homes from '../views/Homes.vue'
import Rooms from '../views/Rooms.vue'
import Devices from '../views/Devices.vue'
import Routines from '../views/Routines.vue'

import ElecCons from '../views/ElecCons.vue'
import History from '../views/History.vue'
import Settings from '../views/Settings.vue'
import HelpFeed from '../views/HelpFeed.vue'
import ErrorLog from '../views/ErrorLog.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites
  },
  {
    path: '/homes',
    name: 'Homes',
    component: Homes
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices
  },
  {
    path: '/routines',
    name: 'Routines',
    component: Routines
  },
  {
    path: '/eleccons',
    name: 'ElecCons',
    component: ElecCons
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/helpfeed',
    name: 'HelpFeed',
    component: HelpFeed
  },
  {
    path: '/errorlog',
    name: 'ErrorLog',
    component: ErrorLog
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
