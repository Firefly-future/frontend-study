<script setup lang="ts">

</script>
<template>
  <div class="login">
    <div class="login-form">
      <div>
        <input type="text" placeholder="请输入用户名">
      </div>
      <div>
        <input type="password" placeholder="请输入密码">
      </div>
      <button>登录</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #5395E5;
  overflow: auto;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  input{
    outline: none;
    width: 260px;
    margin: 10px;
    height: 40px;
  }
  button{
    width: 260px;
    margin: 10px;
    height: 40px;
    background-color: #409EFE;
    color: #fff;
  }
}
</style>
