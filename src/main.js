import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter)
Vue.use(iView);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
