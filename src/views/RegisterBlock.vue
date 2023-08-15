<template>
	<div class="fixed z-[100] w-[450px] p-11 rounded-md border-none items-center bg-cyanCust-200 shadow-[0_2px_8px_rgba(0,0,0,.26)] text-cyanCust-100">
		<p class="text-[40px] mb-5">
            <span class="cursor-pointer" @click="block = 'SignBlock'">Sign Up</span> / <span class="cursor-pointer" @click="block = 'LogBlock'">Log In</span>
        </p>
		<component :is="block"></component>
	</div>
</template>

<script>
import LogBlock from "../components/LogBlock.vue";
import SignBlock from "../components/SignBlock.vue";

export default {
    components: {
        LogBlock, SignBlock
    },
    data() {
        return {
            block: "SignBlock"
        }
    }
}
</script>