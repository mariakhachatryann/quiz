export default {
    gameOptions(store) {
        return store.gameOptions
    },
    questions(store) {
        return store.questions
    },
    scores(store) {
        return store.scores
    },
    users(state) {
        return state.users
    },
    currentUser(state) {
        return state.currentUser
    },
    token(state) {
        return state.currentUser.token
    },
    isAuthenticated(state) {
        return !!state.currentUser.token
    },
    saveData(state) {
        return state.saveData
    }
}