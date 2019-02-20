import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import iView from 'iview'
import Vuex from 'vuex'
import 'iview/dist/styles/iview.css'
/*引入index.js*/
import api from './axios/index.js'

Vue.use(api)
Vue.use(VueRouter)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>',
})
