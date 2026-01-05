<script setup lang="ts">
import { ref, onMounted, watchEffect, watch, nextTick } from "vue"
import Layout from "../../components/Layout.vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { listApi, delUserApi } from "../../services"
import type { userInfo } from "../../services/type"
import { sexEnum } from "./constants"
import Password from "./components/Password.vue"
import ShowModal from "./components/ShowModal.vue"
import Filter from "./components/Filter.vue"
import type { FilterSearch } from "../../services/type"
import * as XLSX from 'xlsx';
import { exportApi } from "../../services"
import { downloadFile } from "../../utils"
import type { TableInstance } from 'element-plus'

const multipleTableRef = ref<TableInstance>()

const list = ref<userInfo[]>([])
const total = ref<number>()
const currentpage = ref<number>(1)
const pagesize = ref<number>(5)
const loading=ref(false)
const filterParams = ref<FilterSearch>({})
// 展示编辑或者创建框
const showModal = ref(false)
// 更新数据
const updateRow = ref<userInfo | null>(null)
// 列表数据
const listData = async () => {
	loading.value=true
	try {
		const res = await listApi({
			page: currentpage.value,
			pagesize: pagesize.value,
			...filterParams.value
		})
		console.log(res.data)
		list.value = res.data.values.list
		total.value = res.data.values.total
		console.log(list.value)
		await nextTick()
		selectRow()
	} catch (e) {
		ElMessage("网络错误，请稍后重试")
	}finally{
		loading.value=false
	}
}
onMounted(() => {
	listData()
})
// 监视listData的改动
watchEffect(() => {
	listData()
})
// 删除数据
const delUser = async (id: string) => {
	try {
		const res = await delUserApi(id)
		console.log(res.data)
		if (res.data.code === 0) {
			ElMessage.success("删除成功")
			listData()
		} else {
			ElMessage.error(res.data.msg)
		}
	} catch (e) {
		console.log(e)
	}
}
// 删除按钮
const handleDel = async (user: userInfo) => {
	try {
		await ElMessageBox.confirm(`你确定要删除 ${user.username}吗？`, "警告", {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning"
		})
		delUser(user.id)
	} catch (e) {
		ElMessage.warning("取消删除")
	}
}
// 展示创建 编辑弹窗
const showUpdateModal = (user: userInfo) => {
	showModal.value = true
	updateRow.value = { ...user }
}
watch(showModal, () => {
	if (!showModal.value) {
		updateRow.value = null
	}
})
const startSearch = (value: FilterSearch) => {
	console.log("从子组件接收到的数据", value)
	filterParams.value = value
}


