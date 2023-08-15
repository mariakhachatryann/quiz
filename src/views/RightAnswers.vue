<template>
    <div class="bg-cyanCust-200 text-cyanCust-100 p-8">
        <p class="text-3xl mb-6">Category: {{ this.$store.getters.gameOptions.topic.label }}</p>
        <div v-for="(question, index) in questions" :key="question" class="m-3 text-xl">
            <p class="text-xl">{{ index + 1}}. {{ question.question }}</p>
            <p class="text-l">Answer: {{ question.answer }}</p>
        </div>
        <router-link to="/scores">
            <button class="text-l mt-6 px-3 py-2 rounded-md bg-cyanCust-100 text-cyanCust-200 duration-300">Go Back To Scores</button>
        </router-link>
    </div>    
</template>

<script>
export default {
    computed: {
        questions() {
            return this.$store.getters.questions
        }
    }
}
</script>