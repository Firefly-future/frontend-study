<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { getFilm } from "@/services";
import { typeEl } from "./contains";
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";

const info = ref([]);
const router = useRouter();
const route = useRoute();
const scrollTop = ref(0);
const total = ref(0);
const pageNum = ref(1);

const getFilmData = async () => {
  try {
    const res = await getFilm({
      type: typeEl[route.params.type],
      pageNum: pageNum.value,
    });
    console.log("动态参数", route.params);
    console.log(res.data.data.films);
    info.value = info.value.concat(res.data.data.films);
    total.value = res.data.data.total;
  } catch (e) {
    console.log(e);
  }
};

watch(
  route,
  async () => {
    if (!typeEl[route.params.type]) {
      router.replace("/home/film/now");
      return;
    }
    pageNum.value = 1;
    info.value = [];
    getFilmData();
  },
  {
    immediate: true,
  }
);
const goDetail = (filmId) => {
  router.push({
    name: "filmDetail",
    params: {
      filmId,
    },
  });
};

const scrollFilm = (e) => {
  console.log(e.target.scrollTop);
  const { clientHeight, scrollTop: top, scrollHeight } = e.target;
  scrollTop.value = top;
  if (
    clientHeight + top + 1 >= scrollHeight &&
    info.value.length < total.value &&
    info.value.length > 0
  ) {
    console.log("滚动到底部了");
    pageNum.value++;
    getFilmData();
  }
};
</script>
<template>
  <div class="film" @scroll="scrollFilm">
    <Header v-show="scrollTop > 400"></Header>
    <Nav></Nav>
    <div class="list">
      <div class="film-item" v-for="item in info" :key="item.filmId">
        <div class="pic" @click="goDetail(item.filmId)">
          <img :src="item.poster" alt="" width="80" />
        </div>
        <div class="msg" @click="goDetail(item.filmId)">
          <h4>
            <span> {{ item.name }} </span
            ><span class="filmType">{{ item.filmType?.name }}</span>
          </h4>
          <p class="score">
            观众评分：<span>{{ item.grade }}</span>
          </p>
          <p class="actors">
            主演：<span v-for="v in item.actors" :key="v.name"> {{ v.name }} &nbsp;</span>
          </p>
          <p>
            <span class="address">{{ item.nation }} </span>|
            <span class="time">{{ item.runtime }}分钟</span>
          </p>
        </div>
        <div class="button">购票</div>
      </div>
      <div class="line" v-if="info.length >= total">没有更多数据了</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line {
  height: 40px;
  background-color: #ccc;
  text-align: center;
  line-height: 40px;
}
.film {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;

  nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 50px;
    min-height: 50px;
    border-bottom: 1px solid #ccc;

    .router-link-active {
      background-color: tomato;
    }
  }
}

.film-item {
  display: flex;
  align-items: center;
  height: 120px;
  width: 100%;
  overflow: hidden;

  .msg {
    flex: 1;
    padding: 5px;
    min-width: 0;
  }

  h4 {
    font-weight: normal;
    font-size: 14px;
    display: flex;
    span {
      height: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .filmType {
      background: #ccc;
      font-size: 10px;
      margin-left: 5px;
    }
  }

  .actors {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.button {
  background-color: #ffffff;
  color: #ff7b96;
  border: 1px solid #ff7b96;
  padding: 5px 10px;
  margin-right: 15px;
}

a {
  text-decoration: none;
}
.score {
  span {
    color: #ff7b96;
  }
}
</style>
