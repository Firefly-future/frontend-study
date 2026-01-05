<script setup lang="ts">
import { RouterView } from "vue-router"
import { useUserStore } from "./store/user"
const userStore = useUserStore()
userStore.getUserInfo()
</script>

<template>
	<div class="app">
		<RouterView></RouterView>
	</div>
</template>

<style scoped></style>
