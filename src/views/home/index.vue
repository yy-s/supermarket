<template>
	<p>欢迎进入{{type}}后台管理系统</p>
</template>

<script>
	export default {
		data() {
			return {
				type: localStorage.getItem('type') === '1' ? '超市' : '经销商'
			}
		}
	}
</script>

<style lang="less" scoped>
	p {
		margin: 100px auto;
		font-size: 60px;
	}
</style>
