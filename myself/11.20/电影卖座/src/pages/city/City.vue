<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { getCity } from "@/services";

const router = useRouter();
const searchInp = ref("");
const searchEl = ref(null);
const showCancel = ref(false);
const cityList = ref([]);
const city = ref(""); //当前城市
const cityEl = ref({});
const tipText = ref(null);
const GpsCity = ref(JSON.parse(localStorage.getItem("GpsCity")));
const showResult = ref(false);
const showMark = ref(false);
const currentCity = ref(JSON.parse(localStorage.getItem("currentCity")));

const switchCity = () => {
  if (GpsCity.value) {
    selectCity(GpsCity.value);
    showMark.value = false;
  }
};

const showMarkDetail = computed(() => {
  return showMark.value && GpsCity.value?.name !== currentCity.value?.name;
});
const cancelShowMark = () => {
  return (showMark.value = false);
};

const selectCity = (city) => {
  console.log("选择的城市", city);
  localStorage.setItem("currentCity", JSON.stringify(city));
  router.push("/home/film");
};

const searchResult = computed(() => {
  if (!searchInp.value) return [];
  return cityList.value.filter((v) => {
    return (
      v.name.includes(searchInp.value) ||
      v.pinyin.toLowerCase().includes(searchInp.value.toLowerCase())
    );
  });
});

let timeoutId = null;
const showTip = (text) => {
  tipText.value = text;
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    tipText.value = null;
  }, 2000);
};

