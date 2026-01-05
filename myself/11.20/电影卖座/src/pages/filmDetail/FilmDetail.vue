<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFilmDetail } from "@/services";
import { formatTime } from "@/utils/util";
import Photos from "@/components/Photos.vue";

const route = useRoute();
const router = useRouter();
const info = ref([]);
const scrollTop = ref(0);
const showPhoto = ref(false);

console.log(route.params.filmId);
const getFilmDetailData = async () => {
  try {
    const res = await getFilmDetail(route.params.filmId);
    console.log(res.data.data.film);
    info.value = res.data.data.film;
  } catch (e) {
    console.log(e);
  }
};
getFilmDetailData();

const scrollFilmDetail = (e) => {
  console.log(e.target.scrollTop);
  scrollTop.value = e.target.scrollTop;
  if (scrollTop.value > 100) {
    console.log("超出距离");
  }
};
</script>

<template>
  <div class="film-detail-all">
    <div class="film-detail" @scroll="scrollFilmDetail">
      <header><img :src="info.poster" alt="" /></header>
      <div class="msg">
        <div class="header">
          <div class="lef">
            <span>{{ info.name }}</span>
            <span class="tag">{{ info.filmType?.name }}</span>
          </div>

          <div class="score">{{ info.grade }}分</div>
        </div>
        <p>{{ info.category }}</p>
        <div class="startTime">{{ formatTime(info.premiereAt) }}上映</div>
        <div class="address">
          <span>{{ info.nation }}</span> | <span>{{ info.runtime }}分钟</span>
          <div class="desc">{{ info.synopsis }}</div>
        </div>
        <div class="line"></div>
      </div>
      <div class="actors">
        <div class="actor">演职人员</div>
        <ul>
          <li v-for="item in info.actors" :key="item.name">
            <img :src="item.avatarAddress" alt="" width="85" height="121" />
            <div class="name">{{ item.name }}</div>
            <div class="role">{{ item.role }}</div>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="footer">
        <div class="cinema-pic">
          <h4>剧照</h4>
          <span>全部</span>
        </div>
        <div class="cinema-picture">
          <div class="photo" v-for="item in info.photos" @click="showPhoto = true">
            <img :src="item" alt="" />
          </div>
        </div>
        <Photos v-model:visible="showPhoto" :photos="info.photos"></Photos>
      </div>
    </div>
    <svg
      t="1763716606452"
      class="icon1"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="13277"
      width="24"
      height="24"
      @click="$router.back()"
    >
      <path
        d="M512 3.072C231.424 3.072 3.072 231.424 3.072 512s228.352 508.928 508.928 508.928 508.928-228.352 508.928-508.928S792.576 3.072 512 3.072z m0 937.472c-236.544 0-428.544-192.512-428.544-428.544S275.456 83.456 512 83.456s428.544 192.512 428.544 428.544-192 428.544-428.544 428.544z"
        p-id="13278"
        fill="#ffffff"
      ></path>
      <path
        d="M648.704 230.912c0-11.264-4.608-22.016-12.8-30.208-8.192-8.192-18.944-12.288-30.208-12.288s-22.016 4.608-30.208 12.288l-256.512 256c-30.208 30.208-30.208 79.872 0 110.08l256.512 256.512c8.192 8.192 18.944 12.8 30.208 12.8s22.016-4.608 30.208-12.288c8.192-8.192 12.8-18.944 12.8-30.208s-4.608-22.016-12.8-30.208l-250.88-251.392 250.88-250.88c8.192-8.192 12.8-18.944 12.8-30.208z"
        p-id="13279"
        fill="#ffffff"
      ></path>
    </svg>
    <div class="dialog" v-show="scrollTop > 60">
      <svg
        t="1763717105131"
        class="icon2"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="14531"
        width="24"
        height="24"
        @click="$router.back()"
      >
        <path
          d="M686.726737 38.912a53.894737 53.894737 0 0 1 82.135579 69.524211l-4.365474 5.12-393.377684 409.6 393.377684 409.6a53.894737 53.894737 0 0 1 3.018105 71.248842l-4.581052 4.958315a53.894737 53.894737 0 0 1-71.248842 3.072l-4.958316-4.581052L257.562947 560.505263a53.894737 53.894737 0 0 1-4.311579-69.632l4.311579-5.01221L686.726737 38.912z"
          fill="#333333"
          p-id="14532"
        ></path>
      </svg>
      <h3>{{ info.name }}</h3>
    </div>
    <div class="button">选座购票</div>
  </div>
</template>

<style lang="scss" scoped>
.film-detail-all {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.button {
  width: 100vw;
  height: 50px;
  background: #e95;
  color: #fff;
  text-align: center;
  line-height: 50px;
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  .icon2 {
    width: 40px;
    margin-right: 2px;
  }
  h3 {
    flex: 1;
    text-align: center;
  }
}
.icon1 {
  position: fixed;
  left: 7px;
  top: 7px;
  display: flex;
  align-items: center;
}
.film-detail {
  flex: 1;
  height: 100vh;
  overflow-y: scroll;
  header {
    width: 100%;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover; /* 等比填满，多余裁剪 */
      object-position: center; /* 只留中间 */
    }
  }
}
.line {
  width: 100%;
  height: 20px;
  background-color: #f4f4f4;
}
ul {
  display: flex;
  overflow: auto;
  margin-top: 10px;
  scrollbar-width: none;
  li {
    width: 130px;
    height: 180px;
    flex-shrink: 0;
    text-align: center;
  }
}
.cinema-picture {
  padding: 20px;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  .photo {
    margin: 0 5px;
    display: flex;
    flex-wrap: wrap;
  }
  img {
    width: 200px;
    height: 140px;
    object-fit: cover; /* 等比填满，多余裁剪 */
    object-position: center;
    transform-origin: left top;
  }
}
.cinema-pic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  // &::-webkit-scrollbar {
  //   display: none;
  // }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag {
  margin-left: 5px;
  background-color: #ccc;
  font-size: 12px;
}
.msg {
  padding: 10px;
}
.actors {
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.score {
  color: #e95;
  font-style: italic;
}
</style>
