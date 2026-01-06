<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps([
  'listType', // options 样式
  'options' // options 数据 [{ label: 'xxx', value: 'xxx' }]
])
// 接收 v-model 的数据
const selectVal = defineModel()
// 显示 options 列表
const showOptions = ref(false)
// 根据选中的 value 查找对应的 label
const curLabel = computed(() => {
  return props.options.find(v => v.value === selectVal.value)?.label
})
// 选择数据
const changeValue = (value) => {
  selectVal.value = value
  showOptions.value = false
}

// 点击页面其他地方关闭 options 列表
const closeOptions = e => {
  if (Date.now() - startTime.value > 100) {
    showOptions.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', closeOptions)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeOptions)
})
const startTime = ref(0)
const selectClick = e => {
  startTime.value = Date.now()
}
</script>

<template>
  <div class="select-wrap" @click="selectClick">
    <div
      :class="['value', { active: showOptions }]"
      @click="showOptions = true"
    >
      {{ curLabel }}
    </div>

    <template v-if="showOptions">
      <ul :class="['options', listType === 'tag' ? 'tag' : 'list']">
        <li
          v-for="item in options"
          :key="item.value"
          :class="{ active: selectVal === item.value }"
          @click="changeValue(item.value)"
          >
            {{ item.label }}
          </li>
      </ul>
      <div class="select-bg" @click="showOptions = false"></div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.select-wrap {
  position: relative;
}
.select-bg {
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: .5);
  z-index: 1;
}
.value {
  line-height: 45px;
  font-size: 14px;
  text-align: center;
  &.active {
    color: tomato;
  }
}
.options {
  position: fixed;
  left: 0;
  top: 100px;
  width: 100vw;
  background: #fff;
  z-index: 10;
}
.tag {
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-top: 10px;
  li {
    border: 1px solid #ddd;
    padding: 3px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 30px;
    &.active {
      color: tomato;
      border-color: tomato;
    }
  }
}
.list {
  li {
    font-size: 14px;
    line-height: 45px;
    border-bottom: 1px solid #ddd;
    padding-left: 15px;
    &.active {
      color: tomato;
    }
  }
}
</style>