const selectionData = ref<userInfo[]>([])
const handleSelectionChange = (users: userInfo[]) => {
	// console.log(users)
	selectionData.value = users
}
// 存选中的id
const selectionIds=new Set<string>()
// 分页改变时上一页选中的数据
watch(()=>currentpage.value,()=>{
	selectionData.value.forEach(item=>{
		selectionIds.add(item.id)
	})
	console.log(selectionIds)
})
// 选中数据
const selectRow=()=>{
	list.value.forEach(item=>{
		// 查找此行数据之前是否被选中
		if(selectionIds.has(item.id)){
			multipleTableRef.value?.toggleRowSelection(item)
		}
	})
}
watch([selectionData,()=>currentpage.value],
([newSelection,newPage],[oldSelection,oldPage])=>{
	console.log('新数据',newSelection,newPage)
	console.log('旧数据',oldSelection,oldPage)
	// 分页没变但是数据改变时找出删除的数据
	if(newPage===oldPage&&!loading.value){
		const delIds=oldSelection.filter(item=>!newSelection.find(v=>{v.id===item.id})).map(item=>item.id)
		delIds.forEach(id=>{
			selectionIds.delete(id)
		})
		console.log('删除的',delIds)
	}else{
		selectionData.value.forEach(item=>{
			selectionIds.add(item.id)
		})
	}
}
)
// 前端导出表格
const exportBefore=()=>{
const cnList=	selectionData.value.map(item=>{
		return {
			'序号':item.no,
			'用户id':item.id,
			'用户名':item.password,
			'年龄':item.age,
			'性别':item.sex,
			'邮箱':item.email,
			'密码':item.password,
		}
	})
	// 创建一个excel表格
	const workbook = XLSX.utils.book_new();
	const worksheet1 = XLSX.utils.json_to_sheet(selectionData.value)
	const worksheet2 = XLSX.utils.json_to_sheet(cnList)
	XLSX.utils.book_append_sheet(workbook, worksheet1, '用户数据')
	XLSX.utils.book_append_sheet(workbook, worksheet2, '用户数据中文表头')
	XLSX.writeFile(workbook, '用户数据列表')
}
const exportData = async () => {
	console.log(selectionData.value)
	if (selectionData.value.length === 0) {
		ElMessage.warning('请选择要导出的数据')
		return
	}	// exportBefore()

	// 通过后端接口导出表格
	// const ids=selectionData.value.map(item=>item.id)
	selectionData.value.map(item=>{
		selectionIds.add(item.id)
	})
	const ids=[...selectionIds]
	const res =await exportApi(ids)
	console.log(res.data)
	// 读取二进制文件在内存中的临时地址
	const url=window.URL.createObjectURL(res.data)
	console.log(url)
	// 创建a标签 点击 下载 
	downloadFile(url,'用户数据列表.xlsx')
	// 清除文件的临时地址
	window.URL.revokeObjectURL(url)
	// const link=document.createElement('a')
	// link.href=url
	// link.download='用户数据列表.xlsx'
	// document.body.appendChild(link)
	// link.click()
}
</script>
<template>
	<Layout>
		<Filter @search="startSearch"></Filter>
		<el-space style="padding: 15px 0">
			<el-button link type="primary" size="small" @click="showModal = true">创建用户
			</el-button>
			<el-button link type="primary" size="small" @click="exportData">导出数据</el-button>
		</el-space>

		<el-table ref="multipleTableRef" :data="list" :row-key="(row: userInfo) => row.id" style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" />
			<el-table-column prop="no" label="序号" width="100" />
			<el-table-column prop="id" label="用户id" width="120" />
			<el-table-column prop="username" label="用户名" width="150" />
			<el-table-column prop="age" label="年龄" width="100">
				<template #default="{ row }">{{ row.age ? row.age : "---" }}</template>
			</el-table-column>
			<el-table-column label="性别" width="100">
				<template #default="{ row }">
					<!-- <el-tag type="primary" v-if="row.sex === 1">男</el-tag>
					<el-tag type="danger" v-else>女</el-tag> -->
					<el-tag :type="sexEnum[(row as userInfo).sex]?.type" v-if="row.sex !== undefined ">
						{{ sexEnum[(row as userInfo).sex]?.text }}
					</el-tag>
					<span v-else>---</span>
				</template>
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="200">
				<template #default="{ row }">{{ row.email ? row.email : "---" }}</template>
			</el-table-column>
			<el-table-column prop="password" label="密码" width="200">
				<template #default="{ row }">
					<Password :password="row.password" :abc="123"></Password>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template #default="{ row }">
					<el-button link type="primary" size="small" @click="showUpdateModal(row)">编辑
					</el-button>
					<el-button link type="danger" size="small" @click="handleDel(row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-model:page-size="pagesize" v-model:current-page="currentpage" :page-sizes="[5, 10, 15, 20]"
			background layout="total, sizes, prev, pager, next, jumper" :total="total" />
		<ShowModal v-model:visible="showModal" :updateInfo="updateRow" @refresh="listData"></ShowModal>
	</Layout>
</template>

<style scoped lang="scss">
.el-pagination {
	padding: 20px 0;
	justify-content: flex-end;
}
</style>
