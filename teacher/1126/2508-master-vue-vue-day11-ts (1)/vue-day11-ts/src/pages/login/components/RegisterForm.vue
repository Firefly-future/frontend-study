<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { registerApi } from '../../../services'
import { ElMessage } from 'element-plus'

interface RegisterForm {
  username: string
  password: string
  confirm: string
}
const emits = defineEmits(['toggle'])

const loading = ref(false)
// 获取组件实例
const registerFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  confirm: ''
})

const registerRules = reactive<FormRules<RegisterForm>>({
  username: [
    { required: true, message: '请输入用户名！', trigger: 'change' },
    { min: 2, max: 5, message: '用户名长度在 2 - 5 位', trigger: 'change' },
  ],
  password: [{
    // 自定义校验，校验 password 时会执行 passValid 函数
    validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空！'))
      } else {
        // 如果 password 和 confirm 两个字段都有值就触发 confirm 的校验
        if (registerForm.confirm !== '') {
          if (!registerFormRef.value) return
          registerFormRef.value.validateField('confirm')
        }
        callback()
      }
    },
    trigger: 'change'
  }],
  confirm: [{
    validator: (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次确认密码！'))
      } else if (value !== registerForm.password) {
        callback(new Error("两次密码不一致！"))
      } else {
        callback()
      }
    },
    trigger: 'change'
  }]
})
const submit = async () => {
  // 调用 form 组件内部的方法
  await registerFormRef.value?.validate()
  try {
    loading.value = true
    const res = await registerApi(registerForm)
    if (res.data.code === 0) {
      ElMessage.success('注册成功，去登陆！')
      emits('toggle')
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
    <h3>注册</h3>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="registerRules"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="registerForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" show-password v-model="registerForm.password" />
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input placeholder="确认密码" show-password v-model="registerForm.confirm" />
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button class="btn" type="primary" @click="submit" :loading="loading">注册</el-button>
        <el-button class="btn link-btn" type="text" @click="emits('toggle')">已有账号，去登陆</el-button>
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