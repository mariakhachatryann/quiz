<template>
    <div class="option-block">
            <h2 class="option-block-title">Duration of each question</h2>
            <div class="options">
                <select name="" id="" class="option-select else" v-model="duration">
                    <option disabled value="">Please select one</option>
                    <option value="0.5">30 seconds</option>
                    <option value="1">1 minute</option>
                    <option value="1.5">1.5 minute</option>
                    <option value="2">2 minutes</option>
                </select>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            duration: ""
        };
    },
    watch: {
        duration(newDuration) {
            this.$emit("duration-updated", newDuration);
        }
    }
};
</script>