<template>
    <div class="option-block">
        <h2 class="option-block-title">Select the topic</h2>
        <div class="options">
            <select name="" id="" class="option-select" v-model="topic">
                <option disabled value="">Please select one</option>
                <option v-for="(option, index) in topicOptions" :key="index" :value="option">{{ option.label }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topic: "",
        };
    },
    computed: {
        topicOptions() {
            return [
                { value: 0, label: "General Knowledge" },
                { value: 1, label: "Entertainment: Books" },
                { value: 2, label: "Entertainment: Film" },
                { value: 3, label: "Entertainment: Music" },
                { value: 4, label: "History" },
                { value: 5, label: "Geography" },
                { value: 6, label: "Animals" },
                { value: 7, label: "Sports" },
                // { value: 13, label: "Entertainment: Musicals & Theatres" },
                // { value: 14, label: "Entertainment: Television" },
                // { value: 15, label: "Entertainment: Video Games" },
                // { value: 16, label: "Entertainment: Board Games" },
                // { value: 17, label: "Science & Nature" },
                // { value: 18, label: "Science: Computers" },
                // { value: 19, label: "Science: Mathematics" },
                // { value: 20, label: "Mythology" },
                // { value: 24, label: "Politics" },
                // { value: 25, label: "Art" },
                // { value: 26, label: "Celebrities" },
                // { value: 28, label: "Vehicles" },
                // { value: 29, label: "Entertainment: Comics" },
                // { value: 30, label: "Science: Gadgets" },
                // { value: 31, label: "Entertainment: Japanese Anime & Manga" },
                // { value: 32, label: "Entertainment: Cartoon & Animations" },
            ];
        },
    },
    watch: {
        topic(newTopic) {
            this.$emit("topic-updated", newTopic);
        },
    },
};
</script>
