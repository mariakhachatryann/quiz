<template>
	<div class="h-full flex justify-center items-center flex-col" >
		<h1 class="text-6xl uppercase mb-8">Quiz Game !!!</h1>
		<div class="flex flex-col">
			<p class="text-2xl">Do you want to save your data ?</p>
			<div class="flex justify-center mt-2.5">
				<div class="flex items-center mr-2.5 mb-5 ml-5">
          			<label class="mr-2 cursor-pointer text-xl" for="yes">yes</label>
					<input class="appearance-none w-3 h-3 border-2 border-solid	rounded-full border-[#76B1BD] cursor-pointer bg-transparent mr-2 checked:bg-[#76b1bd]" type="radio" name="data" id="yes" value="yes" v-model="selectedOption">
				</div> 
				<div class="flex items-center mr-2.5 mb-5 ml-5">
					<label class="mr-2 cursor-pointer text-xl" for="no">no</label>
					<input class="appearance-none w-3 h-3 border-2 border-solid rounded-full border-[#76B1BD] cursor-pointer bg-transparent mr-2 checked:bg-[#76b1bd]" type="radio" name="data" id="no" value="no" v-model="selectedOption">
				</div>
			</div>
		</div>
		<router-view></router-view>
		<router-link :to="routePath">
        	<button class="w-56 h-8 rounded-md border-none mt-5 text-lg cursor-pointer bg-[#2c3e50] text-[#76B1BD]">
				Start
			</button>
		</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedOption: "no"
		}
	},
	async mounted() {
		await this.$store.dispatch("getUsers")
		await this.$store.dispatch("logout")
		this.$store.commit("removeOptions")
	},
	methods: {
		setData() {
			localStorage.setItem('saveData', this.selectedOption)
		},
		close() {
			if (this.$route.path !== "/main/auth/") {
				this.$router.replace("/main")
			}
		}
	},
	computed: {
		routePath() {
			if (this.selectedOption === "no") {
				return "/options"
			} else if (this.selectedOption === "yes") {
				return "/main/auth/"
			}
		} 
	}
}
</script>