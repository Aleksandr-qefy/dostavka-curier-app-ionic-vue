import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import Customization from '@/pages/Customization.vue'
//import store from '../store'
import * as Storage from '../scripts/Storage'
import { APPROVED_COUNTRIES } from '@/constants/globalConstants'

const routes = [
  {
    path: '/',
    //redirect: '/tabs/tab1'
    //redirect: '/login'
    /*beforeEnter: async (to, from, next) => {
      //console.log(store.getters.GET_COUNTRY);
      const country = await Storage.getItem('userCountry');
      if (!country) next({ path: '/choosing_country' })
      else if (['Россия'].indexOf(country) === -1)
        next({ path: '/choosing_country' })
      else next({ path: '/login' })
    },*/
    redirect: '/login'
  },
  {
    path: '/choosing_country',
    //name: 'Registration',
    beforeEnter: async (to, from, next) => {
      const country = await Storage.getItem('userCountry');
      if (!country || APPROVED_COUNTRIES.indexOf(country) === -1)
        next()
      else next({ path: '/login' })
    },
    component: () => import('@/pages/ChoosingCountry.vue')
  },
  {
    path: '/login',
    ////name: 'Registration',
    // beforeEnter: async (to, from, next) => {
    //   const country = await Storage.getItem('userCountry');
    //   if (!country || APPROVED_COUNTRIES.indexOf(country) === -1)
    //     next({ path: '/choosing_country' })
    //   else next()
    // },
    redirect: '/customization', // <-- 27.02.2023
    //beforeEnter: (to, from, next) => { next({ path: '/' }) },
    component: () => import('@/pages/SignInToAccount.vue')
  },
  {
    path: '/registration',
    //name: 'Registration',
    component: () => import('@/pages/Registration.vue')
  },
  {
    path: '/customization/',
    //name: 'Customization',
    component: Customization,
    children: [
        {
          path: '',
          //redirect: '/customization/all_settings'
          redirect: '/customization/profile_picture'
        },
        {
          path: 'profile_picture',
          component: () => import('@/components/customization/ProfilePicture.vue')
        },
        {
          path: 'working_area',
          component: () => import('@/components/customization/WorkingAreaForm.vue')
        },
        {
          path: 'working_radius',
          component: () => import('@/components/customization/WorkingRadiusForm.vue')
        },
        {
          path: 'travel_mode',
          component: () => import('@/components/customization/СhooseTravelMode')
        },
        {
          path: 'all_settings',
          component: () => import('@/components/customization/SettingsTable')
        },
        /*{
          path: 'all_settings',
          component: () => import('@/components/maps/Geolocation.vue')
        },*/
    ]
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]

//import * as Storage from "@/scripts/Storage";
//Storage.getItem('userCountry').then( (userCountry)=> {
  //store.dispatch('SET_COUNTRY', userCountry);
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



/*router.beforeEach((to, from, next) => {
  //if (to.path !== '/' && this.$store.getters.GET_COUNTRY) next({ path: 'Login' })
  //else next()
  if (to.path !== '/login') {
    if (!store.getters.GET_COUNTRY) next({ path: '/choosing_country' })
    else if (this.$approvedCountries.indexOf(store.getters.GET_COUNTRY) === -1)
      next({ path: '/choosing_country' })
    else next({ path: '/login' })
  }
})*/

export default router
