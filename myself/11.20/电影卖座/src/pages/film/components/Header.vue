<script setup>
import Nav from "./Nav.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

// const props = defineProps("info");
const GpsCity = ref(JSON.parse(localStorage.getItem("GpsCity")));
const currentCity = ref(JSON.parse(localStorage.getItem("currentCity")));
</script>

<template>
  <div class="header">
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
      电影
    </h3>
    <Nav></Nav>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  height: 100px;
  width: 100%;
  background-color: #fff;
  h3 {
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid;
    position: relative;
    a {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 14px;
      color: black;
      width: 60px;
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
