<template>
    <div class="close-btn" @click="close">
        <i class="fa-solid fa-xmark fa-lg"></i>
    </div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <form @submit.prevent="submitForm" v-else>
        <div class="form-control">
            <label for="email">E-Mail</label>
            <input class="text-[#2c3e50]" type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
            <label for="pass">Password</label>
            <input class="text-[#2c3e50]" type="password" id="pass" v-model.trim="password"/>
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 charachters long).</p>
        <button class="sign-btn">Log In</button>
	</form>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            formIsValid: true,
            isLoading: false,
            error: null
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true
            
            if (this.email === "" || !this.email.includes("@") || this.password.length < 6) {
                this.formIsValid = false;
                return;
            } else {
                this.isLoading = true
                try {
                    const users = this.$store.getters.users
                    const nick = users.filter(user => user.email === this.email)
                    await this.$store.dispatch("register", {
                        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4vf3e5B-Xgo_1LMmQcv-in_nCbsCENCY",
                        nickname: nick[0].nickname,
                        email: this.email,
                        password: this.password
                    })
                    this.$router.replace("/options")
                    
                } catch (err) {
                    this.error = "Failed to authenticate, check your email and password or try again later."
                }
                
                this.isLoading = false
                this.email = ""
                this.password = ""
            }
        },
        handleError() {
            this.error = null;
        },
        close() {
            this.$router.replace("/")
        }
    }
}
</script>

<style>
.close-btn {
    position: absolute;
    top: 12px;
    right: 22px;
    cursor: pointer;
    font-size: 22px;
    color: #76B1BD;
    border-radius: 6px;
    width: 27px;
}

.close-btn:hover {
    background-color: #76B1BD;
    color: #2c3e50;
    transition: 0.3s;
}

</style>