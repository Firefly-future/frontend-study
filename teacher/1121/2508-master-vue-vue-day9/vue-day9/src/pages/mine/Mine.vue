<script setup>
import { useRoute } from 'vue-router'
import { onBeforeRouteLeave, onBeforeRouteUpdate, RouterLink } from 'vue-router'

const route = useRoute()

// 在导航离开渲染该组件的对应路由时调用
onBeforeRouteLeave((to, from) => {
  // 取消导航并停留在同一页面上
  if (!window.confirm('你确定要离开吗？')) {
    return false
  }
})

// 在当前路由改变，但是该组件被复用时调用
// 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
// 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
// onBeforeRouteUpdate(async (to, from) => {
//   // console.log('%c onBeforeRouteUpdate', 'font-size: 20px;color:red');
//   // console.log(route.query)
// })


</script>

<template>
  <RouterLink to="/home/mine?a=abcdefg">参数1</RouterLink>
  <RouterLink to="/home/mine?a=1234567">参数2</RouterLink>
  <h2>我的页面</h2>
</template>

<style lang='scss' scoped>

</style>
