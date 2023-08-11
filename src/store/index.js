import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
    state: {
        gameOptions: {
            topic: {},
            questQnt: 10,
            duration: ""
        },
        questions: [],
        scores: 0,
        users: [],
        currentUser: {
            scores: null,
            nickname: null,
            userId: null,
            token: null,
            tokenExpiration: null
        },
        saveData: "yes"
    },
    mutations,
    actions,
    getters
})
