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
										<Col span="12">
												<DatePicker type="date" :options="options" placeholder="Select date" style="width: 200px"></DatePicker>
										</Col>
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
                    LRDate: new Date().toLocaleDateString(),
                    CDPerson: '',
                    SHPerson: '',
                    LRPerson: localStorage.getItem('admin')
                },
                options: {
                    disabledDate(date) {
                        return date && date.valueOf() > Date.now() - 86400000
                    }
                }
            }
        },
        methods: {
            addPurchase(formItem) {
                console.log(formItem)
                this.$api.addPurchase(formItem).then(res => {
                    res = res.data
                    if (res.code === 0) {
                        this.$router.push({path: '/s/purchase'})
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
