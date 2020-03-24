import Vue from 'vue';
import VueRouter from 'vue-router';

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
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(guard);

export default router;
