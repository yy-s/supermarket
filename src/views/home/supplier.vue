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
				<Modal
						v-model="showEdit"
						title="编辑供应商信息"
						@on-ok="submitEdit"
						@on-cancel="cancel">
						<Form :model="formItem" :label-width="80">
								<FormItem label="经销商名称">
										<Input v-model="formItem.SName" placeholder="请输入经销商名称"></Input>
								</FormItem>
								<FormItem label="经销商地址">
										<Input v-model="formItem.address" placeholder="请输入经销商地址"></Input>
								</FormItem>
								<FormItem label="联系方式">
										<Input v-model="formItem.tel" placeholder="请输入联系方式"></Input>
								</FormItem>
								<FormItem label="合作商品">
										<Input v-model="formItem.comm" placeholder="请输入合作商品"></Input>
								</FormItem>
								<FormItem label="合作状态">
										<RadioGroup v-model="formItem.status" type="button">
												<Radio label="正常"></Radio>
												<Radio label="结束"></Radio>
										</RadioGroup>
								</FormItem>
						</Form>
				</Modal>
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
										{'title': '供应商品', 'key': 'comm', 'width': '150'},
										{'title': '开始合作日期', 'key': 'startDate'},
										{'title': '合作状态', 'key': 'status'},
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
																						this.editSupplier(params)
																				}
																		}
																}, '编辑')
														])
												}
										}
								],
								formItem: {
										SName: '',
										address: '',
										tel: '',
										comm: '',
										status: ''
								},
								tableData: [],
								totalCount: 10,
								page: 1,
								searchValue: '',
								showEdit: false
						}
				},
				methods: {
						getSupplier() {
								let params = {
										'page': this.page,
										'pageSize': 10,
										'search': this.searchValue
								}
								this.$api.getSupp(params).then(res => {
										res = res.data
										this.totalCount = res.data.count
										this.tableData = res.data.info
										this.searchValue = ''
								})
						},
						changPage(page) {
								this.page = page
								this.getSupplier()
						},
						editSupplier(params) {
								this.showEdit = true
								this.formItem = params.row
						},
						submitEdit() {
								let params = {
										'whereStr': {
												'_id': this.formItem['_id']
										},
										'updateStr': this.formItem
								}
								this.$api.editSupp(params).then(res => {
										res = res.data
										if (res.code === 0 && res.data) {
												this.showEdit = false
										}
								})
						}
				},
				mounted() {
						this.getSupplier()
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
