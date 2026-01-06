<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'

const visible = defineModel('visible')
const props = defineProps(['photos'])


</script>

<template>
  <div class="photo-wrap" v-if="visible">
    <div class="close" @click="visible = false">x</div>
    <swiper
      :modules="[Pagination]"
      :pagination="{ type: 'fraction' }"
      class="swiper"
    >
      <swiper-slide class="swiper-slide" v-for="img in photos" :key="img">
        <img :src="img" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang='scss' scoped>
.photo-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #000;
  color: #fff;
  img {
    width: 100%;
  }
}
.swiper {
  width: 100%;
  height: 100%;
  // 想要修改子组件内部的样式时使用样式穿透
  ::v-deep .swiper-pagination {
    top: 20px;
    bottom: auto;
  }
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.close {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  z-index: 10;
}
</style>
