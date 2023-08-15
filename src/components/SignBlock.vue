<template>
    <div class="absolute top-3 right-[22px] w-[27px] cursor-pointer text-[22px] text-cyanCust-100 rounded-md hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300" @click="close">
        <i class="fa-solid fa-xmark fa-lg"></i>
    </div>
    <base-dialog :show="isSignedUp" title="Authentication" @close="closeMessage">
        <p>You have signed up and now you can refresh the page and log in.</p>
    </base-dialog>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <form @submit.prevent="submitForm" v-else>
        <div class="my-6">
            <label class="block font-bold text-[22px] mb-2" for="nickname">Nickname</label>
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="text" id="nickname" v-model.trim="nickname" />
        </div>
        <div class="my-6">
            <label class="block font-bold text-[22px] mb-2" for="email">E-Mail</label>
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="email" id="email" v-model.trim="email" />
        </div>
        <div class="my-6">
            <label class="block font-bold text-[22px] mb-2" for="pass">Password</label>
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="password" id="pass" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">All options are required to be selected (password must be at least 6 charachters).</p>
        <button class="w-[140px] h-[35px] rounded-md border-none mt-[15px] text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300">Sign Up</button>
	</form>
</template>

<script>
import BaseDialog from './ui/BaseDialog.vue';
export default {
  components: { BaseDialog },
    data() {
        return {
            nickname: "",
            email: "",
            password: "",
            formIsValid: true,
            isLoading: false,
            isSignedUp: false,
            error: null
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.nickname.val === "" || this.email === "" || !this.email.includes("@") || this.password.length < 6 ) {
                this.formIsValid = false;
            } else {
                this.isLoading = true
                try {
                    await this.$store.dispatch("register", {
                        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4vf3e5B-Xgo_1LMmQcv-in_nCbsCENCY",
                        nickname: this.nickname,
                        email: this.email,
                        password: this.password
                    })

                    this.$store.dispatch("addUser", {
                        nickname: this.nickname,
                        email: this.email,
                        scores: 0
                    })

                    this.isSignedUp = true
                } catch (err) {
                    this.error = err.message || "Failed to authenticate, try later."
                }
                this.isLoading = false
                this.nickname = ""
                this.email = ""
                this.password = ""   
                
        console.log(this.$store.getters.currentUser);
                
            }
        },
        close() {
            this.$router.replace("/")
        },
        closeMessage() {
            this.isSignedUp = false
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>