import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

import Login from '../vues/login/Login.vue';
import BackOffice from '../vues/backoffice/BackOffice.vue';

import guard from './util/guard';


Vue.use(VueRouter);

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      skipAuth: true,
    },
  },

  {
    path: '/back-office',
    name: 'BackOffice',
    component: BackOffice,
    children: [
      {
        path: '/users',
        children: [
          {
            path: '/back-office'
          },

          {
            path: '/partner'
          },

          {
            path: '/lottery'
          },
        ]
      }
    ]
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(guard);
router.afterEach((to: Route, from: Route) => {
  const vendorJS = document.createElement('script');
  vendorJS.setAttribute('src', '/compiled/js/compile_000.js');
  document.body.appendChild(vendorJS);
});

export default router;
