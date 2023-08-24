<template>
<div class="inline-block h-full w-full">
    <div class="mt-64 bg-cyanCust-100 w-full p-10 max-[450px]:mt-[50px] max-[450px]:text-9xl" v-if="!isAuthenticated">
      <p class="text-2xl md:text-2xl mb-2 md:mb-4 max-[450px]:text-lg">You have earned {{ scores }} scores out of {{ questQnt }} questions.</p>
      <p class="text-xl mb-1 md:mb-1.5 max-[450px]:text-lg">Your results will not be saved unless you are registered....</p>
      <p class="text-xl max-[450px]:text-lg">Check out our
        <router-link class="underline max-[450px]:text-lg" to="/">Main Page</router-link>
        to sign up / log in to save your game's data.
      </p>
    </div>
    <div v-else class="mt-6 md:mt-[90px] inline-block items-center">
      <p class="mb-6 md:mb-[70px] text-xl md:text-3xl bg-cyanCust-100 rounded-md md:hover:bg-cyanCust-200 md:hover:text-cyanCust-100 md:hover:duration-300">Results Board</p>
            <table class="border-collapse w-full md:w-[600px] h-[100px] md:h-auto">
                <tr class="bg-[#a8e2ee] md:hover:bg-cyanCust-100 duration-300">
                    <th class="p-2 text-xl py-3 text-center bg-cyanCust-200 text-white">Nickname</th>
                    <th class="p-2 text-xl py-3 text-center bg-cyanCust-200 text-white">Scores</th>
                </tr>
                <tr class="bg-[#a8e2ee] md:hover:bg-cyanCust-100 duration-300" v-for="user in users" :key="user.nickname">
                    <td class="p-2 text-xl">{{ user.nickname }}</td>
                    <td class="p-2 text-xl">{{ user.scores }} </td>
                </tr>
            </table>
            <div class="rounded-md md:hover:bg-cyanCust-200 md:hover:text-cyanCust-100 md:hover:duration-300">
                <p class="text-base md:text-xl mt-6 md:mt-[50px] bg-cyanCust-100 p-1 rounded-md md:hover:bg-cyanCust-200 md:hover:text-cyanCust-100 md:hover:duration-300">
                Go to
                <router-link class="underline md:hover:bg-cyanCust-200 md:hover:text-cyanCust-100 md:hover:duration-300" to="/options">Options Page</router-link>
                to play another game...
                </p>
            </div>
            <router-link to="/answers">
                <p v-if="questions.length > 2" class="cursor-pointer text-base md:text-xl mt-4 md:mt-[25px] bg-cyanCust-100 p-1 rounded-md md:hover:bg-cyanCust-200 md:hover:text-cyanCust-100 md:hover:duration-300">See Right Answers</p>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted , computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const users = computed(() => {
    const realUsers = store.getters.users;
    const sortedUsers = realUsers.sort((a, b) => b.scores - a.scores);
    return sortedUsers;
})

const questions = computed(() => {
    return store.getters.questions;
})

const scores = computed(() => {
    return store.getters.scores;
})

const isAuthenticated = computed(function() {
    return store.getters.isAuthenticated;
})

const questQnt = computed(() => {
    return store.getters.gameOptions.questQnt;
})

onMounted(() => {
    if (isAuthenticated) {
        store.dispatch("getUsers")
        console.log(store.getters.users);
    }
})
</script>