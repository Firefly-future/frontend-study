<script setup>
  import { ref } from 'vue';
  import { getGeo, getWeather } from './serve/serve';
  import BodyTop from './components/BodyTop.vue';
  import BodyBottom from './components/BodyBottom.vue';
  import { weathercode } from './utils/util.js'
  const cityList = ref([])
  const weather = ref([])
  const city = ref('')

  let lat = ref('')
  let long = ref('')

  const getGeoData = async (city) => {
    if (!city || city.trim() === '') {
      alert('请输入城市名称')
      return
    }
    try {
      const res = await getGeo(city)
      console.log(res.data)
      if (!res.data.results || res.data.results.length === 0) {
        alert('未找到该城市')
        return
      }
      cityList.value = res.data.results[0]
      console.log(cityList.value)
      lat.value = cityList.value.latitude
      long.value = cityList.value.longitude
      await getWeatherData(lat.value, long.value)
    } catch (e) {
      console.log(e)
    }
  }
  const getWeatherData = async () => {
    try {
      const res = await getWeather(lat.value, long.value)
      console.log(res.data)
      weather.value = res.data
      console.log(weather.value)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<template>
  <div class="app">
    <header>
      <input type="text" placeholder="请输入城市" class="inp" v-model="city" @keydown.enter="getGeoData(city)">
      <button @click="getGeoData(city)">搜索</button>
    </header>
    <BodyTop :cityList="cityList" :weather="weather" :weathercode="weathercode"></BodyTop>
    <BodyBottom :cityList="cityList" :weather="weather" :weathercode="weathercode"></BodyBottom>
  </div>
</template>

<style scoped>
  .app {
    width: 600px;
    margin: 0 auto;
    min-height: 800px;
    border-radius: 20px;
    background: #41437F;

    header {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .inp {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      border: none;
      outline: none;
    }

    button {
      padding: 10px;
      border-radius: 10px;
      width: 80px;
      background: #4181FC;
      color: #fff;
      border: none;
      outline: none;
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>
