<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue'
import Layout from '../../components/Layout/Layout.vue'
import { getUsersApi, delUserApi } from '../../services'
import type { UserInfo } from '../../services/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sexEnum } from './constants'
import Password from './componetns/Password.vue'
import UserModal from './componetns/UserModal.vue'

const userList = ref<UserInfo[]>([])
const total = ref(0)
const params = reactive({
  page: 1,
  pagesize: 5
})
const showModal = ref(false)
const updateRow = ref<UserInfo | null>(null)

const getUserList = async () => {
  try {
    const res = await getUsersApi(params)
    userList.value = res.data.values.list
    total.value = res.data.values.total
  } catch(e) {
    console.log(e)
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
</script>

<template>
  <Layout>
    <el-space style="padding: 15px 0;">
      <el-button type="primary" @click="showModal = true">创建用户</el-button>
      <el-button>导出数据</el-button>
    </el-space>
    <el-table :data="userList" :row-key="(row: UserInfo) => row.id" style="width: 100%">
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
