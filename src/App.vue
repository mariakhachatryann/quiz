<template>
	<router-view></router-view>
</template>

<script>
export default {
	created() {
		const saveData = localStorage.getItem("saveData")
		if (saveData === "yes") {
			this.$store.dispatch("autoLogin")
		}
	}
}
</script>
