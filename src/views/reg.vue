<template>
	<section>
		<div class="header"></div>
		<Card style="width: 400px">
			<h1>注册</h1>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
				<FormItem label="登录名" prop="userName">
					<label>
						<Input type="text" v-model="formCustom.admin" number></Input>
					</label>
				</FormItem>
				<FormItem label="账号名称" prop="realName">
					<label>
						<Input type="text" v-model="formCustom.realName" number></Input>
					</label>
				</FormItem>
				<FormItem label="密  码 " prop="pwd">
					<label>
						<Input type="password" v-model="formCustom.pwd"></Input>
					</label>
				</FormItem>
				<FormItem label="确认密码" prop="passwdCheck">
					<label>
						<Input type="password" v-model="formCustom.passwdCheck"></Input>
					</label>
				</FormItem>
				<FormItem label="账号类型">
					<label>
						<Select v-model="formCustom.type">
							<Option value="超市管理员">超市管理员</Option>
							<Option value="经销商">经销商</Option>
						</Select>
					</label>
				</FormItem>
				<FormItem>
					<Button @click="handleReset(formCustom)" style="margin-left: 8px">重置</Button>
					<Button type="primary" @click="handleSubmit(formCustom)">提交</Button>
				</FormItem>
			</Form>
		</Card>
	</section>
</template>

<script>
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please enter your password'));
				} else {
					if (this.formCustom.passwdCheck !== '') {
						// 对第二个密码框单独验证
						this.$refs.formCustom.validateField('passwdCheck');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please enter your password again'));
				} else if (value !== this.formCustom.pwd) {
					callback(new Error('The two input passwords do not match!'));
				} else {
					callback()
				}
			}
			
			return {
				formCustom: {
					admin: '',
					realName: '',
					pwd: '',
					passwdCheck: '',
					type: ''
				},
				ruleCustom: {
					passwd: [
						{validator: validatePass, trigger: 'blur'}
					],
					passwdCheck: [
						{validator: validatePassCheck, trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			handleSubmit(formCustom) {
				if (!formCustom.admin || !formCustom.realName || !formCustom.pwd || !formCustom.type) {
					this.$Message.warning('信息不全，请补全基本信息！');
					return
				}
				this.$api.login(formCustom).then(res => {
					res = res.data
					if (res.code === 4 || res.data.admin) {
						this.$Message.warning('登录名已存在，请重新输入用户名！')
						formCustom.admin = ''
					} else {
						this.$api.reg(formCustom).then(res => {
							if (res.data.code === 0) {
								const that = this
								this.$Message.info({
									content: '注册成功，即将跳转到登录页面...',
									duration: 2,
									onClose: function () {
										that.$router.push({path:'/'})
									}
								});
							}
						}).catch(err => {
							console.log(err)
						})
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
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
		.ivu-card-bordered {
			margin: 50px auto;
		}
		h1 {
			font-size: 30px;
			margin: 20px auto;
		}
		form {
			width: 350px;
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
