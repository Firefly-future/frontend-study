<script>
import Star from './Star.vue'
export default {
  components: {
    Star
  },
  props: ['ratingList'],
  methods: {
    formatTime (time) {
      return new Date(time).toLocaleString().replace(/\//g, '-')
    }
  }
}
</script>

<template>
  <div class="ratings">
    <ul>
      <li v-for="item in ratingList" :key="item.rateTime">
        <div class="avatar">
          <img width="28" height="28" :src="item.avatar">
        </div>
        <div class="content">
          <h3 class="name">
            <b>{{ item.username }}</b>
            <span>{{ formatTime(item.rateTime) }}</span>
          </h3>
          <Star :num="item.score" :size="10" />
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
