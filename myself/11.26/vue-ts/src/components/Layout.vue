<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ArrowDown, Setting, SwitchButton } from "@element-plus/icons-vue"
import { useUserStore } from "../store/user"
import { storeToRefs } from "pinia"
import { ElMessage } from "element-plus"

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 从store中解析出响应式变量
const { userInfo, avatar } = storeToRefs(userStore)
// enum CommandType {
// 	ACCOUNT = "account",
// 	ATTENTION = "attention",
// 	USERINFO = "userinfo",
// 	LOGOUT = "logout"
// }

const CommandType = {
	ACCOUNT: "account",
	ATTENTION: "attention",
	USERINFO: "userinfo",
	LOGOUT: "logout"
} as const

type CommandValues = typeof CommandType[keyof typeof CommandType]
const Actions = {
	[CommandType.ACCOUNT]() {
		ElMessage.success("点击了aaaa")
	},
	[CommandType.ATTENTION]() {
		ElMessage.success("点击了bbb")
	},
	[CommandType.USERINFO]() {
		router.push("/user")
	},
	[CommandType.LOGOUT]() {
		localStorage.removeItem("token")
		router.push("/login")
		ElMessage.success("退出成功")
	}
}

const clickItem = (command: CommandValues) => {
	Actions[command] && Actions[command]()
}
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<el-menu
					class="el-menu-demo"
					router
					mode="horizontal"
					:ellipsis="false"
					:default-active="route.path"
				>
					<el-menu-item class="logo">
						<img
							style="width: 100px"
							src="https://element-plus.org/images/element-plus-logo.svg"
							alt="Element logo"
						/>
					</el-menu-item>
					<el-menu-item index="/">数据监控</el-menu-item>
					<el-menu-item index="/list">用户列表</el-menu-item>
					<el-menu-item index="/user">个人中心</el-menu-item>
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
								<!-- <el-dropdown-item :command="CommandType.ACCOUNT" :icon="Setting"
									>aaaa
								</el-dropdown-item>
								<el-dropdown-item :command="CommandType.ATTENTION" :icon="Setting"
									>bbb
								</el-dropdown-item> -->
								<el-dropdown-item :command="CommandType.USERINFO" :icon="Setting"
									>个人中心
								</el-dropdown-item>
								<el-dropdown-item :command="CommandType.LOGOUT" :icon="SwitchButton"
									>退出登录
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-space>
			</el-header>
			<el-main>
				<slot></slot>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
.el-container {
	height: 100vh;

	.el-header {
		display: flex;
		background-color: #6284e0;
		justify-content: space-between;
		align-items: center;
	}

	.el-menu {
		background-color: #6284e0;
		border-bottom: none !important;
		flex: 1;

		.el-menu-item {
			color: #fff !important;

			&:hover,
			&.is-active {
				background: rgba($color: #144b85, $alpha: 0.4);
				color: #fff !important;
			}
		}
	}

	.logo:hover {
		user-select: none !important;
		background: none !important;
		cursor: auto;
	}

	.user {
		display: flex;
		align-items: center;
		margin-right: 10px;

		.el-dropdown-link {
			cursor: pointer;
			color: #fff;
			display: flex;
			align-items: center;
		}
	}

	.el-main {
		flex: 1;
	}
}
</style>
