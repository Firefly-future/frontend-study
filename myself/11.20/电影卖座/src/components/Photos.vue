<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
const props = defineProps(["photos"]);
const visible = defineModel("visible");
</script>
<template>
  <div class="photo-wrap" v-if="visible">
    <div class="close" @click="visible = false">X</div>
    <swiper
      :modules="[Pagination]"
      :pagination="{
        type: 'fraction',
      }"
      class="swiper"
    >
      <swiper-slide class="swiper-slide" v-for="item in photos">
        <div class="img-container">
          <img :src="item" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.photo-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 20;
  .img-container {
    max-width: 100%;
    max-height: 100%;
    padding: 40px 0;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      max-height: calc(100vh - 40px);
    }
  }
  .close {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    z-index: 21;
    color: #fff;
  }
  .swiper {
    width: 100%;
    height: 100%;
    ::v-deep .swiper-pagination {
      top: 20px;
      bottom: auto;
      color: #fff;
    }

    // ::v-deep .swiper-pagination {
    //   top: 20px;
    //   bottom: auto;
    // }
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
