<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ArrowDown, Setting, SwitchButton } from '@element-plus/icons-vue'

const route = useRoute()

</script>

<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" router :default-active="route.path">
        <el-menu-item class="logo">
          <img
            style="width: 100px"
            src="https://element-plus.org/images/element-plus-logo.svg"
            alt="Element logo"
          />
        </el-menu-item>
        <el-menu-item index="/">监控数据</el-menu-item>
        <el-menu-item index="/list">用户列表</el-menu-item>
        <el-menu-item index="/userInfo">个人中心</el-menu-item>
      </el-menu>
      <el-space class="user">
        <el-avatar shape="square" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
        <el-dropdown>
          <span class="el-dropdown-link">
            用户名
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Setting">个人中心</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<style lang='scss' scoped>
.el-container {
  height: 100vh;
  .el-header {
    background: #6284e0;
    display: flex;
    justify-content: space-between;
  }
}
.el-menu {
  background: #6284e0;
  border-bottom: none !important;
  flex: 1;
  .el-menu-item {
    color: #fff !important;
    &:hover, &.is-active {
      background: rgba($color: #144b85, $alpha: .4) !important;
      color: #fff !important;
    }
  }
  .logo:hover {
    background: none !important;
  }
}
.user {
  padding: 10px 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
