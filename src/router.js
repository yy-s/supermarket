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
								{path: 'addCommodity', name: 'addCommodity', component: () => import('./views/home/addCommodity')},
								{path: 'purchase', name: 'purchase', component: () => import('./views/home/purchase')},
								{path: 'addPurchase', name: 'addPurchase', component: () => import('./views/home/addPurchase')},
								{path: 'return', name: 'return', component: () => import('./views/home/return')},
								{path: 'order', name: 'order', component: () => import('./views/home/order')},
								{path: 'addOrder', name: 'addOrder', component: () => import('./views/home/addOrder')},
								{path: 'supplier', name: 'supplier', component: () => import('./views/home/supplier')},
								{path: 'addSupplier', name: 'addSupplier', component: () => import('./views/home/addSupp')},
								{path: 'contract', name: 'contract', component: () => import('./views/home/contract')},
						]
				},
				{
						path: '/v',
						component: entrance,
						redirect: {name: 'home'},
						children: [
								{path: 'home', name: 'home', component: () => import('./views/home/index')},
                {path: 'commodity', name: 'commodity', component: () => import('./views/home/VCommodity')},
                {path: 'addCommodity', name: 'addCommodity', component: () => import('./views/home/addVCommodity')},
                {path: 'contract', name: 'contract', component: () => import('./views/home/VContract')},
                {path: 'order', name: 'order', component: () => import('./views/home/VOrder')},
                {path: 'return', name: 'order', component: () => import('./views/home/VReturn')},
                {path: 'addOrder', name: 'addOrder', component: () => import('./views/home/addVOrder')}
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
