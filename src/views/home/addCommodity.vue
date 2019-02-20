<template>
	<div>
		<Breadcrumb>
			<BreadcrumbItem to="/s">
				<Icon type="ios-home-outline"></Icon>  首页
			</BreadcrumbItem>
			<BreadcrumbItem to="/s/commodity">
				<Icon type="md-cart"></Icon> 商品管理
			</BreadcrumbItem>
			<BreadcrumbItem to="/s/addCommodity">
				<Icon type="md-add"></Icon> 添加商品
			</BreadcrumbItem>
		</Breadcrumb>
		<Card style="width: 470px">
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
				<FormItem>
					<Button style="margin-left: 8px" to="/commodity">退出</Button>
					<Button type="primary" @click="addCommodity(formItem)">提交</Button>
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
					CName: '',
					id: '',
					type: '',
					JPrice: '',
					SPrice: '',
					supplier: '',
					count: ''
				}
			}
		},
		methods: {
			addCommodity(formItem) {
				this.$api.addCom(formItem).then(res => {
					res = res.data
					if (res.code === 0) {
						this.$router.push({path: '/s/commodity'})
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
