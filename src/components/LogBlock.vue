<template>
    <div class="absolute top-3 right-[22px] w-[27px] cursor-pointer text-[22px] text-cyanCust-100 rounded-md hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300" @click="close">
        <i class="fa-solid fa-xmark fa-lg"></i>
    </div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <form @submit.prevent="submitForm" v-else>
        <div class="my-6">
            <label class="block font-bold text-[22px] mb-2" for="email">E-Mail</label>
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="email" id="email" v-model.trim="email" />
        </div>
        <div class="my-6">
            <label class="block font-bold text-[22px] mb-2" for="pass">Password</label>
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="password" id="pass" v-model.trim="password"/>
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 charachters long).</p>
        <button class="w-[140px] h-[35px] rounded-md border-none mt-[15px] text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300">Log In</button>
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

