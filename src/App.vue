<template>
	<router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
	const saveData = localStorage.getItem("saveData")
	if (saveData === "yes") {
		store.dispatch("autoLogin")
	}
})
</script>
