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
								<Icon type="md-undo"></Icon>
								退换货记录
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
														<Table border :columns="columns" :data="tableData1"></Table>
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
				<Modal
						v-model="changeReturn"
						title="订单状态"
						@on-ok="quxiao(data)"
						@on-cancel="cancel">
						<p> 确认打回退换货申请吗？</p>
				</Modal>
				<Modal
						v-model="isPassReturn"
						title="订单状态"
						@on-ok=""
						@on-cancel="cancel">
						<p> 申请已审核通过，无法打回</p>
				</Modal>
		</section>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {'title': '序号', 'key': 'number', 'width': '80'},
                    {'title': '订单编号', 'key': 'orderID'},
                    {'title': '经销商', 'key': 'supplier'},
                    {'title': '金额', 'key': 'price', 'width': 100},
                    {'title': '原因', 'key': 'msg'},
                    {'title': '状态', 'key': 'isPass'},
                    {
                        'title': '操作',
                        'key': 'caozuo',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {marginRight: '20px'},
                                    on: {
                                        click: () => {
                                            this.cancelReturn(params)
                                        }
                                    }
                                }, '打回'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {marginRight: '20px'},
                                    on: {
                                        click: () => {
                                            this.passReturn(params)
                                        }
                                    }
                                }, '同意')
                            ])
                        }
                    }
                ],
                tableData: [],
                tableData1: [],
                page: 1,
                totalCount: '',
                searchText: '',
                By: localStorage.getItem('admin'),
                changeReturn: false,
                data: {},
                isPassReturn: false
            }
        },
        methods: {
            changPage(page) {
            
            },
            getOrder_change() {
                let params = {
                    'page': this.page,
                    'pageSize': 10,
                    'search': this.searchValue,
                    'status': 3,
                    'supplier': this.By
                }
                this.$api.getOrder(params).then(res => {
                    res = res.data
                    this.totalCount = res.data.count
                    this.tableData = res.data.info
                    this.searchValue = ''
                })
            },
            getOrder_return() {
                let params = {
                    'page': this.page,
                    'pageSize': 10,
                    'search': this.searchValue,
                    'status': 5,
                    'supplier': this.By
                }
                this.$api.getOrder(params).then(res => {
                    res = res.data
                    this.totalCount = res.data.count
                    this.tableData1 = res.data.info
                    this.searchValue = ''
                })
            },
            cancelReturn(data) {
                this.data = data.row
    						if (this.data.isPass === '审核通过') {
    						    this.isPassReturn = true
								} else {
                    this.changeReturn = true
                }
            },
            quxiao(data) {
                data.status = 1
                let params = {
                    'whereStr': {
                        '_id': data['_id']
                    },
                    'updateStr': data
                }
                this.$api.editOrder(params).then(res => {
                    res = res.data
                    if (res.code === 0 && res.data) {
                        this.changeReturn = false
                    }
                })
                this.getOrder_change()
                this.getOrder_return()
            },
            passReturn(data) {
                data = data.row
                data.isPass = '审核通过'
                let params = {
                    'whereStr': {
                        '_id': data['_id']
                    },
                    'updateStr': data
                }
                this.$api.editOrder(params).then(res => {
                    res = res.data
                })
                this.getOrder_change()
                this.getOrder_return()
						}
        },
        mounted() {
            this.getOrder_change()
            this.getOrder_return()
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
