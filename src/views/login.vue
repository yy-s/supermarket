<template>
	<section>
		<div class="header"></div>
		<Card style="width: 400px">
			<h1>登录</h1>
			<Form ref="formCustom" :model="formCustom" :label-width="80">
				<FormItem label="登录名" prop="admin">
					<label>
						<Input type="text" v-model="formCustom.admin" number></Input>
					</label>
				</FormItem>
				<FormItem label="密  码 " prop="pwd">
					<label>
						<Input type="password" v-model="formCustom.pwd"></Input>
					</label>
				</FormItem>
				<FormItem>
					<Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
					<Button type="primary" @click="handleSubmit(formCustom)">登录</Button>
				</FormItem>
			</Form>
			<router-link to="/reg">还没有账号，点击注册</router-link>
		</Card>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				formCustom: {
					admin: '',
					pwd: ''
				}
			}
		},
		methods: {
			handleSubmit (formCustom) {
				this.$api.login(formCustom).then(res => {
					res = res.data
					if (res.code === 4 || res.code === 3) {
						this.$Message.warning(res.data)
					} else if (res.code === 0) {
						if (res.data.type === 1) {
							this.$router.push({path:'/s/home'})
						} else if (res.data.type === 2) {
							this.$router.push({path:'/s/home'})
						}
						localStorage.setItem('realName', res.data.realName)
						localStorage.setItem('type', res.data.type)
					}
				})
			},
			handleReset (name) {
				this.$refs[name].resetFields();
			}
		}
	}
</script>

<style scoped lang="less">
	section {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		.header {
			height: 80px;
			width: 100%;
			background-color: #666;
		}
		h1 {
			font-size: 30px;
			margin: 20px 0 40px 0;
		}
		.ivu-card-bordered {
			margin: 50px auto;
		}
		form {
			width: 350px;
			/*margin: auto;*/
			.ivu-btn {
				margin-top: 15px;
			}
			.ivu-btn-default {
				margin-right: 50px;
			}
		}
		a {
			margin-left: -220px;
		}
	}
</style>
