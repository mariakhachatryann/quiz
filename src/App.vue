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

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: "Quicksand", sans-serif;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-image: url("@/assets/img/wp9440197.webp");
	width: 100%;
	height: 100vh;
	background-size: cover;
	background-repeat: no-repeat;
}

@media screen and (max-width: 390px) {
	#app {
		height: 107vh;
	}
}

@media screen and (max-height: 450px) {
	#app {
		height: 200vh;
	}
}
</style>
