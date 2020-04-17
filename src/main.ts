import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#container');



