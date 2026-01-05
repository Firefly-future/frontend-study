<script setup>
import { RouterView } from "vue-router";
import { getGpsCity } from "@/services";
import { onMounted } from "vue";

// 获取当前城市定位
onMounted(() => {
  // 获取经纬度定位
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const res = await getGpsCity({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
      console.log(res.data);
      localStorage.setItem('GpsCity',JSON.stringify(res.data.data.city))
    },
    (e) => {
      console.log("定位失败");
    }
  );
});
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
