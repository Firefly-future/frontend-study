<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, Setting, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 从 store 中解构出响应式变量
const { userInfo, avatar } = storeToRefs(userStore)

// enum CommandType {
//   ACCOUNT = 'account',
//   ATTENTION = 'attention',
//   USERINFO = 'userinfo',
//   LOGOUT = 'logout'
// }
const CommandType = {
  ACCOUNT: 'account',
  ATTENTION: 'attention',
  USERINFO: 'userinfo',
  LOGOUT: 'logout'
} as const
// 获取对象 value 组成的联合类型
type CommandValues = typeof CommandType[keyof typeof CommandType]

const Actions = {
  [CommandType.ACCOUNT]() {
    ElMessage.success('点击了aaaa')
  },
  [CommandType.ATTENTION]() {
    ElMessage.success('点击了bbbb')
  },
  [CommandType.USERINFO]() {
    router.push('/userInfo')
  },
  [CommandType.LOGOUT]() {
    localStorage.removeItem('token')
    router.push('/login')
    ElMessage.success('退出成功！')
  }
}

const clickItem = (command: CommandValues) => {
  Actions[command] && Actions[command]()
}
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
        <el-avatar shape="square" :src="avatar" />
        <el-dropdown @command="clickItem">
          <span class="el-dropdown-link">
            {{ userInfo?.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="CommandType.ACCOUNT" :icon="Setting">账号设置</el-dropdown-item>
              <el-dropdown-item :command="CommandType.ATTENTION" :icon="Setting">关注</el-dropdown-item>
              <el-dropdown-item :command="CommandType.USERINFO" :icon="Setting">个人中心</el-dropdown-item>
              <el-dropdown-item :command="CommandType.LOGOUT" :icon="SwitchButton">退出登陆</el-dropdown-item>
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
