import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

import Login from '../vues/login/Login.vue';
import Users from '@/vues/backoffice/vues/users/Users.vue';
import BackOffice from '../vues/backoffice/BackOffice.vue';
import BackOfficeUsers from '@/vues/backoffice/vues/users/backoffice-users/BackOfficeUsers.vue';

import guard from './util/guard';
import afterRouteScriptLoader from './util/afterRouteScriptLoader';


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
        path: 'users',
        name: 'Users',
        component: Users,
        children: [
          {
            path: 'back-office',
            component: BackOfficeUsers,
          },
    
          {
            path: 'partner',
          },
    
          {
            path: 'lottery',
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
router.afterEach(afterRouteScriptLoader);

export default router;
