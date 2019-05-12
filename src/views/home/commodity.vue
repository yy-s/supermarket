<template>
		<div>
				<Breadcrumb>
						<BreadcrumbItem to="/">
								<Icon type="ios-home-outline"></Icon>
								首页
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/commodity">
								<Icon type="md-cart"></Icon>
								商品管理
						</BreadcrumbItem>
				</Breadcrumb>
				<div class="search">
						<Button type="success" to="/s/addCommodity">添加商品</Button>
						<p class="searchText">
								<Input v-model="searchValue" placeholder="输入商品名称进行搜索" style="width: 300px"></Input>
								<Button type="info" @click="getCommodity()">搜索</Button>
						</p>
				</div>
				<div class="table">
						<Table border :columns="columns" :data="tableData"></Table>
				</div>
				<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
				<Modal
						v-model="showEdit"
						title="编辑商品信息"
						@on-ok="submitEdit"
						@on-cancel="cancel">
						<Form :model="formItem" :label-width="80">
								<FormItem label="商品名称">
										<Input v-model="formItem.CName" placeholder="请输入商品名称"></Input>
								</FormItem>
								<FormItem label="商品编号">
										<Input v-model="formItem.id" placeholder="请输入商品编号"></Input>
								</FormItem>
								<FormItem label="商品类别">
										<Select v-model="formItem.type">
												<Option value="食品">食品</Option>
												<Option value="生鲜">生鲜</Option>
												<Option value="日用品">日用品</Option>
										</Select>
								</FormItem>
								<FormItem label="进价">
										<Input v-model="formItem.JPrice" placeholder="请输入进价"></Input>
								</FormItem>
								<FormItem label="售价">
										<Input v-model="formItem.SPrice" placeholder="请输入售价"></Input>
								</FormItem>
								<FormItem label="经销商">
										<Input v-model="formItem.supplier" placeholder="请输入经销商"></Input>
								</FormItem>
								<FormItem label="数量">
										<Input v-model="formItem.count" placeholder="请输入商品库存量"></Input>
								</FormItem>
						</Form>
				</Modal>
				<Modal
						v-model="showDelete"
						title="删除商品"
						@on-ok="submitDelete"
						@on-cancel="cancel">
						<p>确定删除该商品信息吗？</p>
				</Modal>
		</div>
</template>
<script>
		export default {
				data() {
						return {
								columns: [
										{'title': '序号', 'key': 'number', 'width': 80},
										{'title': '商品编号', 'key': 'id'},
										{'title': '商品名称', 'key': 'CName'},
										{'title': '分类', 'key': 'type'},
										{'title': '进价', 'key': 'JPrice'},
										{'title': '售价', 'key': 'SPrice'},
										{'title': '库存', 'key': 'count', 'width': 100},
										{'title': '经销商', 'key': 'supplier'},
										{
												'title': '操作',
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
																						this.editCommodity(params)
																				}
																		}
																}, '编辑'),
																h('Button', {
																		props: {
																				type: 'error',
																				size: 'small'
																		},
																		on: {
																				click: () => {
																						this.deleteCommodity(params)
																				}
																		}
																}, '删除'),
														])
												}
										}
								],
								tableData: [],
								totalCount: 10,
								page: 1,
								searchValue: '',
								showEdit: false,
								showDelete: false,
								formItem: {
										CName: '',
										id: '',
										type: '',
										JPrice: '',
										SPrice: '',
										supplier: '',
										count: ''
								},
                By: localStorage.getItem('admin')
						}
				},
				methods: {
						getCommodity() {
								let params = {
										'page': this.page,
										'pageSize': 10,
										'search': this.searchValue,
										'by': this.By
								}
								this.$api.getCom(params).then(res => {
										res = res.data
										this.totalCount = res.data.count
										this.tableData = res.data.info
										this.searchValue = ''
								})
						},
						changPage(page) {
								this.page = page
								this.getCommodity()
						},
						editCommodity(params) {
								this.showEdit = true
								this.formItem = params.row
						},
						deleteCommodity(params) {
								this.showDelete = true
								this.formItem = params.row
						},
						submitEdit() {
								let params = {
										'whereStr': {
												'_id': this.formItem['_id']
										},
										'updateStr': this.formItem
								}
								this.$api.editCom(params).then(res => {
										res = res.data
										if (res.code === 0 && res.data) {
												this.showEdit = false
										}
								})
						},
						cancel() {
						
						},
						submitDelete() {
								let params = {
										'whereStr': {
												'_id': this.formItem['_id']
										}
								}
								this.$api.delCom(params).then(res => {
										res = res.data
										if (res.code === 0 && res.data) {
												this.showDelete = false
										}
										this.getCommodity()
								})
						}
				},
				mounted() {
						this.getCommodity()
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
		
		.ivu-page {
				margin-top: 10px;
		}
		
		.table {
				padding: 10px;
				background-color: #eee;
				margin-top: 10px;
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
</style>
