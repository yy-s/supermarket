import Vue from 'vue'
import Router from 'vue-router'
import entrance from '@/views/index'
import login from '@/views/login'
import reg from '@/views/reg'

Vue.use(Router)

export default new Router({
		routes: [
			{
				path: '/s',
				component: entrance,
				redirect: {name: 'home'},
				children: [
					{path: 'home', name: 'home', component: () => import('./views/home/index')},
					{path: 'commodity', name: 'commodity', component: () => import('./views/home/commodity')},
					{path: 'addCommodity', name: 'commodity', component: () => import('./views/home/addCommodity')},
					{path: 'purchase', name: 'purchase', component: () => import('./views/home/purchase')},
					{path: 'return', name: 'return', component: () => import('./views/home/return')},
					{path: 'order', name: 'order', component: () => import('./views/home/order')},
					{path: 'supplier', name: 'supplier', component: () => import('./views/home/supplier')},
					{path: 'contract', name: 'contract', component: () => import('./views/home/contract')},
				]
			},
			{
				path: '/',
				component: login,
			},
			{
				path: '/reg',
				component: reg
			}
		]
})
