<template>
		<div>
				<Breadcrumb>
						<BreadcrumbItem to="/s">
								<Icon type="ios-home-outline"></Icon>  首页
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/purchase">
								<Icon type="md-print"></Icon>
								供应厂商
						</BreadcrumbItem>
						<BreadcrumbItem to="/s/addSupplier">
								<Icon type="md-add"></Icon>
								添加供应厂商
						</BreadcrumbItem>
				</Breadcrumb>
				<Card style="width: 470px">
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
								<FormItem label="开始合作日期">
										<Col span="12">
												<DatePicker type="date" v-model="formItem.startDate" :options="options" placeholder="Select date" style="width: 200px"></DatePicker>
										</Col>
								</FormItem>
								<FormItem>
										<Button style="margin-left: 8px" to="/s/supplier">退出</Button>
										<Button type="primary" @click="addSupplier(formItem)">提交</Button>
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
										SName: '',
										address: '',
										tel: '',
										comm: '',
										startDate: this.options,
										status: '正常'
								},
								options: {
										disabledDate (date) {
												return date && date.valueOf() > Date.now() - 86400000;
										}
								}
						}
				},
				methods: {
						addSupplier(formItem) {
								this.$api.addSupp(formItem).then(res => {
										res = res.data
										if (res.code === 0) {
												this.$router.push({path: '/s/supplier'})
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
