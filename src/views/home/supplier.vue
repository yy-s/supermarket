<template>
		<section>
				<Breadcrumb>
						<BreadcrumbItem to="/s/">
								<Icon type="ios-home-outline"></Icon>
								首页
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/supplier">
								<Icon type="md-print"></Icon>
								供应厂商
						</BreadcrumbItem>
				</Breadcrumb>
				<div class="search">
						<Button type="success" to="/s/addSupplier">添加供应厂商</Button>
						<p class="searchText">
								<Input v-model="searchValue" placeholder="输入商品名称进行搜索" style="width: 300px"></Input>
								<Button type="info" @click="getSupplier()">搜索</Button>
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
										{'title': '序号', 'key': 'number', 'width': '100'},
										{'title': '经销商名称', 'key': 'SName'},
										{'title': '地址', 'key': 'address'},
										{'title': '联系方式', 'key': 'tel'},
										{'title': '供应商品', 'key': 'count', 'width': '150'},
										{
												'title': '操作',
												'key': 'caozuo',
												'width': '120',
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
																}, '编辑')
														])
												}
										}
								]
						}
				},
				methods: {
						getSupplier() {
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
