<script setup lang="ts">
import Login from './components/Login/Login.vue'
import Group from './components/group/group.vue'
import Loop from './components/Loop/Loop.vue'
import Coming from './components/come/Coming.vue'
import Control from './components/control/Control.vue'
import Mine from './components/Mine/Mine.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>


  <div>
    <Login />
    <Group />
    <Loop />
    <Coming />
    <Control />
    <Mine />
  </div>
</template>

<style scoped lang="scss">

</style>
