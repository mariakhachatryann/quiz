<template>
    <div class="scores-block">
        <p v-if="!showRight && !showFalse">----------</p>
        <p v-if="showRight"> + 1 </p>
        <p v-if="showFalse"> - 1 </p>
    </div>
    <base-spinner v-if="showSpinner"></base-spinner>
    <div class="quest-block" v-else-if="time && (!showRight || !showFalse)">
        <p class="quest-topic">{{ options.topic.label }}</p>
        <p class="quest-qnt">Question {{ questionState + 1 }} / {{ options.questQnt }}</p>
        <p class="quest-contdown">{{ time }}</p>
        <p class="main-quest" v-html="questions[questionState].question"></p>
        <div class="answers-block">
            <button @click="countScores(opt)" v-for="opt in questions[questionState].options" :key="opt" v-html="opt.option"></button>
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
            showFalse: false
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
            
            const currentTime = new Date();
            const timeDiff = this.questionEndTime - currentTime;
            
            if ( timeDiff <= 0) {
                this.countScores({isRight: false})
            } else {
                const remainingMinutes = Math.floor(timeDiff / 1000 / 60) % 60;
                const remainingSeconds = Math.floor(timeDiff / 1000) % 60;
                this.time = `${remainingMinutes.toString().padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
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
        }
    }
};
</script>

<style>
.scores-block {
    display: inline-block;
    margin-top: 90px;
}

.scores-block p {
    font-size: 30px;
}

.quest-block {
	display: inline-block;
    margin-top: 60px;
    background: #76B1BD;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,.26);
    padding: 1rem;
    width: 100%;
}

.quest-block .quest-topic {
    font-size: 35px;
}

.quest-block .quest-qnt {
    font-size: 33px;
    margin-top: 5px;
    margin-bottom: 15px;
}

.quest-block .main-quest {
    font-size: 25px;
    margin-top: 17px;
    background: #76B1BD;
}

.quest-block .answers-block {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 23px;
}

.quest-block .answers-block.else {
    flex-direction: row;
}

.quest-block .answers-block button {
    width: 270px;
	height: 30px;
	border-radius: 6px;
    margin: 7px;
	border: none;
	font-size: 18px;
	cursor: pointer;
	background-color: #2c3e50;
    color: #76B1BD;
    align-items: center;
    margin-right: 7px;
}

.quest-block .answers-block button:hover {
    background-color: #76B1BD;
    color: #2c3e50;
    transition: 0.3s;
}

.quest-contdown {
    font-size: 25px;
}

/* @media screen and (max-width: 390px) {
	.quest-block {
		margin-top: 30px;
	}

    .scores-block {
        display: inline-block;
        margin-top: 40px;
    }
}

@media screen and (max-width: 450px) {
	.quest-block {
		margin-top: 30px;
	}

    .scores-block {
        display: inline-block;
        margin-top: 40px;
    }
} */

</style>