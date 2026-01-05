<script setup lang="ts">
import { ref } from 'vue'
import Layout from '../../components/Layout/Layout.vue'
import { getUsersApi, getUserInfoApi } from '../../services'
import type { UserInfo } from '../../services/type'

const userList = ref<UserInfo[]>([])

getUsersApi({
  page: 1,
  pagesize: 10
})
  .then(res => {
    console.log(res.data.values.list)
    userList.value = res.data.values.list

  })

</script>

<template>
  <Layout>
    <ul>
      <li v-for="item in userList" :key="item.id">
        <p>{{ item.age }}</p>
        <p>{{ item.username }}</p>
        <p>{{ item.password }}</p>
      </li>
    </ul>
  </Layout>
</template>

<style lang='scss' scoped>

</style>
