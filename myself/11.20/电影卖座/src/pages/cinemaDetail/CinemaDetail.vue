<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getCinemaDetail, getCinemaFilm, getCinemaFilmTime } from "@/services";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { formatDate, formatMinSec } from "@/utils/util";

console.log(formatDate(1763740800 * 1000));
const route = useRoute();
const router = useRouter();
const info = ref([]); //影院
const films = ref([]); //影院电影
const show = ref(false); //展示成人票儿童详情
const activeIndex = ref(0); //当前电影下标
const dateIndex = ref(0); //选择的日期下标
const schedules = ref([]); //电影场次

// 当前电影
const currentFilm = computed(() => {
  return films.value[activeIndex.value] || {};
});
let swiperIns = null;
// 初始化轮播图
const onSwiper = (swiper) => {
  swiperIns = swiper;
};
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex;
  dateIndex.value = 0;
};

console.log("获取动态路由参数", route.params);
// 前往详情页
const goDetail = (filmId) => {
  console.log("即将跳转");
  router.push({
    name: "filmDetail",
    params: {
      filmId,
    },
  });
};

// 获取电影和日期下标
const getInitIndex = () => {
  if (films.value.length === 0) return;
  const filmIndex = films.value.findIndex(
    (v) => v.filmId === Number(route.params.filmId)
  );
  if (filmIndex > -1) {
    activeIndex.value = filmIndex;
    swiperIns?.slideTo(activeIndex.value);
  }
  const dateId = currentFilm.value.showDate.indexOf(Number(route.params.date));
  if (dateId > -1) {
    dateIndex.value = dateId;
  }
  getCinemaFilmTimeData();
};
// 获取影院详情
const getCinemaDetailData = async () => {
  try {
    const res = await getCinemaDetail(route.params.cinemaId);
    console.log(res.data.data.cinema);
    info.value = res.data.data.cinema;
  } catch (e) {
    console.log(e);
  }
};
// 获取影院电影
const getCinemaFilmData = async () => {
  try {
    const res = await getCinemaFilm(route.params.cinemaId);
    console.log(res.data.data.films);
    films.value = res.data.data.films;
    getInitIndex();
  } catch (e) {
    console.log(e);
  }
};
// 获取影院电影播放时间
const getCinemaFilmTimeData = async () => {
  try {
    const res = await getCinemaFilmTime({
      cinemaId: route.params.cinemaId,
      filmId: currentFilm.value.filmId,
      date: currentFilm.value.showDate[dateIndex.value],
    });
    console.log(res.data.data.schedules);
    schedules.value = res.data.data.schedules;
  } catch (e) {
    console.log(e);
  }
};
getCinemaDetailData();
getCinemaFilmData();

