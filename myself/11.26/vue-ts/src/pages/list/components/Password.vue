<script setup lang="ts">
import { ref } from "vue"
import { View } from "@element-plus/icons-vue"
interface Props {
	password: string
	abc: number
}
const props = defineProps<Props>()

const showPass = ref(false)
</script>
<template>
	<el-space>
		<span style="width: 100px">
			{{ showPass ? password : "******" }}
		</span>
		<el-icon @click="showPass = !showPass">
			<View />
		</el-icon>
	</el-space>
</template>

<style scoped lang="scss"></style>
