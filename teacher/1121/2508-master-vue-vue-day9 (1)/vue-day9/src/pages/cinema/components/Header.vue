<script setup>
import { reactive, ref, watch } from 'vue'
import Select from '@/components/Select.vue'

const props = defineProps(['cityOptions'])
const emits = defineEmits(['search', 'filterArea'])

const form = reactive({
  area: 'all',
  ticketType: 1,
  distance: 0
})

// 通知父组件购票类型改变
watch(() => form.ticketType, () => {
  console.log('form.ticketType改变了', form.ticketType)
  emits('search', form.ticketType)
})

// 通知父组件区域改变
watch(() => form.area, () => {
  console.log('form.area 改变了', form.area, props.cityOptions)
  emits('filterArea', form.area)
})

</script>

<template>
  <div class="header">
    <div class="title-bar">
      <span>城市</span>
      <h3>影院</h3>
      <span>搜索</span>
    </div>
    <div class="filter">
      <Select
        class="filter-item"
        v-model="form.area"
        list-type="tag"
        :options="cityOptions"
      />
      <Select
        class="filter-item"
        v-model="form.ticketType"
        :options="[
          { label: 'APP订票', value: 1 },
          { label: '前台兑换', value: 2 },
        ]"
      />
      <Select
        class="filter-item"
        v-model="form.distance"
        :options="[
          { label: '最近去过', value: 0 },
          { label: '离我最近', value: 1 },
        ]"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.header {
  height: 100px;
  border-bottom: 1px solid #ddd;
  position: relative;
  z-index: 10;
  background: #fff;
}
.title-bar {
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  text-align: center;
  h3 {
    flex: 1;
  }
  span {
    width: 60px;
  }
}
.filter {
  display: flex;
  line-height: 50px;
  .filter-item {
    flex: 1;
  }
}
</style>
