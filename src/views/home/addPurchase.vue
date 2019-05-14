<template>
		<div>
				<Breadcrumb>
						<BreadcrumbItem to="/s">
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
						<BreadcrumbItem to="/s/addPurchase">
								<Icon type="md-add"></Icon>
								添加采购记录
						</BreadcrumbItem>
				</Breadcrumb>
				<Card style="width: 470px">
						<Form :model="formItem" :label-width="80">
								<FormItem label="采购单名称">
										<Input v-model="formItem.orderName" placeholder="请输入订单名称"></Input>
								</FormItem>
								<FormItem label="采购单编号">
										<Input v-model="formItem.orderID" placeholder="请输入订单编号"></Input>
								</FormItem>
								<FormItem label="采购日期">
										<Input v-model="formItem.CGDate" placeholder="请输入采购日期"></Input>
								</FormItem>
								<FormItem label="采购商品">
										<Input v-model="commsInfo" type="textarea" :rows="2" placeholder="添加商品信息" disabled=""/>
								</FormItem>
								<FormItem>
										<Button type="success" @click="addComm()">添加商品</Button>
								</FormItem>
								<FormItem label="订单金额">
										<Input v-model="formItem.price"></Input>
								</FormItem>
								<FormItem label="录入日期">
										<Input v-model="formItem.LRDate" placeholder="请输入录入时间" disabled></Input>
								</FormItem>
								<FormItem label="出单人员">
										<Input v-model="formItem.CDPerson" placeholder="请输入出单人员"></Input>
								</FormItem>
								<FormItem label="审核人员">
										<Input v-model="formItem.SHPerson" placeholder="请输入审核人员"></Input>
								</FormItem>
								<FormItem label="录入人员">
										<Input v-model="formItem.LRPerson" placeholder="请输入录入人员" disabled></Input>
								</FormItem>
								<FormItem>
										<Button style="margin-left: 8px" to="/commodity">退出</Button>
										<Button type="primary" @click="addPurchase(formItem)">提交</Button>
								</FormItem>
						</Form>
				</Card>
				<Modal
						v-model="addShow"
						title="添加商品信息"
						@on-ok="addComm_Pur"
						@on-cancel="cancel">
						<Form :model="addFormItem" :label-width="80">
								<FormItem label="商品编号">
										<Input v-model="addFormItem.id" placeholder="商品编号"></Input>
								</FormItem>
								<FormItem label="商品名称">
										<Input v-model="addFormItem.CName" placeholder="商品名称"></Input>
								</FormItem>
								<FormItem label="商品数量">
										<Input v-model="addFormItem.count" placeholder="商品数量"></Input>
								</FormItem>
								<FormItem label="商品价格">
										<Input v-model="addFormItem.JPrice" placeholder="商品价格"></Input>
								</FormItem>
						</Form>
				</Modal>
		</div>
</template>

<script>
    export default {
        data() {
            return {
                formItem: {
                    orderName: '',
                    orderID: '',
                    CGDate: this.option,
                    comms: [],
                    price: 0,
                    LRDate: new Date().toLocaleDateString(),
                    CDPerson: '',
                    SHPerson: '',
                    LRPerson: localStorage.getItem('admin'),
                    By: localStorage.getItem('admin')
                },
                addFormItem: {
                    id: '',
                    CName: '',
                    count: '',
                    JPrice: ''
                },
                options: {
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now() - 86400000
                    }
                },
                addShow: false,
                commsInfo: ''
            }
        },
        methods: {
            addPurchase(formItem) {
                this.$api.addPurchase(formItem).then(res => {
                    res = res.data
                    if (res.code === 0) {
                        this.$router.push({path: '/s/purchase'})
                    }
                })
            },
            addComm_Pur() {
                this.formItem.comms.push(this.addFormItem)
                this.formItem.comms.map(({count, CName}) => {
                    this.commsInfo += CName + '*' + count + ';'
                })
                this.formItem.price += (this.addFormItem.count * this.addFormItem.JPrice)
                this.addFormItem = {
                    id: '',
                    CName: '',
                    count: '',
                    JPrice: ''
                }
                this.addShow = false
            },
            addComm() {
                this.addShow = true
            },
            cancel() {
            
            }
        }
    }
</script>

<style scoped lang="less">
		.ivu-breadcrumb {
				background-color: #fff;
				font-size: 14px;
				margin-top: 12px;
				padding: 5px 20px;
				border-radius: 7px;
				-ms-text-align-last: right;
				text-align: left;
		}
		
		form {
				width: 400px;
				
				.ivu-select {
						width: 50%;
						float: left;
				}
		}
		
		.ivu-card-bordered {
				margin: 20px auto;
				padding: 20px;
		}
</style>
