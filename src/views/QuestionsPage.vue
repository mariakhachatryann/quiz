<template>
    <div @click="showLeaveGameText" class="absolute top-5 left-5 text-3xl cursor-pointer">
        <i class="fa-solid fa-hand-point-left"></i>
    </div>
    <base-dialog :show="leaveGameText" type="out" title="Confirmation" @yes="leaveGame" @no="notLeave">
        <p>Are you sure you want to leave current game ?</p>
    </base-dialog>
    <div class="inline-block mt-[60px]">
        <p class="text-3xl" v-if="!showRight && !showFalse">----------</p>
        <p class="text-3xl" v-if="showRight"> + 1 </p>
        <p class="text-3xl" v-if="showFalse"> - 1 </p>
    </div>
    <base-spinner v-if="showSpinner"></base-spinner>
    <div class="inline-block mt-[60px] bg-cyanCust-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,.26)] p-4 w-full" v-else-if="time && (!showRight || !showFalse)">
        <p class="text-4xl">{{ options.topic.label }}</p>
        <p class="text-[33px] m-1.5 mb-4">Question {{ questionState + 1 }} / {{ options.questQnt }}</p>
        <p class="text-[25px]">{{ time }}</p>
        <p class="text-[25px] mt-[17px]" v-html="questions[questionState].question"></p>
        <div class="flex justify-center items-center flex-col mt-[23px]">
            <button class="w-[270px] h-[30px] items-center rounded-md m-2 text-lg cursor-pointer bg-cyanCust-200 text-cyanCust-100  md:hover:text-cyanCust-200 md:hover:bg-cyanCust-100 md:hover:duration-300" @click="countScores(opt)" v-for="opt in questions[questionState].options" :key="opt" v-html="opt.option"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let showSpinner = ref(true);
let questionState = ref(-1);
let time = ref("");
let questionEndTime = ref(null);
let intervalId = ref(null);
let showRight = ref(false);
let showFalse = ref(false);
let leaveGameText = ref(false);

onBeforeMount(async () => {
    await store.dispatch("getQuestions");
    showSpinner.value = false;
    changeQuestion()
})

onBeforeUnmount(() => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }
})

const questions = computed(() => store.getters.questions )
const options = computed(() => store.getters.gameOptions )
const isAuthenticated = computed(() => store.getters.isAuthenticated )

const changeQuestion = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }

    if ((questionState.value + 2) > options.value.questQnt) {
        router.replace("/scores")
        return;
    } else {
        questionState.value++;
    }

    switch (options.value.duration) {
        case "1": questionEndTime.value = new Date(new Date().getTime() + 1.01 * 60 * 1000); break;
        case "1.5": questionEndTime.value = new Date(new Date().getTime() + 1.501 * 60 * 1000); break;
        case "2": questionEndTime.value = new Date(new Date().getTime() + 2.01 * 60 * 1000); break;
        case "0.5": questionEndTime.value = new Date(new Date().getTime() + 30.5 * 1000); break;
    }
    
    manageTime();
    intervalId.value = setInterval(manageTime, 1000);
}

const manageTime = () => {
    if (!questionEndTime.value) return;
            
    if (!leaveGameText.value) {
        const currentTime = new Date();
        const timeDiff = questionEndTime.value - currentTime;
        
        if ( timeDiff <= 0) {
            countScores({isRight: false})
        } else {
            const remainingMinutes = Math.floor(timeDiff / 1000 / 60) % 60;
            const remainingSeconds = Math.floor(timeDiff / 1000) % 60;

            time.value = `${remainingMinutes.toString().padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
        }
    }
}

const countScores = (obj) => {
    if (isAuthenticated.value) {
        store.dispatch("manageScores", { operation: obj.isRight ? "add" : "remove" })
    } else {
        if (obj.isRight) {
            store.commit("addScores")
        }
    }
    setTimeout(() => {
        time.value = ""
        obj.isRight ? showRight.value = true : showFalse.value = true

        setTimeout(() => {
            obj.isRight ? showRight.value = false : showFalse.value = false
        }, 1000);

        changeQuestion()
    }, 500);
}

const showLeaveGameText = () => {
    leaveGameText.value = true
}

const leaveGame = () => {
    router.replace("/options")
}

const notLeave = () => {
    leaveGameText.value = false
}

</script>