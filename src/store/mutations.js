export default {
    changeTopic(state, newTopic) {
        state.gameOptions.topic = newTopic
    },
    changeQuantity(state, newQuantity) {
        state.gameOptions.questQnt = newQuantity
    },
    changeType(state, newType) {
        state.gameOptions.type = newType
    },
    changeDifficulty(state, newDifficulty) {
        state.gameOptions.difficulty = newDifficulty
    },
    changeDuration(state, newDuration) {
        state.gameOptions.duration = newDuration
    },
    getQuestions(state, newList) {
        let rndIndex = Math.floor(Math.random() * (newList[state.gameOptions.topic.value][0].quantity  - 30))
        state.questions = newList[state.gameOptions.topic.value].splice(rndIndex, state.gameOptions.questQnt)
        .map(questBlock => {
            for (let opt in questBlock.options) {
                questBlock.options[opt] = {
                    option: questBlock.options[opt],
                    isRight: questBlock.options[opt] === questBlock.answer ? true : false
                } 
            }
            return questBlock
        })
        console.log(state.questions);
    },
    changeDataSave(state, payload) {
        state.saveData = payload
    },
    addScores(state) {
        state.scores++
    },
    removeScores(state) {
        state.scores--
    },
    getUsers(state, users) {
        state.users = []
        for ( let obj in users ) {
            state.users.push(users[obj])
        }
    },
    setUser(state, payload) {
        state.currentUser.nickname = payload.nickname
        state.currentUser.token = payload.token
        state.currentUser.userId = payload.userId
        state.currentUser.tokenExpiration = payload.tokenExpiration
    },
    removeOptions(state) {
        state.scores = 0
		state.gameOptions = {
			topic: {},
            questQnt: 10,
            duration: ""
		}
    },
    removeQuestions(state) {
        state.questions = []
    }
}