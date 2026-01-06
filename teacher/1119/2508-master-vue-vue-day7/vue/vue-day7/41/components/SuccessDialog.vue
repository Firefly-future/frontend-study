<script setup>
const props = defineProps(['score'])
const emits = defineEmits(['close'])

</script>

<template>
  <div class="dialog">
    <div class="dialog-center">
      <div class="score">考试分数：{{ score }}</div>
      <button @click="emits('close')">确定</button>
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
.dialog-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 15px;
  border: 10px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    width: 100px;
    height: 35px;
  }
}
.score {
  text-align: center;
  line-height: 100px;
  margin-bottom: 20px;
}
</style>
