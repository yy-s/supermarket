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
								<Icon type="md-paper"></Icon>
								订单记录
						</BreadcrumbItem>
				</Breadcrumb>
				<div class="search">
						<Button type="success" to="/s/addOrder">添加订单</Button>
						<p class="searchText">
								<Input v-model="searchValue" placeholder="输入商品名称进行搜索" style="width: 300px"></Input>
								<Button type="info" @click="getPurchase()">搜索</Button>
						</p>
				</div>
				<div class="table">
						<Table border :columns="columns" :data="tableData"></Table>
				</div>
				<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
				<Modal
						v-model="showEdit"
						title="编辑订单信息"
						@on-ok="submitEdit"
						@on-cancel="cancel">
						<Form :model="formItem" :label-width="80">
								<FormItem label="订单名称">
										<Input v-model="formItem.orderName" placeholder="请输入订单名称" disabled=""></Input>
								</FormItem>
								<FormItem label="订单编号">
										<Input v-model="formItem.orderID" placeholder="请输入订单编号" disabled=""></Input>
								</FormItem>
								<FormItem label="相关采购单">
										<Input v-model="formItem.purchaseID" placeholder="请输入采购记录"></Input>
								</FormItem>
						</Form>
				</Modal>
				<Modal
						v-model="show"
						title="查看采购单信息"
						@on-ok=""
						@on-cancel="cancel">
						<Form :model="formItem" :label-width="80">
								<FormItem label="采购单名称">
										<Input v-model="formItem1.orderName" placeholder="请输入订单名称" disabled=""></Input>
								</FormItem>
								<FormItem label="采购单编号">
										<Input v-model="formItem1.orderID" placeholder="请输入订单编号" disabled=""></Input>
								</FormItem>
								<FormItem label="采购日期">
										<Input v-model="formItem1.CGDate" placeholder="请输入采购日期" disabled=""></Input>
								</FormItem>
								<FormItem label="出单人员">
										<Input v-model="formItem1.CDPerson" placeholder="请输入出单人员" disabled=""></Input>
								</FormItem>
								<FormItem label="审核人员">
										<Input v-model="formItem1.SHPerson" placeholder="请输入审核人员" disabled=""></Input>
								</FormItem>
								<FormItem label="金额">
										<Input v-model="formItem1.price" placeholder="请输入订单金额" disabled=""></Input>
								</FormItem>
						</Form>
				</Modal>
				<Modal
						v-model="orderStatus"
						title="订单状态"
						@on-ok="jiesuan(data)"
						@on-cancel="cancel">
						<p v-if="isStatus"> 该订单尚未结算，请问确认结算该订单吗？ </p>
						<p v-if="!isStatus"> 该订单已结算 </p>
				</Modal>
				<Modal
						v-model="orderReturn"
						title="订单退换操作"
						@on-ok=""
						@on-cancel="cancel">
						<p style="font-size: 18px">请对订单进行操作</p>
						<Form>
								<FormItem label="原因">
										<Input v-model="formItem.msg" placeholder="请输入原因"></Input>
								</FormItem>
								<Button @click="change(data)" type="warning" style="margin:25px 20px 10px 150px" size='default'>换货</Button>
								<Button @click="return_order(data)" type="error" style="margin:25px 20px 10px 20px" size='default'>退货</Button>
						</Form>
				</Modal>
				<Modal
						v-model="orderReturn2"
						title="订单退换操作"
						@on-ok=""
						@on-cancel="cancel">
						<p style="font-size: 18px">该订单在处理状态，不可重复操作</p>
				</Modal>
		</section>
</template>

