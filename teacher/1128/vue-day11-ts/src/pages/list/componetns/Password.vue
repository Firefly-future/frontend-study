<script lang="ts" setup>
import { ref } from 'vue'
import { View } from '@element-plus/icons-vue'

// 定义 props 类型
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
      {{ showPass ? password : '******' }}
    </span>
    <el-icon @click="showPass = !showPass">
      <View />
    </el-icon>
  </el-space>
</template>

<style lang='scss' scoped>

</style>
