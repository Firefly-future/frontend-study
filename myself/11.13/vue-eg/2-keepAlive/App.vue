<script>
import Advice from './components/Advice.vue';
import Hot from './components/Hot.vue';
import Search from './components/Search.vue';
import Singer from './components/Singer.vue';
export default {
  components: {
    Advice,
    Hot,
    Search,
    Singer
  },
  data() {
    return {
      list: [
        {
          title: '推荐音乐',
          componentName: 'Advice'
        },
        {
          title: '热歌榜',
          componentName: 'Hot'
        },
        {
          title: '搜索',
          componentName: 'Search'
        },
        {
          title: '歌手',
          componentName: 'Singer'
        }
      ],
      activeIndex: 0
    }
  },
  // 数据直接传给所有后代组件，后代组件再通过inject接收此数据
  provide() {
    return {
    }
  },
  methods: {
  }
}
</script>

<template>
  <div class="app">
    <nav>
      <p v-for="(item, index) in list" :key="item.title" @click="activeIndex = index"
        :class="{ active: activeIndex === index }">{{ item.title }}</p>
    </nav>
    <!-- <Advice v-if="activeIndex===0"></Advice>
    <Hot v-else-if="activeIndex===1"></Hot>
    <Search v-else-if="activeIndex===2"></Search>
    <Singer v-else-if="activeIndex===3"></Singer> -->

    <!-- include exclude max -->
    <!--  包含     除了   最大 -->


    <!-- <KeepAlive :max=3>
      <component :is="list[activeIndex].componentName"></component>
    </KeepAlive> -->
    <KeepAlive :include="['Advice','Search']">
      <component :is="list[activeIndex].componentName"></component>
    </KeepAlive>
  </div>
</template>

<style scoped>
.app {
  border: 1px solid red;
}

nav {
  display: flex;
  border-bottom: 1px dashed #ccc;

  p {
    padding: 10px 0;
    flex: 1;
    text-align: center;
  }
}

.active {
  background-color: tomato;
}
</style>
