<script>
import ButtonCounter from './components/ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  },
  data () {
    return {
      title: '标题',
      num: 10
    }
  }
}
</script>

<template>
  <div class="app">
    <h2>num: {{ num }}</h2>
    <ButtonCounter
      v-model:title="title"
      v-model="num"
    />
    <!-- <ButtonCounter
     :title="title"
      @update:title="v => title = v"
      :model-value="num"
      @update:model-value="v => num = v"
    /> -->
  </div>
</template>

<style lang='scss' scoped>

</style>
