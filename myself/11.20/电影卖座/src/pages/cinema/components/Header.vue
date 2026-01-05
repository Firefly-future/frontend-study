<script setup>
import { reactive, ref, watch } from "vue";
import Select from "@/components/Select.vue";
const props = defineProps(["cityOptions"]);
const emits = defineEmits(["search", "filterArea"]);

const GpsCity = ref(JSON.parse(localStorage.getItem("GpsCity")));
const currentCity = ref(JSON.parse(localStorage.getItem("currentCity")));
const form = reactive({
  area: "all",
  ticketType: 1,
  distance: 1,
});
// 通知父组件购票类型改变
watch(
  () => form.ticketType,
  () => {
    console.log("form.ticektType改变了", form.ticketType);
    emits("search", form.ticketType);
  }
);
// 通知父组件区域改变
watch(
  () => form.area,
  () => {
    console.log("form.area改变了", form.area, props.cityOptions);
    emits("filterArea", form.area);
  }
);
</script>
<template>
  <div class="header">
    <div class="header-top">
      <h3>
        <RouterLink :to="'/city'">
          {{ currentCity?.name || GpsCity.name }}
          <svg
            t="1763992162950"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5042"
            width="12"
            height="12"
          >
            <path
              d="M512 657.723077c-7.876923 0-15.753846-3.938462-19.692308-7.876923l-240.246154-232.369231c-11.815385-11.815385-11.815385-31.507692 0-43.323077 11.815385-11.815385 31.507692-11.815385 43.323077 0l220.553847 212.676923 220.553846-212.676923c11.815385-11.815385 31.507692-11.815385 43.323077 0 11.815385 11.815385 11.815385 31.507692 0 43.323077l-240.246154 232.369231c-11.815385 3.938462-19.692308 7.876923-27.569231 7.876923z"
              fill="#1A1311"
              p-id="5043"
            ></path>
          </svg>
        </RouterLink>
      </h3>
      <div class="title">影院</div>
      <div class="pic">🔍</div>
    </div>
    <div class="header-bottom">
      <Select
        class="filter-item"
        v-model="form.area"
        list-type="tag"
        :options="cityOptions"
      ></Select>
      <Select
        class="filter-item"
        v-model="form.ticketType"
        list-type="list"
        :options="[
          { label: 'APP订票', value: 1 },
          { label: '前台兑换', value: 2 },
        ]"
      ></Select>
      <Select
        class="filter-item"
        v-model="form.distance"
        list-type="list"
        :options="[
          { label: '最近去过', value: 1 },
          { label: '离我最近', value: 2 },
        ]"
      ></Select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px;
  position: relative;
  left: 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #fff;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 30px;
  h3 {
    font-size: 14px;
    font-weight: normal;
  }
  .title {
    font-size: 16px;
    width: 60px;
  }
}

.header-bottom {
  display: flex;
  align-items: center;
  line-height: 50px;
  .filter-item {
    flex: 1;
  }
}
a {
  text-decoration: none;
  font-size: 14px;
  color: black;
}
</style>
