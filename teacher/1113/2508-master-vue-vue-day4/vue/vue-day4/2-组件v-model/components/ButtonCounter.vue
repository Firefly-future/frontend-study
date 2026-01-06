<script>
export default {
  props: ['modelValue', 'title']
}
</script>

<template>
  <div class="box">
    <h3>{{ title }}</h3>
    <button @click="$emit('update:title', Math.random())">修改标题</button>
    <hr />
    <button @click="$emit('update:model-value', modelValue - 1)">-</button>
    {{ modelValue }}
    <button @click="$emit('update:model-value', modelValue + 1)">+</button>
  </div>
</template>

<style lang='scss' scoped>

</style>
