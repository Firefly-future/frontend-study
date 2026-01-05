<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { registerApi } from "../../../services"
// import { useRouter } from "vue-router"

const emits = defineEmits(["toggle"])
// const router = useRouter()
const loading = ref(false)

interface registerForm {
  username: string
  password: string
  confirm: string
}

const registerFormRef = ref<FormInstance>()
const registerForm = reactive<registerForm>({
  username: "",
  password: "",
  confirm: ""
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空"))
  } else {
    if (registerForm.confirm !== "") {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField("confirm")
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"))
  } else if (value !== registerForm.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}
const registerRules = reactive<FormRules<registerForm>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { min: 3, max: 5, message: "用户名长度为3-5", trigger: "change" }
  ],
  password: [
    { validator: validatePass, trigger: "change" }
    // { required: true, message: "请输入密码", trigger: "change" }
    // { min: 6, max: 12, message: "密码长度为6-12", trigger: "change" }
  ],
  confirm: [
    { validator: validatePass2, trigger: "change" }
    // { required: true, message: "请再次输入密码", trigger: "change" }
    // { min: 6, max: 12, message: "密码长度为6-12", trigger: "change" }
  ]
})

const submit = async () => {
  //validate
  // 对整个表单的内容进行验证，接收一个回调函数或者返回Promise
  await registerFormRef.value?.validate()
  try {
    loading.value = true
    const res = await registerApi(registerForm)
    console.log(res.data)
    if (res.data.code === 0) {
      ElMessage.success("注册成功,去登录吧")
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
    <h3>注册</h3>
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="registerForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="密码"
          show-password
          v-model="registerForm.password"
          type="password"
        />
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input
          placeholder="确认密码"
          show-password
          v-model="registerForm.confirm"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submit">注册</el-button>
        <el-button class="btn" type="text" @click="emits('toggle')"
          >已有账号？去登录
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
