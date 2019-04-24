<template>
		<div>
				<Breadcrumb>
						<BreadcrumbItem to="/s/">
								<Icon type="ios-home-outline"></Icon>
								首页
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/purchase">
								<Icon type="logo-usd"></Icon>
								交易管理
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/purchase">
								<Icon type="md-log-in"></Icon>
								采购记录
						</BreadcrumbItem>
				</Breadcrumb>
				<div class="search">
						<Button type="success" to="/s/addPurchase">添加采购记录</Button>
						<p class="searchText">
								<Input v-model="searchValue" placeholder="输入订单名称进行搜索" style="width: 300px"></Input>
								<Button type="info" @click="getPurchase()">搜索</Button>
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
								<FormItem label="采购单名称">
										<Input v-model="formItem.orderName" placeholder="请输入订单名称"></Input>
								</FormItem>
								<FormItem label="采购单编号">
										<Input v-model="formItem.orderID" placeholder="请输入订单编号"></Input>
								</FormItem>
								
								<FormItem label="采购日期">
										<Col span="12">
												<DatePicker type="date" :options="options" placeholder="Select date" style="width: 200px"></DatePicker>
										</Col>
								</FormItem>
								<FormItem label="出单人员">
										<Input v-model="formItem.CDPerson" placeholder="请输入出单人员"></Input>
								</FormItem>
								<FormItem label="审核人员">
										<Input v-model="formItem.SHPerson" placeholder="请输入审核人员"></Input>
								</FormItem>
						</Form>
				</Modal>
		</div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {'title': '序号', 'key': 'number', 'width': 80},
                    {'title': '订单名称', 'key': 'orderName'},
                    {'title': '对应订单', 'key': 'orderID'},
                    {'title': '采购日期', 'key': 'CGDate'},
                    {'title': '录入日期', 'key': 'LRDate'},
                    {'title': '出单人', 'key': 'CDPerson'},
                    {'title': '审核人', 'key': 'SHPerson'},
                    {'title': '录入员', 'key': 'LRPerson'},
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
                                            this.editPurchase(params)
                                        }
                                    }
                                }, '查看订单')
                            ])
                        }
                    }
                ],
                tableData: [],
								options: '',
                page: 1,
                totalCount: '',
                searchValue: '',
                showEdit: false,
                formItem: {
                    orderName: '',
                    orderID: '',
                    CGDate: '',
                    CDPerson: '',
                    SHPerson: ''
                }
            }
        },
        methods: {
            changPage(page) {
                this.page = page
                this.getPurchase()
            },
            getPurchase() {
                let params = {
                    'page': this.page,
                    'pageSize': 10,
                    'search': this.searchValue
                }
                this.$api.getPurchase(params).then(res => {
                    res = res.data
                    this.totalCount = res.data.count
                    this.tableData = res.data.info
                    this.searchValue = ''
                })
            },
            submitEdit() {
                let params = {
                    'whereStr': {
                        '_id': this.formItem['_id']
                    },
                    'updateStr': this.formItem
                }
                this.$api.editPurchase(params).then(res => {
                    res = res.data
                    if (res.code === 0 && res.data) {
                        this.showEdit = false
                    }
                })
            },
            cancel() {
            
            },
            editPurchase() {
                this.showEdit = true
                this.formItem = params.row
            }
        },
        mounted() {
            this.getPurchase()
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
