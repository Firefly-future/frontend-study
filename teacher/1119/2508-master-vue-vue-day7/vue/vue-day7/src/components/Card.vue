<script setup>
import { ref, computed, onUnmounted, onBeforeUnmount } from 'vue'
import { format } from '../utils'

const props = defineProps(['list', 'isDone'])
const emits = defineEmits(['clickBtn', 'submit'])

const time = ref(6000)

const id = setInterval(() => {
  time.value -= 1000
  if (time.value <= 0) {
    time.value = 0
    clearInterval(id)
    emits('submit')
  }
}, 1000)

onBeforeUnmount(() => {
  clearInterval(id)
})

</script>

<template>
  <div class="card">
    <div class="card-header">
      <p>答题卡</p>
      <p>{{ format(time) }}</p>
    </div>
    <div class="card-center">
      <button
        v-for="(v, i) in list"
        :key="v.question"
        :class="{
          active: v.myAnswer,
          red: v.result !== v.myAnswer
        }"
        @click="emits('clickBtn', i)"
      >{{ i + 1 }}</button>
    </div>
    <div class="card-footer">
      <button :disabled="isDone" @click="emits('submit')">{{isDone ? '已交卷' : '提交'}}</button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.card {
  width: 300px;
  min-height: 300px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
}
.card-header {
  height: 40px;
  display: flex;
  p {
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
}
.card-footer {
  padding: 10px 15px;
  button {
    width: 100%;
    height: 35px;
  }
}
.card-center {
  flex: 1;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 16px;
  button {
    width: 30px;
    height: 30px;
    margin: 4px;
    &.active {
      background: rgb(100, 206, 249);
    }
    &.red {
      background: tomato;
      color: #fff;
    }
  }
}
</style>
