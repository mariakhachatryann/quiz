<template>
    <div class="scores-container">
        <div v-if="!isAuthenticated" class="scores-block">
            <p class="scores-text">You have earned {{ scores }} scores of {{ questQnt }} questions.</p>
            <p class="scores-text-smaller">Your results will not be saved unless you are registered....</p>
            <p class="scores-register-text"> Check out our 
                <router-link to="/" >Main Page</router-link>
                to sign up / log in to save your game's data.
            </p>
        </div>
        <div v-else id="table-container">
            <p class="results-text">Results Board</p>
            <table>
                <tr>
                    <th>Nickname</th>
                    <th>Scores</th>
                </tr>
                <tr v-for="user in users" :key="user.nickname">
                    <td>{{ user.nickname }}</td>
                    <td>{{ user.scores }}</td>
                </tr>
            </table>

            <div class="options-link-container">
                <p class="options-page-text"> Go to 
                    <router-link class="router-link" to="/options">Options Page</router-link> 
                    to play another game...
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
        }
    }
}
</script>

<style scoped>
.scores-container {
    height: 100%;
}

.scores-block {
    margin-top: 260px;
    background: #76B1BD;
    width: 100%;
    padding: 40px;
}

.scores-block .scores-text {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 19px;
}

.scores-block .scores-text-smaller {
    font-size: 23px;
    margin-bottom: 5px;
}

.scores-block .scores-register-text {
    font-size: 23px;
}

.scores-block .scores-register-text a {
    color: #2c3e50;
}

#table-container {
    display: inline-block;
    margin-top: 100px;
    align-items: center;
}

#table-container .results-text {
    margin-bottom: 70px;
    font-size: 30px;
    background: #76B1BD;
    border-radius: 6px;
}

#table-container .results-text:hover {
	background-color: #2c3e50;
    color: #76B1BD;
    transition: 0.3s;
    overflow-x: auto; 
}

#table-container table {
    border-collapse: collapse;
    width: 600px;
    height: 100px;
}

#table-container td, #table-container th {
    padding: 8px;
    font-size: 20px;
}

#table-container tr {
    background: #a8e2ee;
}

#table-container tr:hover { 
    background-color: #76B1BD;
    transition: 0.3s;
}

#table-container th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #2c3e50;
    color: white;
}

.options-page-text {
    font-size: 25px;
    margin-top: 50px;
    background: #76B1BD;
    padding: 8px;
    border-radius: 6px;
}

.options-link-container:hover .options-page-text,
.options-link-container:hover .router-link {
    background-color: #2c3e50;
    color: #76B1BD;
    transition: 0.3s;
    overflow-x: auto;
}

.options-page-text a {
    color: #2c3e50;
}

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