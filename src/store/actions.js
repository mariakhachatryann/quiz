export default {
    async getQuestions(context) {
        try {
            const response = await fetch(`http://localhost:3000/questions`);
            const responseData = await response.json();
            context.commit("getQuestions", responseData);      
        } catch (err) {
            console.error("Something went wrong")
        }
    },
    async register(context, payload) {
        const response = await fetch(payload.url, {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to authenticate, check your email and password or try again later.");
            throw error
        }

        console.log(responseData);
        localStorage.setItem("token", responseData.idToken)
        localStorage.setItem("userId", responseData.localId)
        localStorage.setItem("nickname", payload.nickname)

        context.commit("setUser", {
            nickname: payload.nickname,
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    async getUsers(context) {
        const data = await fetch("https://quiz-fb4ae-default-rtdb.firebaseio.com/users.json");
        const responseData = await data.json()
        context.commit("getUsers", responseData)
    },
    logout(context) {
        context.commit("setUser", {
            nickname: null,
            token: null,
            userId: null,
            tokenExpiration: null
        })
    },
    autoLogin(context) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const nickname = localStorage.getItem("nickname")

        if (token && userId) {
            context.commit("setUser", {
                nickname: nickname,
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        }
    },
    addUser(_, payload) {
        fetch("https://quiz-fb4ae-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            body: JSON.stringify(payload)
        })
    },
    async manageScores(context, payload) {
        const allUsers = context.getters.users
        const currentuser = allUsers.filter(user => user.nickname === context.state.currentUser.nickname)
        const users = allUsers.filter(user => user.nickname !== context.state.currentUser.nickname)
        payload.operation === "add" ? currentuser[0].scores++ : currentuser[0].scores--
        console.log(currentuser[0].scores);
        users.push(currentuser[0])
        console.log(users);
        await fetch("https://quiz-fb4ae-default-rtdb.firebaseio.com/users.json", {
            method: "PUT",
            body: JSON.stringify({...users})
        })
    }
}