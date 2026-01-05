<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { loginApi } from "../../../services"
import { useRouter } from "vue-router"
import { useUserStore } from "../../../store/user"
const emits = defineEmits(["toggle"])
const router = useRouter()
const loading = ref(false)
const userStore = useUserStore()

interface loginForm {
	username: string
	password: string
}

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<loginForm>({
	username: "",
	password: ""
})
const loginRules = reactive<FormRules<loginForm>>({
	username: [
		{ required: true, message: "请输入用户名", trigger: "change" },
		{ min: 3, max: 5, message: "用户名长度为3-5", trigger: "change" }
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "change" }
		// { min: 6, max: 12, message: "密码长度为6-12", trigger: "change" }
	]
})

const submit = async () => {
	//validate
	// 对整个表单的内容进行验证，接收一个回调函数或者返回Promise
	await loginFormRef.value?.validate()
	try {
		loading.value = true
		const res = await loginApi(loginForm)
		console.log(res.data)
		if (res.data.code === 0) {
			ElMessage.success("登录成功")
			localStorage.setItem("token", res.data.token!)
			router.push("/")
			userStore.getUserInfo()
		} else {
			ElMessage.error(res.data.msg)
		}
	} catch (e) {
		ElMessage.error("网络错误，请稍后重试")
	} finally {
		loading.value = false
	}
}
</script>
<template>
	<div class="form">
		<h3>登录</h3>
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
			<el-form-item prop="username">
				<el-input placeholder="用户名" v-model="loginForm.username" />
			</el-form-item>
			<el-form-item prop="password">
				<el-input placeholder="密码" show-password v-model="loginForm.password" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit" :loading="loading"> 登录 </el-button>
				<el-button class="btn" type="text" @click="emits('toggle')"
					>还没有账号？去注册
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="scss" scoped>
.form {
	width: 350px;
	padding: 20px;
	background-color: #fff;
	min-height: 150px;

	h3 {
		margin-bottom: 20px;
		text-align: center;
	}

	.el-button {
		width: 100%;
	}

	.btn {
		margin-left: 0 !important;
		margin-top: 5px;
	}
}
</style>
