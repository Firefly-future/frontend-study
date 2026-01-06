<script>
import Ratings from './Ratings.vue'
export default {
  props: ['info'],
  components: {
    Ratings
  }
}
</script>

<template>
  <div class="detail">
    <div class="back" @click="$emit('back')">
      <svg t="1763362991006" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5550" width="20" height="20"><path d="M710.153924 8.980397L266.007127 460.692524a81.118646 81.118646 0 0 0 0.861532 114.476097l446.192936 441.050666a26.922883 26.922883 0 0 0 37.853573-38.284339L304.722232 536.884282a27.27288 27.27288 0 0 1-0.323074-38.445877L748.545955 46.726278A26.922883 26.922883 0 1 0 710.180847 9.00732z" fill="#ffffff" p-id="5551"></path></svg>
    </div>
    <img :src="info.image" alt="">
    <h3>{{ info.name }}</h3>
    <p>¥{{ info.price }}</p>
    <div class="btns">
      <template v-if="info.count">
        <button @click="$emit('changeCount', info.name, -1)">-</button>
        {{ info.count }}
      </template>
      <button @click="$emit('changeCount', info.name, 1)">+</button>
    </div>
    <div class="line"></div>
    <Ratings :ratingList="info.ratings" />
  </div>
</template>

<style lang='scss' scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  img {
    width: 100%;
  }
  button {
    width: 20px;
  }
}
.back {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, .1);
  border-top: 1px solid rgba(7, 17, 27, .1);
  height: 16px;
  width: 100%;
}
</style>
