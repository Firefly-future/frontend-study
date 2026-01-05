<script>
import Star from './Star.vue'
export default {
  components: {
    Star
  },
  data () {
    return {
      on: true,
      activeIndex: 0,
      typeList: [
        { text: '全部', type: 0 },
        { text: '满意', type: 1 },
        { text: '不满意', type: 2, gray: true }
      ]
    }
  },
  props: ['ratingList'],
  methods: {
    formatTime (time) {
      return new Date(time).toLocaleString().replace(/\//g, '-')
    }
  },
  computed: {
    filterList () {
      const type = this.typeList[this.activeIndex].type
      let list = this.ratingList
      // 筛选满意度
      if (type > 0) {
        list = list.filter(v => {
          return type === 1 ? v.rateType === 0 : v.rateType === 1
        })
      }
      // 筛选是否有评论内容
      if (!this.on) return list
      return list.filter(v => v.text)
    }
  },
  watch: {
    ratingList: {
      handler() {
        // 监听评论列表改变，计算每种评论的数量
        this.typeList.forEach(item => {
          if (item.type === 1) {
            item.text += this.ratingList.filter(v => v.rateType === 0).length
          } else if (item.type === 2) {
            item.text += this.ratingList.filter(v => v.rateType === 1).length
          } else {
            item.text += this.ratingList.length
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<template>
  <div class="ratings">
    <div class="select">
      <div class="rating-type">
        <span
          v-for="(item, index) in typeList"
          :key="item.type"
          :class="{ active: activeIndex === index, gray: item.gray }"
          @click="activeIndex = index"
        >
          {{ item.text }}
        </span>
      </div>
      <div class="switch" :class="{ on }" @click="on = !on">
        <svg t="1763098966160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1845" width="16" height="16"><path d="M512 10.180608C235.034624 10.180608 10.508288 235.266048 10.508288 512.9216S235.034624 1015.66464 512 1015.66464s501.491712-225.08544 501.491712-502.74304S788.965376 10.180608 512 10.180608z m263.69024 359.264256L442.761216 736.657408a40.96 40.96 0 0 1-59.342848 1.417216l-158.398464-158.79168c-15.976448-16.01536-15.94368-41.951232 0.07168-57.92768 16.01536-15.970304 41.949184-15.94368 57.925632 0.07168l127.981568 128.301056 304.003072-335.306752c15.19616-16.758784 41.099264-18.026496 57.856-2.832384 16.758784 15.194112 18.028544 41.097216 2.832384 57.856z" fill="#2E333A" p-id="1846"></path></svg>
        <span>只看有内容的评价</span>
      </div>
    </div>
    <ul>
      <li v-for="item in filterList" :key="item.rateTime">
        <div class="avatar">
          <img width="28" height="28" :src="item.avatar">
        </div>
        <div class="content">
          <h3 class="name">
            <b>{{ item.username }}</b>
            <span>{{ formatTime(item.rateTime) }}</span>
          </h3>
          <Star v-if="item.score" :num="item.score" :size="10" />
          <p class="text">{{ item.text }}</p>
          <div class="recommend">
            <span v-for="val in item.recommend" :key="val">{{ val }}</span>
          </div> 
        </div> 
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.select {
  padding: 0 16px;
}
.rating-type {
  display: flex;
  padding: 10px 0;
  span {
    font-size: 12px;
    line-height: 16px;
    margin-right: 8px;
    padding: 8px 12px;
    background: rgba(0,160,220,.2);
    color: #666;
    &.active {
      background: #00a0dc;
      color: #fff;
    }
  }
  .gray {
    background: #ccc;
    &.active {
      background: #666;
    }
  }
}
.switch {
  border-top: 1px solid rgba(7,17,27,.1);
  border-bottom: 1px solid rgba(7,17,27,.1);
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
  }
  &.on .icon path {
    fill: #1296db;
  }
}
ul {
  padding: 0 18px;
  li {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
  }
  .content {
    flex: 1;
    margin-left: 14px;
    h3 {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: normal;
      margin-bottom: 8px;
    }
    .text {
      color: #333;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 8px;
    }
  }
  .recommend {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 16px;
    span {
      background: #fff;
      border: 1px solid rgba(7, 17, 27, .1);
      border-radius: 1px;
      color: #999;
      padding: 0 6px;
      font-size: 10px;
      margin: 0 8px 4px 0;
    }
  }
}
</style>
