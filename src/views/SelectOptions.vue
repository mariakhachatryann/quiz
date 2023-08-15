<template>
    <base-dialog :show="logOutDialog" type="out" title="Confirmation" @yes="yes" @no="no">
        <p>Are you sure you want to log out ?</p>
    </base-dialog>
    <base-dialog :show="showWarning" type="warning" title="Warning !!!" @close="close">
        <p>All options are required to be selected manually !</p>
    </base-dialog>
    <div class="inline-block absolute left-[35px] top-[15px]">
        <button class="w-[65px] h-[22px] text-[22px] rounded-md cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300 fa-solid fa-arrow-right-from-bracket" v-if="isAuthenticated" @click="logout" ></button>
        <button class="w-[65px] h-[22px] text-[22px] rounded-md cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300  fa-solid fa-solid fa-arrow-left-long" v-else @click="back" ></button>
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

<script>
import TopicOption from "@/components/TopicOption.vue";
import QuantityOption from "@/components/QuantityOption.vue";
import DurationOption from "@/components/DurationOption.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";

export default {
    data() {
        return {
            showWarning: false,
            logOutDialog: false
        }
    },
    components: { TopicOption, QuantityOption, DurationOption, BaseDialog },
    mounted() {
        console.log(this.$store.getters.currentUser);
        this.$store.dispatch("getUsers")
        this.$store.commit("removeOptions")
        this.$store.commit("removeQuestions")
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    },
	methods: {
        handleTopicUpdate(newTopic) {
            this.$store.commit("changeTopic", newTopic);
        },
        handleQuantityUpdate(newQuantity) {
            this.$store.commit("changeQuantity", newQuantity);
        },
        handleDurationUpdate(newDuration) {
            this.$store.commit("changeDuration", newDuration);
        },
        checkOptions() {
            const options = this.$store.getters.gameOptions;

            if (!options.topic.hasOwnProperty("value") || !options.duration) {
                this.showWarning = true
            } else {
                this.$router.replace("/questions")
            }
        },
        logout() {
            this.logOutDialog = true
        },
        back() {
            this.$router.replace("/main")
        },
        yes() {
            localStorage.setItem("saveData", "no")
            this.$store.dispatch("logout")
            this.$router.replace("/main")
        },
        no() {
            this.logOutDialog = false
        },
        close() {
            this.showWarning = false
        }
    },
}
</script>