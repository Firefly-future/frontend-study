<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface LoginForm {
  username: string
  password: string
}

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
</script>

<template>
  <div class="form">
    <h3>登陆表单</h3>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button :style="{ width: '100%' }" type="primary">登陆</el-button>
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
}
</style>