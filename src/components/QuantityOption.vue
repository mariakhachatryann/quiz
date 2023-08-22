<template>
    <div class="mt-[25px]">
        <p class="text-[33px]">Quantity of questions</p>
        <div class="flex justify-center items-center">
            <button class="w-[50px] h-[35px] rounded-md mt-[15px] text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100" @click="decreaseQst">-</button>
            <button class="w-[150px] h-[35px] rounded-md text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100 mt-[15px] mx-1.5">Quantity: {{ quantity }}</button>
            <button class="w-[50px] h-[35px] rounded-md mt-[15px] text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100" @click="increaseQst">+</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits()
const quantity = ref(10);

function increaseQst() {
    if (quantity.value < 30) {
        quantity.value++;
    }
}

function decreaseQst() {
    if (quantity.value > 3) {
        quantity.value--;
    }
}

watch(quantity, function(newQuantity) {
    emit("quantity-updated", newQuantity);
})
</script>