<template>
    <base-dialog :show="logOutDialog" type="out" title="Confirmation" @yes="logout" @no="notLogout">
        <p>Are you sure you want to log out ?</p>
    </base-dialog>
    <base-dialog :show="showWarning" type="warning" title="Warning !!!" @close="closeWarning">
        <p>All options are required to be selected manually !</p>
    </base-dialog>
    <div class="inline-block absolute left-[35px] top-[15px]">
        <button class="w-[65px] h-[22px] text-[22px] rounded-md cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300 fa-solid fa-arrow-right-from-bracket" v-if="isAuthenticated" @click="showLogoutDialog" ></button>
        <button class="w-[65px] h-[22px] text-[22px] rounded-md cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300  fa-solid fa-solid fa-arrow-left-long" v-else @click="goBack" ></button>
    </div>
    <div class="inline-block absolute right-[20px] top-[15px]" v-if="isAuthenticated">
        <router-link to="/scores">
            <button class="w-[145px] h-[27px] text-lg rounded-md cursor-pointer  bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300">Scoreboard</button>
        </router-link>
    </div>
    <div class="flex flex-col justify-center items-center h-full">
        <p v-if="isAuthenticated" class="text-[25px] mb-[10px]">Welcome {{ $store.state.currentUser.nickname }}</p>
        <p class="text-[50px]">Choose game options</p>
        <topic-option @topic-updated="handleTopicUpdate"></topic-option>
        <quantity-option @quantity-updated="handleQuantityUpdate"></quantity-option>
        <duration-option @duration-updated="handleDurationUpdate"></duration-option>
        <button class="w-[300px] h-[35px] rounded-md border-none text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100 items-center" @click="checkOptions">Let's Go</button>
    </div>
</template>

<script setup>
import TopicOption from "@/components/TopicOption.vue";
import QuantityOption from "@/components/QuantityOption.vue";
import DurationOption from "@/components/DurationOption.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";

import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let showWarning = ref(false);
let logOutDialog = ref(false);

onMounted(() => {
    console.log(store.getters.currentUser);
    store.dispatch("getUsers");
    store.commit("removeOptions");
    store.commit("removeQuestions");
})

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const options = computed(() => store.getters.gameOptions);

const handleTopicUpdate = (newTopic) => store.commit("changeTopic", newTopic);
const handleQuantityUpdate = (newQuantity) => store.commit("changeQuantity", newQuantity);
const handleDurationUpdate = (newDuration) => store.commit("changeDuration", newDuration);

const checkOptions = () => {
    if (!options.value.topic.hasOwnProperty("value") || !options.value.duration) {
        showWarning.value = true
    } else {
        router.replace("/questions")
    }
}

const showLogoutDialog = () => logOutDialog.value = true;
const logout = () => {
    localStorage.setItem("saveData", "no")
    store.dispatch("logout")
    router.replace("/main")
}
const notLogout = () => {
    logOutDialog.value = false;
}

const goBack = () => router.replace("/main");
const closeWarning = () => {
    showWarning.value = false;
}
</script>