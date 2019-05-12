<template>
		<div>
				<Breadcrumb>
						<BreadcrumbItem to="/s">
								<Icon type="ios-home-outline"></Icon>  首页
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/order">
								<Icon type="md-paper"></Icon>
								订单记录
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/addSupplier">
								<Icon type="md-add"></Icon>
								添加订单
						</BreadcrumbItem>
				</Breadcrumb>
				<Card style="width: 470px">
						<Form :model="formItem" :label-width="80">
								<FormItem label="订单名称">
										<Input v-model="formItem.orderName" placeholder="请输入订单名称"></Input>
								</FormItem>
								<FormItem label="订单编号">
										<Input v-model="formItem.orderID" placeholder="请输入订单编号"></Input>
								</FormItem>
								<FormItem label="金额">
										<Input v-model="formItem.price" placeholder="请输入订单金额"></Input>
								</FormItem>
								<FormItem label="合作超市">
										<Input v-model="formItem.supplier" placeholder="请输入合作超市"></Input>
								</FormItem>
								<FormItem label="审核人员">
										<Input v-model="formItem.SHPerson" placeholder="请输入审核人员"></Input>
								</FormItem>
								<FormItem label="录入人员">
										<Input v-model="formItem.LRPerson" placeholder="请输入录入人员" disabled></Input>
								</FormItem>
								<FormItem label="采购单">
										<Input v-model="formItem.purchaseID" placeholder="请输入采购记录"></Input>
								</FormItem>
								<FormItem label="录入日期">
										<Input v-model="formItem.date" placeholder="请输入录入时间" disabled></Input>
								</FormItem>
								<FormItem>
										<Button style="margin-left: 8px" to="/s/order">退出</Button>
										<Button type="primary" @click="addOrder(formItem)">提交</Button>
								</FormItem>
						</Form>
				</Card>
		</div>
</template>

<script>
    export default {
        data () {
            return {
                formItem: {
                    orderName: '',
                    orderID: '',
                    price: '',
                    supplier: '',
                    SHPerson: '',
                    LRPerson: localStorage.getItem('admin'),
                    purchaseID: '',
                    date: new Date().toLocaleDateString(),
                    By: localStorage.getItem('admin')
                },
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now() - 86400000;
                    }
                }
            }
        },
        methods: {
            addOrder(formItem) {
                formItem.action = 0
                formItem.status = 0
                this.$api.addOrder(formItem).then(res => {
                    res = res.data
                    if (res.code === 0) {
                        this.$router.push({path: '/v/order'})
                    }
                })
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
