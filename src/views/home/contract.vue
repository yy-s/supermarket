<template>
		<div>
				<Breadcrumb>
						<BreadcrumbItem to="/s/">
								<Icon type="ios-home-outline"></Icon>
								首页
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/commodity">
								<Icon type="md-cart"></Icon>
								合同管理
						</BreadcrumbItem>
				</Breadcrumb>
				<Row :gutter="32">
						<Col span="32" class="demo-tabs-style1">
								<Tabs type="card">
										<TabPane label="录入合同">
												<Card style="width: 470px">
														<Form :model="formItem" :label-width="80">
																<FormItem label="合同编号">
																		<Input v-model="formItem.CID" placeholder="请输入合同编号"></Input>
																</FormItem>
																<FormItem label="签订日期">
																		<Col span="12">
																				<DatePicker type="date" :options="options" placeholder="Select date" style="width: 200px"
																										v-model="formItem.QDDate"></DatePicker>
																		</Col>
																</FormItem>
																<FormItem label="合作方">
																		<Input v-model="formItem.HeZuoFang" placeholder="请输入录入时间"></Input>
																</FormItem>
																<FormItem label="录入日期">
																		<Input v-model="formItem.LRDate" placeholder="请输入录入时间" disabled></Input>
																</FormItem>
																<FormItem label="相关采购记录">
																		<Input v-model="formItem.PurchaseID" placeholder="请输入录入时间"></Input>
																</FormItem>
																<FormItem label="合同详情">
																		<Input v-model="formItem.CXQ" placeholder="请输入合同文件"></Input>
																</FormItem>
																<FormItem>
																		<Button style="margin-left: 8px" @click="handleReset('formCustom')">重置</Button>
																		<Button type="primary" @click="addContract(formItem)">提交</Button>
																</FormItem>
														</Form>
												</Card>
										</TabPane>
										<TabPane label="审核中">
												<div class="search">
														<p class="searchText">
																<Input v-model="searchValue" placeholder="输入合同编号进行搜索" style="width: 300px"></Input>
																<Button type="info" @click="getPurchase()">搜索</Button>
														</p>
												</div>
												<div class="table">
														<Table border :columns="columns_doing" :data="tableData_doing"></Table>
												</div>
												<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
										</TabPane>
										<TabPane label="已审核">
												<div class="search">
														<p class="searchText">
																<Input v-model="searchValue" placeholder="输入合同编号进行搜索" style="width: 300px"></Input>
																<Button type="info" @click="getPurchase()">搜索</Button>
														</p>
												</div>
												<div class="table">
														<Table border :columns="columns_ending" :data="tableData_ending"></Table>
												</div>
												<Page :current="page" :total="totalCount" simple @on-change="changPage"/>
										</TabPane>
								</Tabs>
						</Col>
				</Row>
		</div>
</template>

<script>
    export default {
        data() {
            return {
                columns_doing: [
                    {'title': '序号', 'key': 'number', 'width': '100'},
                    {'title': '合同编号', 'key': 'CID'},
                    {'title': '合作方', 'key': 'HeZuoFang'},
                    {'title': '签订日期', 'key': 'QDDate'},
                    {'title': '录入日期', 'key': 'LRDate'},
                    {'title': '相关采购记录', 'key': 'PurchaseID'},
                    {
                        'title': '查看',
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
                                }, '详情')
                            ])
                        }
                    },
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
                                            this.passContract(params)
                                        }
                                    }
                                }, '审核完成')
                            ])
                        }
                    }
                ],
                columns_ending: [
                    {'title': '序号', 'key': 'number', 'width': '100'},
                    {'title': '合同编号', 'key': 'CID'},
                    {'title': '合作方', 'key': 'HeZuoFang'},
                    {'title': '签订日期', 'key': 'QDDate'},
                    {'title': '录入日期', 'key': 'LRDate'},
                    {'title': '相关采购记录', 'key': 'PurchaseID'},
                    {
                        'title': '查看',
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
                                }, '详情')
                            ])
                        }
                    }
                ],
                formItem: {
                    CID: '',
                    QDDate: '',
										HeZuoFang: '',
										PurchaseID: '',
                    LRDate: new Date().toLocaleDateString(),
                    CXQ: '',
                },
                totalCount: '',
								page: 1,
                tableData_doing: [],
                tableData_ending: [],
                searchValue: '',
								options: ''
            }
        },
        methods: {
            handleReset(name) {
                this.$refs[name].resetFields()
            },
            addContract(formItem) {
                this.formItem.type = 0
                this.$api.addContract(formItem).then(res => {
                    res = res.data
                    if (res.code === 0) {
                        // this.$router.push({path: '/s/contract'})
												this.formItem = {
                            CID: '',
                            QDDate: '',
                            LRDate: new Date().toLocaleDateString(),
                            CXQ: '',
                        }
                        this.getContractDoing()
                    }
                })
            },
            getContractDoing() {
                let params = {
                    'page': this.page,
                    'pageSize': 10,
                    'search': this.searchValue,
										'action': 'doing'
                }
                this.$api.getContract(params).then(res => {
                    res = res.data
                    this.totalCount = res.data.count
                    this.tableData_doing = res.data.info
                    this.searchValue = ''
                })
            },
						getContractEnding() {
                let params = {
                    'page': this.page,
                    'pageSize': 10,
                    'search': this.searchValue,
                    'action': 'ending'
                }
                this.$api.getContract(params).then(res => {
                    res = res.data
                    this.totalCount = res.data.count
                    this.tableData_ending = res.data.info
                    this.searchValue = ''
                })
						},
            passContract(data) {
                this.formItem = data.row
                this.formItem.type = 1
                let params = {
                    'whereStr': {
                        '_id': this.formItem['_id']
                    },
                    'updateStr': this.formItem
                }
                this.$api.editContract(params).then(res => {
                    res = res.data
                    if (res.code === 0 && res.data) {
                        this.getContractDoing()
                        this.getContractEnding()
                    }
                })
						},
            changPage() {
            
            }
        },
        mounted() {
            this.getContractDoing()
            this.getContractEnding()
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
		
		.ivu-card-bordered {
				margin: 30px auto;
		}
		
		form {
				width: 400px;
				margin: 0 auto;
				padding-top: 20px;
				
				.ivu-select {
						width: 50%;
						float: left;
				}
				
				.ivu-btn {
						margin-top: 15px;
				}
				
				.ivu-btn-default {
						margin-right: 50px;
				}
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
