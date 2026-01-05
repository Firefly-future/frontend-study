<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from '../../../services'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../store/user'

interface LoginForm {
  username: string
  password: string
}

const emits = defineEmits(['toggle'])
const router = useRouter()
const loading = ref(false)
const userStore = useUserStore()
// 获取组件实例
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})
const loginRules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: '请输入用户名！', trigger: 'change' },
    { min: 2, max: 5, message: '用户名长度在 2 - 5 位', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码！', trigger: 'change' }
  ]
})
const submit = async () => {
  // 调用 form 组件内部的方法
  await loginFormRef.value?.validate()
  try {
    loading.value = true
    const res = await loginApi(loginForm)
    if (res.data.code === 0) {
      ElMessage.success('登陆成功')
      localStorage.setItem('token', res.data.token!)
      userStore.getUserInfo()
      router.push('/')
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch(e) {
    ElMessage.error('网络错误，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="form">
    <h3>登陆</h3>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" show-password v-model="loginForm.password" />
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button class="btn" type="primary" @click="submit" :loading="loading">登陆</el-button>
        <el-button class="btn link-btn" type="text" @click="emits('toggle')">没有账号，去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang='scss' scoped>
.form {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  width: 350px;
  h3 {
    text-align: center;
    margin-bottom: 20px;
  }
  .btn-wrap {
    flex-direction: column;
  }
  .btn {
    display: block;
    width: 100%;
    margin-left: 0;
  }
  .link-btn {
    margin-top: 10px;
  }
}
</style>