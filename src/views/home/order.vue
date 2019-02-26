<template>
	<section>
		<Breadcrumb>
			<BreadcrumbItem to="/s/">
				<Icon type="ios-home-outline"></Icon>
				首页
			</BreadcrumbItem>
			<BreadcrumbItem to="/s/purchase">
				<Icon type="logo-usd"></Icon>
				交易管理
			</BreadcrumbItem>
			<BreadcrumbItem to="/s/order">
				<Icon type="md-paper"></Icon> 订单记录
			</BreadcrumbItem>
		</Breadcrumb>
		<div class="search">
			<Button type="success" to="/s/addPurchase">添加订单</Button>
			<p class="searchText">
				<Input v-model="searchValue" placeholder="输入商品名称进行搜索" style="width: 300px"></Input>
				<Button type="info" @click="getPurchase()">搜索</Button>
			</p>
		</div>
		<div class="table">
			<Table border :columns="columns" :data="tableData"></Table>
		</div>
		<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				columns: [
					{'title': '序号', 'key': 'number', 'width': '80'},
					{'title': '订单编号', 'key': 'orderID'},
					{'title': '金额', 'key': 'price', 'width': 100},
					{'title': '审核人', 'key': 'SHPerson'},
					{'title': '录入员', 'key': 'LRPerson'},
					{'title': '日期', 'key': 'date'},
					{'title': '订单详情',
						'key': 'caozuo',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {marginRight: '20px'},
									on: {
										click: () => {
										}
									}
								}, '查看')
							])
						}
					}
				],
				tableData: [],
				page: '',
				totalCount: ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.ivu-breadcrumb {
		background-color: #fff;
		font-size: 14px;
		margin-top: 12px;
		padding: 5px 20px;
		border-radius: 7px;
		-ms-text-align-last: right;
		text-align: left;
	}
	.ivu-row {
		margin-top: 20px;
		width: 100%;
	}
	.search {
		margin-top: 15px;
		height: 40px;
		.ivu-btn-success {
			float: left;
			margin-left: 20px;
		}
		.searchText {
			float: right;
			margin-right: 20px;
			.ivu-btn-info {
				margin-left: 10px;
			}
		}
	}
	.table {
		padding: 10px;
		background-color: #eee;
		margin-top: 10px;
	}
</style>
