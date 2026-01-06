<script>
import event from '../EventBus'

export default {
  data() {
    return {
      title: '我是组件4'
    }
  },
  created() {
    console.log(event)
    // 往 eventBus 中存事件
    event.on('changeTitle', text => {
      this.title = text
    })
  }
}
</script>

<template>
  <div class="test">
    <h2>组件4</h2>
    <h3>{{ title }}</h3>
  </div>
</template>

<style lang='scss' scoped>
.test {
  border: 3px solid red;
  padding: 20px;
}
</style>
