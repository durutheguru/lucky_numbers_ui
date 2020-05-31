import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../vues/login/Login.vue';
import Users from '@/vues/backoffice/vues/users/Users.vue';
import BackOffice from '../vues/backoffice/BackOffice.vue';

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
            component: () => import('@/vues/backoffice/vues/users/backoffice-users/BackOfficeUsers.vue'),
          },
    
          {
            path: 'partner',
            component: () => import('@/vues/backoffice/vues/users/partner-users/PartnerUsers.vue'),
          },
    
          {
            path: 'lottery',
            component: () => import('@/vues/backoffice/vues/users/lottery-users/LotteryUsers.vue')
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
