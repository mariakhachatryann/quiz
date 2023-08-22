<template>
    <div class="mt-[25px]">
        <p class="text-[33px]">Duration of each question</p>
        <div class="flex justify-center items-center">
            <select class="text-cyanCust-100 px-[24px] py-[7px] rounded-md cursor-pointer bg-cyanCust-200 text-[17px] mt-[15px] outline-none mb-[55px]" name="" id="" v-model="duration">
                <option disabled value="">Please select one</option>
                <option value="0.5">30 seconds</option>
                <option value="1">1 minute</option>
                <option value="1.5">1.5 minute</option>
                <option value="2">2 minutes</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits()
const duration = ref("");

watch(duration, function(newDuration) {
    emit("duration-updated", newDuration)
})
</script>