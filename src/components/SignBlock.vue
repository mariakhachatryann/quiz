<template>
    <div class="close-btn" @click="close">
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
        <div class="form-control">
            <label for="nickname">Nickname</label>
            <input class="text-[#2c3e50]" type="text" id="nickname" v-model.trim="nickname" />
        </div>
        <div class="form-control">
            <label for="email">E-Mail</label>
            <input class="text-[#2c3e50]" type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
            <label for="pass">Password</label>
            <input class="text-[#2c3e50]" type="password" id="pass" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">All options are required to be selected (password must be at least 6 charachters).</p>
        <button class="sign-btn">Sign Up</button>
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