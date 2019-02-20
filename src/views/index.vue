<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo">
						<p>后台管理系统</p>
					</div>
					<div class="layout-nav">
						<MenuItem name="1">
							<Icon type="ios-navigate"></Icon>
							<span>{{realName}}</span>
						</MenuItem>
						<MenuItem name="2">
							<Icon type="ios-keypad"></Icon>
							<span @click="loginout">退出</span>
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Layout class="main">
				<Sider ref="side" hide-trigger class="slide">
					<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
						<Submenu name="1">
							<template slot="title"><Icon type="md-cart"></Icon>商品管理</template>
							<router-link to="commodity"><MenuItem name="1-1">商品管理</MenuItem></router-link>
						</Submenu>
						<Submenu name="2">
							<template slot="title"><Icon type="logo-usd"></Icon>交易管理</template>
							<router-link to="purchase"><MenuItem name="2-1">采购记录</MenuItem></router-link>
							<router-link to="return"><MenuItem name="2-2">退换货交易</MenuItem></router-link>
							<router-link to="order"><MenuItem name="2-3">订单管理</MenuItem></router-link>
						</Submenu>
						<Submenu name="3">
							<template slot="title"><Icon type="md-bus"></Icon>供应厂商</template>
							<router-link to="supplier"><MenuItem name="3-1">供应厂商</MenuItem></router-link>
						</Submenu>
						<Submenu name="4">
							<template slot="title"><Icon type="md-bookmarks"></Icon>合同管理</template>
							<router-link to="contract"><MenuItem name="4-1">合同管理</MenuItem></router-link>
						</Submenu>
					</Menu>
				</Sider>
				<Layout :style="{padding: '0 20px 20px'}">
					<router-view></router-view>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				realName: localStorage.getItem('realName')
			}
		},
		methods: {
			loginout() {
				this.$router.push({path: '/'})
			},
		}
	}
</script>
<style lang="less" scoped>
	.layout{
		border: 1px solid #d7dde4;
		background: #eee;
		height: 100%;
		border-radius: 4px;
		.ivu-layout-header {
			height: 80px;
		}
		.ivu-layout {
			height: 100%;
			background-color: #f5f5f5;
		}
	}
	a {
		color: #515a6e;
	}
	a:hover, a:active {
		color: #2d8cf0;
	}
	.layout-logo{
		width: 250px;
		height: 50px;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
		p {
			line-height: 50px;
			font-family: 'STKaiti';
			font-size: 34px;
			font-weight: 700;
			color: blue;
		}
	}
	.layout-nav{
		width: 220px;
		margin: 0 auto;
		margin-right: 20px;
	}
	.ivu-layout.ivu-layout-has-sider .slide[data-v-a83bd3b0] {
		background-color: #eff1f4;
	}
	.ivu-menu-light {
		background-color: #eff1f4;
	}
	.ivu-menu-horizontal {
		line-height: 80px;
	}
	.ivu-layout.ivu-layout-has-sider {
		height: 100%;
		.slide {
			background-color: #fff;
			/*height: 500px;*/
		}
	}
	
</style>
