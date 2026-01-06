<script lang="ts" setup>
import { reactive, ref, watch, computed, nextTick } from 'vue'
import type { UserCreateParams, UserInfo } from '../../../services/type'
import type { FormInstance, FormRules } from 'element-plus'
import { createUserApi, updateUserApi } from '../../../services'
import { ElMessage } from 'element-plus'

// interface Emits {
//   (e: 'refresh'): void
// }
interface Emits {
  refresh: []
}
interface Props {
  updateInfo: UserInfo | null
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const visible = defineModel<boolean>('visible')

const userFormRef = ref<FormInstance>()
const userForm = reactive<UserCreateParams>({
  username: '',
  age: 18,
  sex: 1,
  email: '',
  password: ''
})
const formRules = reactive<FormRules<UserCreateParams>>({
  username: [{ required: true, message: '请输入用户名!' }],
  age: [{ required: true, message: '请输入年龄!' }],
  email: [{ required: true, message: '请输入邮箱!' }],
  sex: [{ required: true, message: '请选择性别!' }],
  password: [{ required: true, message: '请输入密码!' }]
})

const create = async () => {
  try {
    const res = await createUserApi(userForm)
    if (res.data.code === 0) {
      ElMessage.success('创建成功！')
      // 创建成功，关闭弹窗，通知父组件更新列表
      emits('refresh')
      visible.value = false
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch(e) {
    console.log(e)
  }
}

const update = async () => {
  try {
    const res = await updateUserApi({
      ...userForm,
      id: props.updateInfo!.id
    })
    if (res.data.code === 0) {
      ElMessage.success('更新成功！')
      // 创建成功，关闭弹窗，通知父组件更新列表
      emits('refresh')
      visible.value = false
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch(e) {
    console.log(e)
  }
}

const submit = async () => {
  await userFormRef.value?.validate()
  if (props.updateInfo) {
    update()
  } else {
    create()
  }
}

watch(visible, async () => {
  if (visible.value) {
    // 展示弹窗时，如果是编辑弹窗就给表单反显数据
    if (props.updateInfo) {
      const { username, email, age, sex, password } = props.updateInfo
      await nextTick()
      Object.assign(userForm, { username, email, age, sex, password })
    }
  } else {
    userFormRef.value?.resetFields()
  }
})

const modalTitle = computed(() => {
  return props.updateInfo ? '编辑用户' : '创建用户'
})
</script>

<template>
  <el-dialog v-model="visible" :title="modalTitle" width="500">
    <el-form ref="userFormRef" :model="userForm" :rules="formRules" :label-width="100">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" autocomplete="off" />
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
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang='scss' scoped>

</style>
