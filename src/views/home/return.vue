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
			<BreadcrumbItem to="/s/return">
				<Icon type="md-undo"></Icon> 退换货记录
			</BreadcrumbItem>
		</Breadcrumb>
		<Row :gutter="32">
			<Col span="32" class="demo-tabs-style1">
				<Tabs type="card">
					<TabPane label="退货记录">
						<div class="search">
							<p class="searchText">
								<Input v-model="searchValue" placeholder="输入商品名称进行搜索" style="width: 300px"></Input>
								<Button type="info" @click="getPurchase()">搜索</Button>
							</p>
						</div>
						<div class="table">
							<Table border :columns="columns" :data="tableData"></Table>
						</div>
						<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
					</TabPane>
					<TabPane label="换货记录">
						<div class="search">
							<p class="searchText">
								<Input v-model="searchValue" placeholder="输入商品名称进行搜索" style="width: 300px"></Input>
								<Button type="info" @click="getPurchase()">搜索</Button>
							</p>
						</div>
						<div class="table">
							<Table border :columns="columns" :data="tableData"></Table>
						</div>
						<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
					</TabPane>
				</Tabs>
			</Col>
		</Row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				columns: [
					{'title': '序号', 'key': 'number', 'width': '80'},
					{'title': '商品编号', 'key': 'id'},
					{'title': '商品名称', 'key': 'CName'},
					{'title': '对应订单', 'key': 'orderID'},
					{'title': '经销商', 'key': 'supplier'},
					{'title': '数量', 'key': 'count', 'width': 100},
					{'title': '金额', 'key': 'price', 'width': 100},
					{'title': '原因', 'key': 'msg'},
					{'title': '状态', 'key': 'code'},
					{'title': '操作',
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
								}, '撤销')
							])
						}
					}
				],
				tableData: [],
				page: '',
				totalCount: '',
				searchText: ''
			}
		},
		methods: {
			changPage(page) {
			
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
	.table {
		padding: 10px;
		background-color: #eee;
		margin-top: 10px;
	}
	.search {
		/*margin-top: 15px;*/
		height: 40px;
		.searchText {
			float: right;
			margin-right: 20px;
			.ivu-btn-info {
				margin-left: 10px;
			}
		}
	}
	.ivu-row {
		margin-top: 20px;
		width: 100%;
	}
</style>
