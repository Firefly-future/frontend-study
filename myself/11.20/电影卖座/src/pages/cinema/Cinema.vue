<script setup>
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import { useRouter, RouterLink, useRoute } from "vue-router";
import { getCinema } from "@/services";
import Header from "./components/Header.vue";

const info = ref([]);
const router = useRouter();
const currentArea = ref("all");
const route = useRoute();

const getCinemaData = async (tricketFlag = 1) => {
  try {
    const res = await getCinema({ tricketFlag });
    console.log(res.data.data.cinemas);
    info.value = res.data.data.cinemas;
    console.log(citiesData.value);
  } catch (e) {
    console.log(e);
  }
};
getCinemaData();

const goDetail = (cinemaId) => {
  router.push({
    name: "cinemaDetail",
    params: {
      cinemaId,
    },
  });
};

const citiesData = computed(() => {
  const options = [...new Set(info.value.map((item) => item.districtName))];
  const data = [{ label: "全城", value: "all" }];
  return data.concat(options.map((v) => ({ label: v, value: v })));
});

const filterCinemas = computed(() => {
  if (currentArea.value === "all") return info.value;
  return info.value.filter((v) => v.districtName === currentArea.value);
});
</script>
<template>
  <div class="cinema">
    <Header
      @search="getCinemaData"
      @filterArea="(e) => (currentArea = e)"
      :cityOptions="citiesData"
    ></Header>
    <div
      class="cinema-item"
      v-for="item in filterCinemas"
      :key="item.cinemaId"
      @click="goDetail(item.cinemaId)"
    >
      <div class="name">
        <h3>{{ item.name }}</h3>
        <p>{{ item.lowPrice / 100 }}元起</p>
      </div>
      <div class="address">
        <h5>{{ item.address }}</h5>
        <p>距离{{ item.Distance.toFixed(1) }}km</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cinema {
  width: 100vw;
  height: 100vh;

  // background: aqua;
  .cinema-item {
    padding: 10px;
    color: #666;
  }

  .name,
  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .name {
    margin-bottom: 5px;
    h3 {
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 240px;
    }
    p {
      color: #ffc25a;
      width: 80px;
      text-align: center;
    }
  }

  .address {
    margin-top: 10px;
    h5 {
      font-size: 12px;
      width: 240px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      color: #797d82;
      font-size: 12px;
      width: 80px;
      text-align: center;
    }
  }
}
</style>
