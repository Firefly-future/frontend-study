<script>
import Child1 from './components/Child1.vue'
import Child2 from './components/Child2.vue'
import Child3 from './components/Child3.vue'
import Child4 from './components/Child4.vue'

export default {
  components: {
    Child1,
    Child2,
    Child3,
    Child4
  },
  data () {
    return {
      activeIndex: 0,
      navList: [
        { title: '推荐音乐', componentName: 'Child1' },
        { title: '热歌榜', componentName: 'Child2' },
        { title: '搜索', componentName: 'Child3' },
        { title: '歌手', componentName: 'Child4' }
      ]
    }
  },
  methods: {
  }
}
</script>

<template>
  <div class="app">
    <nav>
      <span
        v-for="(item, index) in navList"
        :key="item.title"
        @click="activeIndex = index"
        :class="{ active: activeIndex === index }"
      >
        {{ item.title }}
      </span>
    </nav>
    <!-- {{ navList[activeIndex] }} -->

    <!-- include\exclude\max -->
    <KeepAlive>
      <Child1 v-if="activeIndex === 0" />
      <Child2 v-else-if="activeIndex === 1" />
      <Child3 v-else-if="activeIndex === 2" />
      <Child4 v-else-if="activeIndex === 3" />
    </KeepAlive>
    
    <!-- KeepAlive: 切换组件时缓存实例，组件不再执行销毁 -->
    <!-- component: 动态组件，is="组件名" -->
    <!-- <KeepAlive :include="['Child2', 'Child3']">
      <component :is="navList[activeIndex].componentName"></component>
    </KeepAlive> -->
  </div>
</template>

<style lang='scss' scoped>
nav {
  display: flex;
  border-bottom: 1px solid #ccc;
  span {
    flex: 1;
    text-align: center;
    line-height: 40px;
    &.active {
      background: tomato;
    }
  }
}
</style>