const setCityRef = (el, key) => {
  if (el) {
    cityEl.value[key] = el;
  }
};
const getCityData = async () => {
  try {
    const res = await getCity();
    console.log(res.data.data.cities);
    cityList.value = res.data.data.cities;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getCityData();
  if (
    GpsCity.value &&
    currentCity.value &&
    GpsCity.value.name !== currentCity.value.name
  ) {
    showMark.value = true;
  } else if (GpsCity.value && !currentCity.value) {
    // 如果有定位城市但没有当前城市，也显示提示
    showMark.value = true;
  }
});
const cityHot = computed(() => {
  return cityList.value.filter((v) => v.isHot === 1);
});
const groupCity = computed(() => {
  const group = new Map();
  cityList.value.forEach((obj) => {
    if (!group.has(obj.pinyin[0])) {
      group.set(obj.pinyin[0], []);
    }
    group.get(obj.pinyin[0]).push(obj);
  });
  return [...group];
});
// 滚动至对应英文处
const scrollToCity = (key) => {
  const target = cityEl.value[key];
  if (target) {
    const offsetTop = target.offsetTop;
    window.scrollTo({
      top: offsetTop - 90, // 减去顶部固定区域高度（如 header）
      behavior: "smooth",
    });
  }
  showTip(key);
};
</script>
<template>
  <div class="city">
    <div class="header">
      <div class="left">
        <RouterLink :to="'/home/film'" class="close">
          <svg
            t="1763900145197"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5642"
            width="30"
            height="30"
          >
            <path
              d="M807.538939 256.459755a20.897959 20.897959 0 0 1 0 29.549714L571.099429 522.44898l236.43951 236.43951a20.897959 20.897959 0 0 1 0 29.549714l-29.549715 29.549714a20.897959 20.897959 0 0 1-29.549714 0L512 581.548408 275.56049 817.987918a20.897959 20.897959 0 0 1-29.549714 0l-29.549715-29.549714a20.897959 20.897959 0 0 1 0-29.549714L452.900571 522.44898 216.461061 286.009469a20.897959 20.897959 0 0 1 0-29.549714l29.549715-29.549714a20.897959 20.897959 0 0 1 29.549714 0L512 463.349551l236.43951-236.43951a20.897959 20.897959 0 0 1 29.549714 0l29.549715 29.549714z"
              fill="#222429"
              p-id="5643"
            ></path>
          </svg>
        </RouterLink>
      </div>
      <div class="title">当前城市-{{ currentCity?.name || GpsCity.name }}</div>
    </div>
    <div class="inp-area">
      <input
        v-model="searchInp"
        ref="searchEl"
        class="inp"
        type="text"
        placeholder="请输入城市名或拼音"
        @focus="showCancel = true"
        @blur="showCancel = false"
        @input="showResult = true"
      />
      <svg
        t="1763901350143"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6735"
        width="20"
        height="20"
      >
        <path
          d="M949.355 925.236L783.373 759.254a416.688 416.688 0 0 1-26.602 26.602l165.982 165.982c7.346 7.346 19.255 7.346 26.602 0 7.345-7.346 7.345-19.257 0-26.602zM477.75 104.018c-207.78 0-376.217 168.437-376.217 376.214 0 207.778 168.437 376.215 376.217 376.215 207.776 0 376.213-168.437 376.213-376.215 0-207.777-168.437-376.214-376.213-376.214z m0 714.807c-187.002 0-338.596-151.592-338.596-338.594 0-186.998 151.594-338.594 338.596-338.594 186.998 0 338.594 151.596 338.594 338.594 0 187.002-151.596 338.594-338.594 338.594z"
          p-id="6736"
        ></path>
      </svg>
      <div
        class="cancel"
        v-show="showCancel"
        @mousedown.prevent
        @click="
          searchInp = '';
          searchEl.blur(); // 手动失焦
          showCancel = false;
          showResult = false;
        "
      >
        取消
      </div>
    </div>
  </div>
  <div class="main">
    <div class="city-ind">GPS定位你所在城市</div>
    <div class="city-detail">
      <span v-if="GpsCity" @click="selectCity(GpsCity)">{{ GpsCity.name }}</span>
      <span v-else>定位失败</span>
    </div>
    <div class="tit">热门城市</div>
    <div class="city-hot">
      <span v-for="item in cityHot" :key="item.cityId" @click="selectCity(item)">
        {{ item.name }}
      </span>
    </div>
  </div>
  <div class="cities">
    <div class="group" v-for="(item, index) in groupCity" :key="index">
      <p :ref="(el) => setCityRef(el, item[0])">{{ item[0] }}</p>
      <div class="city-list">
        <span v-for="city in item[1]" :key="city.cityId" @click="selectCity(city)">
          {{ city.name }}
        </span>
      </div>
    </div>
  </div>
  <div class="letter">
    <span
      v-for="(item, index) in groupCity"
      :key="index"
      @click="scrollToCity(item[0])"
      >{{ item[0] }}</span
    >
  </div>
  <div class="city-search" v-if="showResult">
    <div class="searchRe" v-if="searchInp.length === 0">未找到搜索结果</div>
    <div class="result" v-else>
      <span v-for="item in searchResult" @click="selectCity(item)">{{ item.name }}</span>
    </div>
  </div>
  <div class="tip" v-if="tipText">{{ tipText }}</div>
  <div class="mark" v-show="showMarkDetail">
    <div class="info">检测到当前定位为{{ GpsCity.name }},是否切换至当前定位城市？</div>
    <div class="btns">
      <div class="ok" @click="switchCity">切换</div>
      <div class="no" @click="cancelShowMark">取消</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mark {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 20;
  background-color: rgba($color: #000000, $alpha: 0.6);
  .info {
    flex: 1;
    text-align: center;
    padding: 20px;
  }
  .btns {
    display: flex;
    width: 100%;
    height: 40px;
    .ok,
    .no {
      flex: 1;
      text-align: center;
      line-height: 40px;
      &:hover {
        background-color: aqua;
      }
    }
  }
}
.tip {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: rgba($color: #000000, $alpha: 0.7);
  color: #fff;
  transform: translate(-50%, -50%);
}
.city-search {
  position: fixed;
  margin-top: 93px;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  z-index: 10;
  color: #000000;
  .searchRe {
    text-align: center;
    line-height: 50px;
  }
  .result {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    overflow: auto;
    span {
      padding-left: 25px;
      line-height: 48px;
      font-size: 14px;
    }
  }
}
.letter {
  position: fixed;
  left: 100%;
  top: 50%;
  margin-top: 85px;
  transform: translate(-100%, -50%);
  display: flex;
  flex-direction: column;
  font-size: 12px;
  max-height: 100%;
  width: 13px;
  justify-content: flex-start;
  span {
    margin: 1px;
  }
}
.cities {
  height: auto;
  p {
    background-color: #f4f4f4;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    width: 95%;
  }
  .city-list {
    display: flex;
    flex-direction: column;
    span {
      padding-left: 25px;
      line-height: 48px;
    }
  }
}
.city {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.header {
  width: 100%;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  background-color: #fff;
  color: black;
  display: flex;
  align-items: center;
  .left {
    width: 14%;
    position: relative;
    .icon {
      position: absolute;
      top: -14px;
      left: 10px;
    }
  }
  a {
    height: 44px;
    line-height: 44px;
    text-decoration: none;
  }
  .title {
    width: 72%;
    text-align: center;
  }
}
.inp-area {
  background-color: #f4f4f4;
  height: 49px;
  width: 100%;
  padding: 10px 15px;
  position: relative;
  .inp {
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    height: 30px;
    outline: none;
    border: none;
    padding-left: 40px;
    font-size: 12px;
    line-height: 30px;

    &::placeholder {
      color: #ccc;
    }
  }
  .icon {
    position: absolute;
    left: 20px;
    top: 15px;
    width: 30px;
  }
  .cancel {
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 12px;
    background-color: #f4f4f4;
    padding: 10px 15px;
  }
}
.main {
  margin-top: 95px;
  padding-top: 15px;
  padding-left: 15px;

  .city-ind,
  .tit {
    font-size: 13px;
    color: #797d82;
    margin-bottom: 10px;
  }
  .city-detail {
    height: 45px;
  }
  span {
    display: block;
    background-color: #f4f4f4;
    min-width: 40px;
    min-height: 30px;
    max-width: 100px;
    text-align: center;
    line-height: 30px;
  }
  .city-hot {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 99px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      margin: 10px;
    }
  }
}
</style>
