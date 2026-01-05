<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import type { UserForm, userInfo } from "../../../services/type"
import { createApi, updateApi } from "../../../services"
import { ElMessage } from "element-plus"

interface Emits {
	refresh: []
}
interface Props {
	updateInfo: userInfo | null
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const userFormRef = ref<FormInstance>()
const visible = defineModel<boolean>("visible")
const userForm = reactive<UserForm>({
	username: "",
	age: 18,
	sex: 1,
	email: "",
	password: ""
})
// 表单规则
const formRules = reactive<FormRules<UserForm>>({
	username: [{ required: true, message: "请输入用户名" }],
	age: [{ required: true, message: "请输入年龄" }],
	email: [{ required: true, message: "请输入邮箱" }],
	sex: [{ required: true, message: "请选择性别" }],
	password: [{ required: true, message: "请输入密码" }]
})
// 创建用户数据
const createData = async () => {
	try {
		const res = await createApi(userForm)
		if (res.data.code === 0) {
			ElMessage.success("创建成功")
			emits("refresh")
			visible.value = false
		} else {
			ElMessage.error(res.data.msg)
		}
	} catch (e) {
		console.log(e)
	}
}
const updateData = async () => {
	try {
		const res = await updateApi({
			...userForm,
			id: props.updateInfo!.id
		})
		console.log(res.data)
		if (res.data.code === 0) {
			ElMessage.success("更新成功！")
			// 创建成功，关闭弹窗，通知父组件更新列表
			emits("refresh")
			visible.value = false
		} else {
			ElMessage.error("")
		}
	} catch (e) {
		console.log(e)
	}
}
// 点击确定进行校检并创建用户数据或者编辑更新用户数据
const submit = async () => {
	await userFormRef.value?.validate()
	// 如果是编辑用户
	if (props.updateInfo) {
		updateData()
	} else {
		createData()
	}
}

// 监听visible 变为false 重置内部数值
watch(visible, async () => {
	if (visible.value) {
		if (props.updateInfo) {
			const { username, age, sex, email, password } = props.updateInfo!
			await nextTick() //将赋值推迟到下一次Dom更新循环之后
			Object.assign(userForm, { username, age, sex, email, password })
		}
	} else {
		userFormRef.value?.resetFields()
	}
})
// 判断updateInfo里是否有内容
const modelTitle = computed(() => {
	return props.updateInfo ? "编辑用户" : "创建用户"
})
</script>
<template>
	<el-dialog v-model="visible" :title="modelTitle" width="500">
		<el-form ref="userFormRef" :model="userForm" :rules="formRules" :label-width="100">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="userForm.username" autocomplete="off" />
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input v-model="userForm.age" autocomplete="off" />
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-select v-model="userForm.sex" placeholder="请选择性别">
					<el-option label="男" :value="1" />
					<el-option label="女" :value="0" />
				</el-select>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="userForm.email" autocomplete="off" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="userForm.password" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="visible = false">取消</el-button>
				<el-button type="primary" @click="submit">确定</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<style scoped lang="scss"></style>
