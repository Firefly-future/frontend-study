<script>
export default {
  props: ['modelValue', 'label']
}
</script>

<template>
  <div class="row">
    <span>{{ label }}：</span>
    <input
      type="text"
      :value="modelValue"
      @input="e => $emit('update:modelValue', e.target.value)"
    >
  </div>
</template>

<style lang='scss' scoped>

</style>
