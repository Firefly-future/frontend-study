<script>
import Star from './Star.vue'
import Ratings from './Ratings.vue'
import { getRatings } from '../services'
export default {
  components: {
    Star,
    Ratings
  },
  props: ['sellerInfo'],
  data () {
    return {
      ratingList: []
    }
  },
  methods: {
    async getRatingsData () {
      try {
        const res = await getRatings()
        console.log(res.data.data)
        this.ratingList = res.data.data
      } catch(e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getRatingsData()
  }
}
</script>

<template>
  <div class="comments">
    <div class="score-wrap">
      <div class="left">
        <h3>{{ sellerInfo.score }}</h3>
        <p>综合评分</p>
        <p>高于周边商家{{ sellerInfo.rankRate }}%</p>
      </div>
      <div class="right">
        <div class="row">
          <div class="label">服务态度</div>
          <Star :num="sellerInfo.serviceScore" />
        </div>
        <div class="row">
          <div class="label">商品评分</div>
          <Star :num="sellerInfo.foodScore" />
        </div>
        <div class="row">
          <div class="label">送达时间</div>
          {{ sellerInfo.deliveryTime }} 分钟
        </div>
      </div>
    </div>
    <div class="line"></div>
    <Ratings :ratingList="ratingList" />
  </div>
</template>

<style lang='scss' scoped>
.line {
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, .1);
  border-top: 1px solid rgba(7, 17, 27, .1);
  height: 16px;
  width: 100%;
}
.score-wrap {
  padding: 18px 0;
  display: flex;
}
.left {
  border-right: 1px solid #d9dde1;
  padding: 6px 0;
  text-align: center;
  width: 137px;
  text-align: center;
  p {
    font-size: 12px;
  }
}
.right {
  flex: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .row {
    display: flex;
    font-size: 12px;
    margin: 5px 0;
    .label {
      margin-right: 10px;
    }
  }
}
</style>
