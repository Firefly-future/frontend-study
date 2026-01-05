<script setup>
import { ref } from 'vue'

const cityGroup=ref([])
const info=ref([])
import axios from 'axios'
// 城市列表
const getCities = () => {
  return axios.get('https://m.maizuo.com/gateway/', {
    params: {
      k: 5236719
    },
    headers: {
      'x-client-info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"17406486386215998793318401"}',
      'x-host': 'mall.film-ticket.city.list'
    }
  })
}
// cityGroup=ref([{title:'A',list:[]}])
const getCityList=async()=>{
  try {
    const res=await getCities()
    console.log(res.data.data.cities)
    info.value=res.data.data.cities
    cityGroup.value=formatCityGroup(info.value)
  } catch (e) {
    console.log(e)
  }
}
getCityList()

const formatCityGroup=(list)=>{
  const res=[]
  list.forEach(v=>{
    const filterLetter=v.pinyin[0]
    const curGroup=res.find(v=>v.title===filterLetter)
    if(curGroup){
      curGroup.list.push(v)
    }else{
      res.push({
        title:filterLetter,
        list:[v]
      })
    }
  })
  return res
}
</script>
<template>
<div class="city">
  <div v-for="item in cityGroup" :key="item.title">
     <div class="title">{{ item.title }}</div>
     <div class="city-item" v-for="city in item.list" :key="city.id">
        {{city.name}}
     </div>
  </div>
</div>
</template>

<style scoped></style>
