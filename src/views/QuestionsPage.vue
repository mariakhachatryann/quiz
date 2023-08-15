<template>
    <div @click="leaveGameText = true" class="absolute top-5 left-5 text-3xl cursor-pointer">
        <i class="fa-solid fa-hand-point-left"></i>
    </div>
    <base-dialog :show="leaveGameText" type="out" title="Confirmation" @yes="yes" @no="no">
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
            <button class="w-[270px] h-[30px] items-center rounded-md m-2 text-lg cursor-pointer bg-cyanCust-200 text-cyanCust-100  hover:text-cyanCust-200 hover:bg-cyanCust-100 hover:duration-300" @click="countScores(opt)" v-for="opt in questions[questionState].options" :key="opt" v-html="opt.option"></button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showSpinner: true,
            questionState: -1,
            time: "",
            questionEndTime: null,
            intervalId: null,
            showRight: false,
            showFalse: false,
            leaveGameText: false
        };
    },
    async beforeMount() {
        await this.$store.dispatch("getQuestions");
        this.showSpinner = false;
        this.changeQuestion();
    },
    beforeDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },
    computed: {
        questions() {
            return this.$store.getters.questions;
        },
        options() {
            return this.$store.getters.gameOptions;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        changeQuestion() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }

            if ((this.questionState + 2) > this.options.questQnt) {
                this.$router.replace("/scores")
                return;
            } else {
                this.questionState++;
            }

            switch (this.options.duration) {
                case "1": this.questionEndTime = new Date(new Date().getTime() + 1.01 * 60 * 1000); break;
                case "1.5": this.questionEndTime = new Date(new Date().getTime() + 1.501 * 60 * 1000); break;
                case "2": this.questionEndTime = new Date(new Date().getTime() + 2.01 * 60 * 1000); break;
                case "0.5": this.questionEndTime = new Date(new Date().getTime() + 30.5 * 1000); break;
            }
            
            this.manageTime();
            this.intervalId = setInterval(this.manageTime, 1000);
        },
        manageTime() {
            if (!this.questionEndTime) return;
            
            if (!this.leaveGameText) {
                const currentTime = new Date();
                const timeDiff = this.questionEndTime - currentTime;
                
                if ( timeDiff <= 0) {
                    this.countScores({isRight: false})
                } else {
                    const remainingMinutes = Math.floor(timeDiff / 1000 / 60) % 60;
                    const remainingSeconds = Math.floor(timeDiff / 1000) % 60;

                    this.time = `${remainingMinutes.toString().padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
                }
            }
        },
        countScores(obj) {
                if (this.isAuthenticated) {
                    this.$store.dispatch("manageScores", { operation: obj.isRight ? "add" : "remove" })
                } else {
                    if (obj.isRight) {
                        this.$store.commit("addScores")
                    }
                }
                setTimeout(() => {
                    this.time = ""
                    obj.isRight ? this.showRight = true : this.showFalse = true
                    
                    setTimeout(() => {
                        obj.isRight ? this.showRight = false : this.showFalse = false
                    }, 1000);
                    this.changeQuestion()
                }, 500);
        },
        no() {
            this.leaveGameText = false
        },
        yes() {
            this.$router.replace("/options")
        }
    }
};
</script>