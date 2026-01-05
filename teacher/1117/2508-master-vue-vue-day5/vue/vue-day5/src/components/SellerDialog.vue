<script>
export default {
  props: ['info']
}
</script>

<template>
  <div class="dialog">
    <div class="close" @click="$emit('close')">x</div>
    {{ info }}
  </div>
</template>

<style lang='scss' scoped>
.dialog {
  backdrop-filter: blur(10px);
  background: rgba(7, 17, 27, .8);
  color: #fff;
  height: 100%;
  left: 0;
  opacity: 1;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
.close {
  font-size: 20px;
}
</style>
