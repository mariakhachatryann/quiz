<template>
    <div class="option-block">
        <h2 class="option-block-title">Quantity of questions</h2>
        <div class="options">
            <button class="option-qnt" @click="decreaseQst">-</button>
            <button class="option-button">Quantity: {{ quantity }}</button>
            <button class="option-qnt" @click="increaseQst">+</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quantity: 10
        };
    },
    methods: {
        increaseQst() {
            if (this.quantity < 30) {
                this.quantity++;
            }
        },
        decreaseQst() {
            if (this.quantity > 3) {
                this.quantity--;
            }
        },
    },
    watch: {
        quantity(newQuantity) {
            this.$emit("quantity-updated", newQuantity);
        }
    }
};
</script>