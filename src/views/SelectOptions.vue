<template>
    <div class="back">
        <button v-if="isAuthenticated" @click="logout" class="back-btn fa-solid fa-arrow-right-from-bracket"></button>
        <button v-else @click="back" class="back-btn fa-solid fa-solid fa-arrow-left-long"></button>
    </div>
    <div class="score-btn" v-if="isAuthenticated">
        <router-link to="/scores">
            <button>Scoreboard</button>
        </router-link>
    </div>
    <base-dialog :show="logOutDialog" type="out" title="Confirmation" @yes="yes" @no="no">
        <p>Are you sure you want to log out ?</p>
    </base-dialog>
    <base-dialog :show="showWarning" type="warning" title="Warning !!!" @close="close">
        <p>All options are required to be selected manually !</p>
    </base-dialog>
    <div class="options-block">
        <p v-if="isAuthenticated" class="welcome-text">Welcome {{ $store.state.currentUser.nickname }}</p>
        <h2 class="title">Choose game options</h2>
        <topic-option @topic-updated="handleTopicUpdate"></topic-option>
        <quantity-option @quantity-updated="handleQuantityUpdate"></quantity-option>
        <duration-option @duration-updated="handleDurationUpdate"></duration-option>
        <button class="game-start" @click="checkOptions">Let's Go</button>
    </div>
</template>

<script>
import TopicOption from "@/components/TopicOption.vue";
import QuantityOption from "@/components/QuantityOption.vue";
import DurationOption from "@/components/DurationOption.vue";
import BaseDialog from '@/components/ui/BaseDialog.vue';

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

<style>
.back {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 15px;
    left: 35px;
}

.back-btn {
    width: 65px;
    height: 22px;
    font-size: 20px;
    border-radius: 6px;
	border: none;
	cursor: pointer;
	background-color: #2c3e50;
    color: #76B1BD;
}

.score-btn {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 15px;
}

.score-btn button {
    width: 145px;
    height: 25px;
    font-size: 18px;
    border-radius: 6px;
	border: none;
	cursor: pointer;
	background-color: #2c3e50;
    color: #76B1BD;   
}

.score-btn button:hover, .back-btn:hover {
    color: #2c3e50;
    background-color: #76B1BD;
    transition: 0.3s;  
}

.welcome-text {
    font-size: 25px;
    margin-bottom: 25px;
}

.options-block {
	display: flex;
	flex-direction: column;
    justify-content: center;
	align-items: center;
    height: 100%;
}

.options-block .title {
    font-size: 50px;
}

.options-block .option-block {
    margin-top: 40px;
}

.options-block .option-block .option-block-title {
    font-size: 33px;
}

.options-block .option-block .options {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;
}

.options-block .option-block .options div {
    margin: 15px;
}

.options-block .option-block .options input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #777;
    outline: none;
    margin-right: 8px;
    transition: border-color 0.1s ease-in-out;
}

.options-block .option-block .options input[type="radio"]:checked {
    border-color: #000;
}

.options-block .option-block .options label {
    font-size: 18px;
}

.options-block .option-block .options .option-button {
    width: 150px;
	height: 35px;
	border-radius: 6px;
	border: none;
	margin-top: 15px;
	font-size: 18px;
	cursor: pointer;
	background-color: #2c3e50;
    color: #76B1BD;
    margin: 15px 5px 0px 5px;
}

.options-block .option-block .options .option-qnt {
    width: 50px;
	height: 35px;
	border-radius: 6px;
	border: none;
	margin-top: 15px;
	font-size: 18px;
	cursor: pointer;
	background-color: #2c3e50;
    color: #76B1BD;
}

.options-block .option-block .options .option-select {
    border: none;
    color: #76B1BD;
    padding: 7px 24px;
    border-radius: 6px;
    cursor: pointer;
	background-color: #2c3e50;
    font-size: 17px;
    margin-top: 15px;
    outline: none;
}

.options-block .option-block .options .option-select.else {
    margin-bottom: 55px;
}

.options-block .game-start {
    width: 300px;
	height: 35px;
	border-radius: 6px;
	border: none;
	font-size: 18px;
	cursor: pointer;
	background-color: #2c3e50;
    color: #76B1BD;
    align-items: center;
}
</style>