watch([currentFilm, dateIndex], () => {
  getCinemaFilmTimeData();
  router.replace({
    params: {
      filmId: currentFilm.value.filmId,
      date: currentFilm.value.showDate[dateIndex.value],
    },
  });
});
</script>
<template>
  <div class="cinema-detail">
    <div class="back" @click="$router.back()">
      <svg
        t="1763791829166"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5057"
        width="32"
        height="32"
      >
        <path
          d="M316.3 512l289.2 289.2c16.7 16.7 16.7 43.7 0 60.3-16.7 16.7-43.7 16.7-60.3 0L225.8 542.2c-16.7-16.7-16.7-43.7 0-60.3l319.4-319.4c16.7-16.7 43.7-16.7 60.3 0 16.7 16.7 16.7 43.7 0 60.3L316.3 512z"
          fill="#484850"
          p-id="5058"
        ></path>
      </svg>
    </div>
    <h3>{{ info.name }}</h3>
    <div class="tags" @click="show = true">
      <span>{{ info.services?.[0].name }}</span>
      <span>{{ info.services?.[1].name }}</span>
      <i
        ><svg
          t="1763792305364"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5071"
          width="10"
          height="10"
        >
          <path
            d="M724.529245 490.752075L342.766527 108.889366c-11.698858-11.698858-30.697002-11.698858-42.39586 0s-11.698858 30.697002 0 42.39586l381.762718 381.862709c11.698858 11.698858 30.697002 11.698858 42.39586 0 11.798848-11.698858 11.798848-30.697002 0-42.39586z"
            fill="#FF6600"
            p-id="5072"
          ></path>
          <path
            d="M724.629235 489.852163c-11.698858-11.698858-30.697002-11.698858-42.395859 0l-381.962699 381.962699c-11.698858 11.698858-11.698858 30.697002 0 42.39586s30.697002 11.698858 42.395859 0l381.962699-381.962699c11.698858-11.698858 11.698858-30.697002 0-42.39586z"
            fill="#FF6600"
            p-id="5073"
          ></path></svg
      ></i>
    </div>
    <div class="dialog" v-if="show">
      <p class="close" @click="show = false">X</p>
      <h3>{{ info.name }}</h3>
      <div class="detail-top">
        <div class="left">
          <span>{{ info.services?.[0].name }}</span>
        </div>
        <div class="right">{{ info.services?.[0].description }}</div>
      </div>
      <div class="detail-bottom">
        <div class="left">
          <span>{{ info.services?.[1].name }}</span>
        </div>
        <div class="right">{{ info.services?.[1].description }}</div>
      </div>
    </div>
    <div class="address">
      <i
        ><svg
          t="1763794008929"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6191"
          width="22"
          height="22"
        >
          <path
            d="M513.044898 929.959184c-27.167347 0-52.244898-12.538776-68.963265-33.959184-84.636735-110.759184-227.265306-324.440816-227.265306-506.77551C216.816327 226.220408 349.518367 94.040816 512 94.040816s295.183673 132.179592 295.183673 295.183674c0 182.334694-141.061224 396.016327-225.17551 506.77551-16.718367 21.420408-41.795918 33.959184-68.963265 33.959184zM512 135.836735c-139.493878 0-253.387755 113.371429-253.387755 253.387755 0 170.318367 136.881633 375.118367 218.383673 481.697959 8.359184 10.971429 21.420408 17.763265 35.526531 17.763265s27.167347-6.269388 35.526531-17.763265c80.979592-106.579592 216.293878-311.379592 216.293877-481.697959C765.387755 249.208163 651.493878 135.836735 512 135.836735z"
            fill="#333333"
            p-id="6192"
          ></path>
          <path
            d="M512 525.061224c-72.097959 0-130.612245-58.514286-130.612245-130.612244s58.514286-130.612245 130.612245-130.612245 130.612245 58.514286 130.612245 130.612245-58.514286 130.612245-130.612245 130.612244z m0-219.428571c-49.110204 0-88.816327 39.706122-88.816327 88.816327s39.706122 88.816327 88.816327 88.816326 88.816327-39.706122 88.816327-88.816326-39.706122-88.816327-88.816327-88.816327z"
            fill="#333333"
            p-id="6193"
          ></path></svg
      ></i>
      <span>{{ info.address }}</span>
      <i>
        <a :href="`tel:${info.telephones}`">
          <svg
            t="1763794047229"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7304"
            width="22"
            height="22"
          >
            <path
              d="M737.17551 923.167347c-40.228571 0-86.204082-7.314286-134.269388-22.465306-114.938776-36.04898-228.310204-110.759184-318.693877-210.546939-135.836735-149.942857-201.142857-299.363265-188.081633-432.587755 3.657143-32.914286 14.628571-74.710204 64.261225-108.669388 38.138776-30.302041 81.502041-48.587755 115.461224-47.542857 35.526531 0.522449 48.065306 13.061224 84.636735 66.873469C416.391837 245.55102 420.571429 284.212245 418.481633 306.155102c-3.657143 36.571429-24.032653 52.244898-41.795919 66.35102-4.702041 3.657143-8.881633 6.791837-12.538775 10.44898-21.942857 28.212245-49.110204 66.873469 66.35102 185.991837 98.742857 94.563265 151.510204 106.057143 173.97551 104.489796 17.240816-1.044898 24.555102-10.44898 27.167347-13.583674l0.522449-0.522449c36.571429-51.722449 49.110204-64.261224 84.114286-69.485714 34.481633-5.22449 51.722449 5.22449 124.342857 51.2 65.828571 41.273469 96.130612 68.963265 88.816327 111.804082-2.089796 47.542857-38.138776 111.804082-79.412245 140.538775-28.212245 19.853061-66.873469 29.779592-112.84898 29.779592zM273.240816 142.628571c-18.808163 0-52.244898 9.926531-88.293877 39.183674l-1.044898 1.044898c-33.436735 22.465306-42.840816 48.065306-46.497959 78.889796-11.493878 120.685714 49.632653 259.134694 177.632653 400.195918 138.971429 153.077551 311.379592 219.428571 423.183673 219.428572 37.093878 0 67.395918-7.314286 87.771429-21.420409 33.436735-23.510204 60.604082-78.367347 61.648979-109.191836l0.522449-3.134694c2.089796-12.016327 4.179592-24.032653-70.008163-70.530612-71.053061-44.930612-78.367347-48.065306-95.608163-45.453062-17.763265 2.612245-21.420408 3.134694-56.42449 52.767347l-1.044898 1.044898c-17.763265 22.465306-40.75102 28.734694-56.946939 30.302041-52.767347 4.179592-122.253061-35.004082-206.367347-115.983673l-0.522449-0.522449c-132.179592-135.836735-104.489796-196.440816-68.963265-242.416327l2.612245-2.612245c5.746939-5.22449 10.971429-9.926531 16.718367-14.106122 16.195918-13.061224 24.032653-19.853061 26.122449-37.616327 2.089796-24.032653-15.15102-61.126531-50.677551-110.236735l-0.522449-0.522448c-32.914286-48.587755-36.04898-48.587755-51.2-48.587756-1.044898-0.522449-1.567347-0.522449-2.089796-0.522449z"
              fill="#333333"
              p-id="7305"
            ></path>
          </svg>
        </a>
      </i>
    </div>
    <swiper
      :slidesPerView="4"
      :centeredSlides="true"
      :spaceBetween="30"
      :grabCursor="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :pagination="{
        clickable: true,
      }"
      class="swiper"
    >
      <swiper-slide
        v-for="(item, index) in films"
        :key="item.filmId"
        :class="['slide', { active: activeIndex === index }]"
      >
        <img :src="item.poster" />
      </swiper-slide>
      <div class="bg" :style="{ backgroundImage: `url(${currentFilm.poster})` }"></div>
      <div class="triangle"></div>
    </swiper>
    <div class="film-info" @click="goDetail(currentFilm.filmId)">
      <div class="forward">
        <svg
          t="1763797740159"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8342"
          width="13"
          height="13"
        >
          <path
            d="M305.587883 813.744345c-14.09502 12.824073-15.126512 34.658358-2.303462 48.752354 12.843516 14.09502 34.678824 15.126512 48.752354 2.302439l364.835266-332.676845c14.114462-12.844539 15.127536-34.659381 2.302439-48.753377-0.733711-0.815575-1.486864-1.588171-2.302439-2.302439l-0.078795-0.080841-0.13917-0.13917L352.037798 148.369166c-14.074553-12.824073-35.909861-11.791557-48.752354 2.302439-12.824073 14.09502-11.792581 35.930327 2.303462 48.753377l336.845795 307.168891L305.588907 813.743322 305.587883 813.744345 305.587883 813.744345z"
            fill="#272536"
            p-id="8343"
          ></path>
        </svg>
      </div>
      <h4>
        {{ currentFilm.name }} <span class="grade">{{ currentFilm.grade }}</span>
        <span>分</span>
      </h4>
      <div class="tag">
        <span>{{ currentFilm.category }}</span
        >| <span>{{ currentFilm.runtime }}分钟</span>|
        <span>{{ currentFilm.director }}</span
        >|
        <span v-for="item in currentFilm.actors" :key="item.name"> {{ item.name }} </span>
      </div>
    </div>
    <div class="day">
      <span
        class="tag"
        v-for="(item, index) in currentFilm.showDate"
        :key="item"
        :class="{ active: dateIndex === index }"
        @click="dateIndex = index"
      >
        {{ formatDate(item) }}
        <i :class="{ active: dateIndex === index }"></i>
      </span>
    </div>
    <div class="film-time">
      <ul>
        <li v-for="item in schedules" :key="item.scheduleId">
          <div class="left">
            <span class="start">{{ formatMinSec(item.showAt * 1000) }}</span>
            <span class="end">{{ formatMinSec(item.endAt * 1000) }}散场</span>
          </div>
          <div class="middle">
            <div class="start">{{ item.filmLanguage }}{{ item.imagery }}</div>
            <div class="end">{{ item.hallName }}</div>
          </div>
          <div class="right">￥{{ item.salePrice / 100 }}</div>
          <div class="but">购票</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.film-time {
  li {
    padding: 15px;
    height: 74px;
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    font-size: 12px;
    .left {
      width: 84px;
    }
    .middle {
      width: 136px;
    }
    .right {
      margin-left: 25px;
      font-size: 16px;
      color: #ff5f16;
      line-height: 25px;
    }
    .but {
      padding: 3px 10px;
      position: absolute;
      right: 10px;
      width: 50px;
      border-radius: 2px;
      font-size: 14px;
      text-align: center;
      border: 1px solid #ff5f16;
      color: #ff5f16;
    }
    .left,
    .middle {
      display: flex;
      flex-direction: column;
      .start {
        font-size: 16px;
        height: 23px;
        line-height: 23px;
      }
      .end {
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
.day {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: auto;
  .tag {
    flex: 1;
    flex-shrink: 0;
    padding: 0 12px;
    height: 40px;
    line-height: 40px;
    position: relative;
    i {
      width: 105px;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      margin-left: 10px;
      transition: 0.3s linear;
      &.active {
        background: #ff5f16;
      }
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
.film-info {
  padding: 15px 0;
  height: 80px;
  width: 100%;
  position: relative;
  h4 {
    text-align: center;
    margin-bottom: 10px;
    line-height: 18px;
    font-weight: normal;
    .grade {
      color: #d91;
      font-style: italic;
      font-size: 18px;
    }
    span {
      color: #d91;
    }
  }
  .tag {
    padding: 0 12%;
    font-size: 13px;
    color: #797d82;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      margin: 0 1px;
    }
  }
  .forward {
    position: absolute;
    margin-top: 16px;
    right: 10px;
  }
}
.swiper {
  height: 160px;
  padding: 15px 0;
  position: relative;
  overflow: hidden;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    filter: blur(10px);
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: #ffffff, $alpha: 0.5);
    }
  }
  .slide {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 130px;
    img {
      width: 72px;
      height: 104px;
      transition: 0.3s linear;
    }
    &.active {
      img {
        width: 90px;
        height: 130px;
      }
    }
  }
  .triangle {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAH1JREFUSA3N0EsKgDAMBNB4cu3JYyJ1oRTtZ/IZGLIbHiEChpkPLXASN1Vxcq7kQgpJP/dODqSoWrgbG4v8wcUiO3ExyEGcL3IS54NcxNkiQTgbJBiHRRrhMEhj3BrSCTeHdMaNIYNwfchg3DcyCa6NTIZ7IDfFEdEuzZhyAkTR3AC3/R6VAAAAAElFTkSuQmCC)
      no-repeat center;
    background-size: contain;
    z-index: 1;
  }
}
.back {
  position: fixed;
  left: 5px;
  top: 5px;
  height: 44px;
  line-height: 44px;
}
h3 {
  margin-top: 44px;
  text-align: center;
  padding: 0 15px;
  line-height: 44px;
}
.tags {
  padding: 5px 0 15px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    border: 1px solid #d91;
    padding: 2px 6px;
    margin: 0 5px;
    color: #d91;
    border-radius: 1px;
  }
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  p {
    position: absolute;
    left: 0;
    top: 0;
    height: 44px;
    line-height: 44px;
    font-size: 24px;
    width: 100%;
    padding-left: 14px;
  }
  span {
    font-size: 10px;
    border: 1px solid #d91;
    padding: 2px 6px;
    margin: 0 3px;
    color: #d91;
    border-radius: 1px;
  }
  .detail-top,
  .detail-bottom {
    display: flex;
    width: 100vw;
    padding: 0 20px;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 20px 0;
  }
  .detail-top {
    height: 44px;
  }
  .right {
    font-size: 12px;
    width: 260px;
    flex-shrink: 0;
    color: #666;
  }
  .left {
    width: 50px;
    flex-shrink: 0;
  }
  .detail-bottom .right {
    line-height: 26px;
  }
}
.address {
  display: flex;
  align-items: center;
  padding-left: 17px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  i {
    width: 22px;
    height: 22px;
    margin-bottom: 18px;
  }
  span {
    width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 6px;
    font-size: 14px;
  }
}
</style>
