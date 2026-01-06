<script setup lang="ts">
import { nextTick, reactive, ref, watch, watchEffect } from 'vue'
import Layout from '../../components/Layout/Layout.vue'
import { getUsersApi, delUserApi, exportsApi } from '../../services'
import type { UserInfo, FilterSearch } from '../../services/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sexEnum } from './constants'
import Password from './componetns/Password.vue'
import UserModal from './componetns/UserModal.vue'
import * as XLSX from 'xlsx'
import { downloadFile } from '../../utils'
import type { TableInstance } from 'element-plus'
import Filter from './componetns/Filter.vue'

const multipleTableRef = ref<TableInstance>()

const userList = ref<UserInfo[]>([])
const total = ref(0)
const params = reactive({
  page: 1,
  pagesize: 5
})
const showModal = ref(false)
const updateRow = ref<UserInfo | null>(null)
const loading = ref(false)
const filterParams = ref<FilterSearch>({})

const getUserList = async () => {
  loading.value = true
  try {
    const res = await getUsersApi({ ...params, ...filterParams.value})
    userList.value = res.data.values.list
    total.value = res.data.values.total
    await nextTick()
    selectRow()
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  getUserList()
})

const delUser = async (id: string) => {
  try {
    const res = await delUserApi(id)
    if (res.data.code === 0) {
      ElMessage.success('删除成功！')
      getUserList()
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch(e) {
    console.log(e)
  }
}

const handleDel = async (user: UserInfo) => {
  try {
    await ElMessageBox.confirm(
      `你确定要删除 ${user.username} 吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    delUser(user.id)
  } catch(e) {
    ElMessage.warning('取消删除!')
  }
}
const showUpdateModal = (user: UserInfo) => {
  showModal.value = true
  updateRow.value = { ...user }
}
watch(showModal, () => {
  if (!showModal.value) {
    updateRow.value = null
  }
})

const selectionData = ref<UserInfo[]>([])
const handleSelectionChange = (users: UserInfo[]) => {
  selectionData.value = users
}
// 前端导出数据
const feExport = () => {
  const cnList = selectionData.value.map(item => {
    return {
      '用户序号': item.no,
      '用户id': item.id,
      '用户名': item.username,
      '年龄': item.age,
      '性别': item.sex,
      '邮箱': item.email,
      '密码': item.password,
    }
  })
  const workbook = XLSX.utils.book_new()
  const worksheet1 = XLSX.utils.json_to_sheet(selectionData.value)
  const worksheet2 = XLSX.utils.json_to_sheet(cnList)
  XLSX.utils.book_append_sheet(workbook, worksheet1, '用户数据')
  XLSX.utils.book_append_sheet(workbook, worksheet2, '用户数据中文表头')
  XLSX.writeFile(workbook, '用户列表.xlsx')
}
const exportData = async () => {
  if (selectionData.value.length === 0) {
    ElMessage.warning('请选择需要导出的数据！')
    return
  }
  selectionData.value.forEach(item => {
    selectionIds.add(item.id)
  })
  const ids = [...selectionIds]
  const res = await exportsApi(ids)
  // 读取此二进制文件在内存中的临时地址
  const url = window.URL.createObjectURL(res.data)
  downloadFile(url, '用户列表.xlsx')
  // 清除文件的临时地址
  window.URL.revokeObjectURL(url)
}

// 存选中的id
const selectionIds = new Set<string>()

// 选中数据
const selectRow = () => {
  userList.value.forEach(item => {
    // 查找此行数据之前是否选中
    if (selectionIds.has(item.id)) {
      multipleTableRef.value?.toggleRowSelection(item)
    }
  })
}

watch(
  [selectionData, () => params.page],
  ([newSelection, newPage], [oldSelection, oldPage]) => {
    console.log('老数据', oldSelection, oldPage)
    console.log('新数据', newSelection, newPage)
    // 分页没变但是数据改变时找出删除数据
    if (newPage === oldPage && !loading.value) {
      const delIds = oldSelection.filter(item => !newSelection.find(v => v.id === item.id)).map(item => item.id)
      delIds.forEach(id => {
        selectionIds.delete(id)
      })
      console.log('删除的', delIds)
    } else {
      // 切换分页时存上一页的id
      selectionData.value.forEach(item => {
        selectionIds.add(item.id)
      })
    }
  }
)

// 开始搜索
const startSearch = (value: FilterSearch) => {
  console.log('接收子组件传过来的搜索数据', value)
  filterParams.value = value
}
</script>

<template>
  <Layout>
    <Filter @search="startSearch" />
    <el-space style="padding: 15px 0;">
      <el-button type="primary" @click="showModal = true">创建用户</el-button>
      <el-button @click="exportData">导出数据</el-button>
    </el-space>
    <el-table
      ref="multipleTableRef"
      :data="userList"
      :row-key="(row: UserInfo) => row.id"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="id" label="用户id" width="200" />
      <el-table-column prop="no" label="序号" width="120" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="age" label="年龄" width="120">
        <template #default="{ row }">{{ row.age ? row.age : '-' }}</template>
      </el-table-column>
      <el-table-column label="性别" width="100">
        <template #default="{ row, $index }">
          <el-tag :type="sexEnum[(row as UserInfo).sex].type" v-if="row.sex !== undefined">
            {{ sexEnum[(row as UserInfo).sex].text }}
          </el-tag>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200">
        <template #default="{ row }">{{ row.email ? row.email : '-' }}</template>
      </el-table-column>
      <el-table-column prop="password" label="密码" width="150">
        <template #default="{ row }">
          <Password :password="row.password" :abc="123" />
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="showUpdateModal(row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleDel(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.page"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10, 15, 20]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <UserModal
      v-model:visible="showModal"
      :updateInfo="updateRow"
      @refresh="getUserList"
    />
  </Layout>
</template>

<style lang='scss' scoped>
.el-pagination {
  padding: 20px 0;
  justify-content: flex-end;
}
</style>
