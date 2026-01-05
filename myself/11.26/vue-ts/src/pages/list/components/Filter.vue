<script setup lang="ts">
	import { reactive, ref } from "vue"
	import type { FilterSearch } from "../../../services/type"
	import type { FormInstance } from "element-plus"

	interface Emits {
		search: [vales: FilterSearch]
	}

	const ruleFormRef = ref<FormInstance>()
	const emits = defineEmits<Emits>()

	const searchForm = reactive<FilterSearch>({
		username: undefined,
		age: undefined,
		sex: undefined,
		email: undefined
	})

	// 创建过滤函数，类型安全
	function filterEmptyValues<T extends object>(obj: T): Partial<T> {
		const result: Partial<T> = {};
		(Object.keys(obj) as Array<keyof T>).forEach((key) => {
			const val = obj[key]
			if (val !== undefined && val !== '' && val !== null) {
				result[key] = val
			}
		})
		return result
	}

	type FormKeys = keyof typeof searchForm

	const search = () => {
		console.log(searchForm)
		const form = filterEmptyValues(searchForm)
		// Object.keys(searchForm).forEach((key) => {
		// 	const val = searchForm[key]
		// 	if (val || typeof val === "number") {
		// 		form[key] = val
		// 	}
		// })
		emits("search", form)
	}
	const reset = () => {
		(Object.keys(searchForm) as FormKeys[]).forEach((key) => {
			searchForm[key] = undefined
		})
		emits("search", {})
	}
</script>
<template>
	<el-form ref="ruleFormRef" :inline="true" class="demo-form-inline" style="max-width: 900px" label-width="100">
		<el-form-item label="用户名">
			<el-input v-model="searchForm.username" placeholder="搜索用户名" clearable />
		</el-form-item>
		<el-form-item label="年龄">
			<el-input v-model="searchForm.age" placeholder="搜索年龄" clearable />
		</el-form-item>
		<el-form-item label="性别">
			<el-select v-model="searchForm.sex" placeholder="选择性别" clearable style="width: 200px">
				<el-option label="男" value="1" />
				<el-option label="女" value="0" />
			</el-select>
		</el-form-item>
		<el-form-item label="邮箱">
			<el-input v-model="searchForm.email" placeholder="搜索邮箱" clearable />
		</el-form-item>
		<el-form-item>
			<el-space>
				<el-button type="primary" @click="search">搜索</el-button>
				<el-button @click="reset">重置</el-button>
			</el-space>
		</el-form-item>
	</el-form>
</template>

<style scoped lang="scss"></style>
