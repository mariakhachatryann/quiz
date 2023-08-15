<template>
<div class="inline-block h-full w-full">
    <div class="mt-12 md:mt-64 bg-cyanCust-100 w-full p-5 md:p-10" v-if="!isAuthenticated">
      <p class="text-xl md:text-2xl mb-2 md:mb-4">You have earned {{ scores }} scores out of {{ questQnt }} questions.</p>
      <p class="text-base md:text-xl mb-1 md:mb-1.5">Your results will not be saved unless you are registered....</p>
      <p class="text-sm md:text-base">Check out our
        <router-link class="underline" to="/">Main Page</router-link>
        to sign up / log in to save your game's data.
      </p>
    </div>
    <div v-else class="mt-6 md:mt-[90px] inline-block items-center">
      <p class="mb-6 md:mb-[70px] text-xl md:text-3xl bg-cyanCust-100 rounded-md hover:bg-cyanCust-200 hover:text-cyanCust-100 hover:duration-300">Results Board</p>
            <table class="border-collapse w-full md:w-[600px] h-[100px] md:h-auto">
                <tr class="bg-[#a8e2ee] hover:bg-cyanCust-100 duration-300">
                    <th class="p-2 text-xl py-3 text-center bg-cyanCust-200 text-white">Nickname</th>
                    <th class="p-2 text-xl py-3 text-center bg-cyanCust-200 text-white">Scores</th>
                </tr>
                <tr class="bg-[#a8e2ee] hover:bg-cyanCust-100 duration-300" v-for="user in users" :key="user.nickname">
                    <td class="p-2 text-xl">{{ user.nickname }}</td>
                    <td class="p-2 text-xl">{{ user.scores }} </td>
                </tr>
            </table>
            <div class="rounded-md hover:bg-cyanCust-200 hover:text-cyanCust-100 hover:duration-300">
                <p class="text-base md:text-xl mt-6 md:mt-[50px] bg-cyanCust-100 p-1 rounded-md hover:bg-cyanCust-200 hover:text-cyanCust-100 hover:duration-300">
                Go to
                <router-link class="underline hover:bg-cyanCust-200 hover:text-cyanCust-100 hover:duration-300" to="/options">Options Page</router-link>
                to play another game...
                </p>
            </div>
            <router-link to="/answers">
                <p v-if="questions.length > 2" class="cursor-pointer text-base md:text-xl mt-4 md:mt-[25px] bg-cyanCust-100 p-1 rounded-md hover:bg-cyanCust-200 hover:text-cyanCust-100 hover:duration-300">See Right Answers</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAnswers: false
        }
    },
    mounted() {
        if (this.isAuthenticated) {
            this.$store.dispatch("getUsers")
            console.log(this.$store.getters.users);
        }
    },
    computed: {
        users() {
            const realUsers = this.$store.getters.users
            const sortedArr = realUsers.sort((a, b) => b.scores - a.scores);
            return sortedArr
        },
        scores() {
            return this.$store.getters.scores
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        questQnt() {
            return this.$store.getters.gameOptions.questQnt
        },
        questions() {
            return this.$store.getters.questions
        }
    }
}
</script>

<style scoped>

@media screen and (max-width: 480px) {
    .results-text {
        font-size: 20px;
    }

    #table-container {
        align-items: center;
    }
    
    #table-container table {
        border-collapse: collapse;
        margin-left: 50px;
        width: 300px;
        height: 50px;
    }   

    th, td {
        font-size: 16px;
        padding: 6px;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
    .results-text {
        font-size: 22px;
    }

    #table-container table {
        border-collapse: collapse;
        width: 300px;
        height: 50px;
        margin-left: 70px;

    }   

    th, td {
        font-size: 18px;
        padding: 8px;
    }
}

@media screen and (min-width: 769px) {
    .results-text {
        font-size: 26px;
    }

    th, td {
        font-size: 20px;
        padding: 10px;
    }
}
</style>