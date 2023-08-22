<template>
	<div class="container-sm fixed z-[100] w-[450px] p-11 rounded-md border-none items-center bg-cyanCust-200 shadow-[0_2px_8px_rgba(0,0,0,.26)] text-cyanCust-100">
		<p class="text-[40px] mb-5">
            <span class="cursor-pointer" :class="{'bg-cyanCust-100 text-cyanCust-200 rounded-md p-[1px]': isActive}" @click="changeBlocks('SignBlock')">Sign Up</span> / 
            <span class="cursor-pointer" :class="{'bg-cyanCust-100 text-cyanCust-200 rounded-md p-[1px]': !isActive}"  @click="changeBlocks('LogBlock')">Log In</span>
        </p>
		<component :is="comp"></component>
	</div>
    
</template>

<script setup>
import { ref, computed } from "vue";
import LogBlock from "../components/LogBlock.vue";
import SignBlock from "../components/SignBlock.vue";

let block = ref("SignBlock");
let isActive = ref(true);

const comp = computed(() => {
    return block.value === "SignBlock" ? SignBlock : LogBlock;
});

const changeBlocks = (blockName) => {
    block.value = blockName;
    isActive.value = block.value === "SignBlock";
}
</script>