<script>
		export default {
				data() {
						return {
								columns: [
										{'title': '序号', 'key': 'number', 'width': '80'},
										{'title': '订单名称', 'key': 'orderName'},
										{'title': '订单编号', 'key': 'orderID'},
										{'title': '金额', 'key': 'price', 'width': 80},
                    {'title': '经销商', 'key': 'supplier', 'width': 130},
										{'title': '审核人', 'key': 'SHPerson', 'width': 130},
										{'title': '录入员', 'key': 'LRPerson', 'width': 130},
										{'title': '日期', 'key': 'date'},
										{
												'title': '采购记录',
												'key': 'caozuo',
												'width': 100,
												render: (h, params) => {
														return h('div', [
																h('Button', {
																		props: {
																				type: 'primary',
																				size: 'small'
																		},
																		on: {
																				click: () => {
																						this.getPurchase(params)
																				}
																		}
																}, '查看')
														])
												}
										},
                    {
                        'title': '操作',
                        'key': 'caozuo',
                        'width': 150,
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
                                            this.editOrder(params)
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
                                            this.returnOrder(params)
                                        }
                                    }
                                }, '退换')
                            ])
                        }
                    },
                    {
                        'title': '状态',
                        'key': 'caozuo',
                        'width': 100,
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
                                            this.fetchOrderStatus(params)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
										}
								],
								formItem: {
										orderName: '',
										orderID: '',
										purchaseID: '',
										msg: ''
								},
								tableData: [],
								page: 1,
								totalCount: 10,
								searchValue: '',
                By: localStorage.getItem('admin'),
								showEdit: false,
                formItem1: {
                    orderName: '',
                    orderID: '',
                    CGDate: '',
                    CDPerson: '',
                    SHPerson: '',
										price: 0
                },
								show: false,
								isStatus: '',
                orderStatus: false,
								data: {},
                orderReturn: false,
                orderReturn2: false
						}
				},
				methods: {
						getOrder() {
								let params = {
										'page': this.page,
										'pageSize': 10,
										'search': this.searchValue,
										'by': this.By
								}
								this.$api.getOrder(params).then(res => {
										res = res.data
										this.totalCount = res.data.count
										this.tableData = res.data.info
										this.searchValue = ''
								})
						},
						changPage() {
								this.page = page
								this.getOrder()
						},
						submitEdit() {
                let params = {
                    'whereStr': {
                        '_id': this.formItem['_id']
                    },
                    'updateStr': this.formItem
                }
                this.$api.editOrder(params).then(res => {
                    res = res.data
                    if (res.code === 0 && res.data) {
                        this.showEdit = false
                    }
                })
						},
            fetchOrderStatus(params) {
                this.orderStatus = true
						    this.isStatus = params.row.action === 0
								this.data = params.row
            },
						getPurchase(params) {
                if (!params.row.orderID) {
										this.$Message.warning('该订单还没有录入采购单信息')
								} else {
                    let data = {
                        'page': this.page,
                        'pageSize': 10,
                        'searchid': params.row.orderID,
                        'by': this.By
                    }
                    this.$api.getPurchase(data).then(res => {
                        res = res.data
                        this.totalCount = res.data.count
                        this.formItem1 = res.data.info[0]
                    })
                    this.show = true
                }
						},
						editOrder(params) {
								this.showEdit = true
								this.formItem = params.row
                // this.formItem.orderName = params.row.orderName
								// this.formItem.orderID = params.row.orderID
								// this.formItem.purchaseID = params.row.purchaseID
						},
            jiesuan(data) {
                if (this.isStatus) {
                    data.action = 1
                    let params = {
                        'whereStr': {
                            '_id': data['_id']
                        },
                        'updateStr': data
                    }
                    this.$api.editOrder(params).then(res => {
                        res = res.data
                        if (res.code === 0 && res.data) {
                            this.showEdit = false
                        }
                    })
								} else {
						        this.orderStatus = false
								}
						},
						cancel() {
						
						},
            returnOrder(params) {
						    this.data = params.row
                console.log(this.data)
                if (this.data.status === 1) {
                    this.orderReturn = true
								} else {
                    this.orderReturn2 = true
								}
						},
						change(data) {
                data.status = 3
								data.msg = this.formItem.msg
								data.isPass = '审核中'
                let params = {
                    'whereStr': {
                        '_id': data['_id']
                    },
                    'updateStr': data
                }
                this.$api.editOrder(params).then(res => {
                    res = res.data
                    if (res.code === 0 && res.data) {
                        this.orderReturn = false
                    }
                })
						},
						return_order(data) {
                data.status = 5
                data.msg = this.formItem.msg
                data.isPass = '审核中'
                let params = {
                    'whereStr': {
                        '_id': data['_id']
                    },
                    'updateStr': data
                }
                this.$api.editOrder(params).then(res => {
                    res = res.data
                    if (res.code === 0 && res.data) {
                        this.orderReturn = false
                    }
                })
						}
				},
				mounted() {
						this.getOrder()
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
