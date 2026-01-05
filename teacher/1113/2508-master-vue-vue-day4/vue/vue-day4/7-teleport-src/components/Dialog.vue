<script>
export default {
  props: ['visible']
}
</script>

<template>
  <div class="dialog" v-if="visible">
    <div class="content">
      <div class="close" @click="$emit('update:visible', false)">X</div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  background: #fff;
  width: 400px;
  height: 400px;
}
.close {
  cursor: pointer;
}
</style>
