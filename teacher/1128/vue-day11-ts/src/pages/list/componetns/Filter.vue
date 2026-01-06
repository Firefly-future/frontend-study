<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { FilterSearch } from '../../../services/type'
interface Emits {
  search: [value: FilterSearch]
}
const emits = defineEmits<Emits>()

const ruleFormRef = ref<FormInstance>()
const searchForm = reactive<FilterSearch>({
  username: undefined,
  age: undefined,
  sex: undefined,
  email: undefined
})


// 创建过滤函数，类型安全
function filterEmptyValues<T extends object>(obj: T): Partial<T> {
    const result: Partial<T> = {};

    (Object.keys(obj) as Array<keyof T>).forEach(key => {
        const val = obj[key];
        // 更严格的过滤条件
        if (val !== undefined && val !== '' && val !== null) {
            result[key] = val;
        }
    });
    
    return result;
}


type FormKeys = keyof typeof searchForm

const search = () => {
  // 过滤非空的数据
  const form = filterEmptyValues(searchForm)
  emits('search', form)
}
const reset = () => {
  (Object.keys(searchForm) as FormKeys[]).forEach(key => {
    searchForm[key] = undefined
  })
  emits('search', {})
}
</script>

<template>
  <el-form ref="ruleFormRef" :inline="true" label-width="100">
    <el-form-item label="用户名">
      <el-input v-model="searchForm.username" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input  v-model="searchForm.age" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select placeholder="选择性别"  v-model="searchForm.sex">
        <el-option label="男" :value="1" />
        <el-option label="女" :value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input  v-model="searchForm.email" />
    </el-form-item>
    <el-form-item>
      <el-space style="padding-left: 100px;">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-space>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-select, .el-input {
  width: 200px;
}
</style>