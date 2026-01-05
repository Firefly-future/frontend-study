<script>
export default {
  data() {
    return {
      list: [1,2,3,4,5,6,7]
    }
  }
}
</script>

<template>
  <div class="dialog" @click.self="$emit('close')">
    <div class="content">
      <div class="dialog-header">
        <slot name="header">
          <h3>我是默认标题</h3>
        </slot>
      </div>
      <div class="dialog-center">
        <slot name="default" :list="list" a="1000" :b="true"></slot>
      </div>

      <div class="dialog-footer"  v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
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
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 400px;
  min-height: 400px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.dialog-center {
  flex: 1;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.dialog-header {
  height: 50px;
}
.dialog-footer {
  height: 50px;
}
</style>
