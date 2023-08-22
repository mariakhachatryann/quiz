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
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="email" id="email" v-model.trim="user.email" />
        </div>
        <div class="my-6">
            <label class="block font-bold text-[22px] mb-2" for="pass">Password</label>
            <input class="w-[300px] border border-solid border-cyanCust-200 bg-cyanCust-100 text-[17px] text-[#2c3e50] focus:bg-[#a9cfd6] focus:outline-none focus:border-cyanCust-200" type="password" id="pass" v-model.trim="user.password"/>
        </div>
        <p v-if="!formIsValid">Failed to authenticate. Check your email and password or try again later.</p>
        <button class="w-[140px] h-[35px] rounded-md border-none mt-[15px] text-[18px] cursor-pointer bg-cyanCust-200 text-cyanCust-100 hover:bg-cyanCust-100 hover:text-cyanCust-200 hover:duration-300">Log In</button>
	</form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = reactive({
    email: "",
    password: ""
})

const formIsValid = ref(true);
const isLoading = ref(false);
const error = ref(null);

const submitForm = async () => {
    formIsValid.value = true

    if (user.email === "" || !user.email.includes("@") || user.password.length < 6) {
        formIsValid.value = false;
        return;
    } else {
        isLoading.value = true
        try {
            const users = store.getters.users;
            const nick = users.filter(us => us.email === user.email)
            await store.dispatch("register", {
                url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4vf3e5B-Xgo_1LMmQcv-in_nCbsCENCY",
                nickname: nick[0].nickname,
                email: user.email,
                password: user.password
            })
            router.replace("/options")
            
        } catch (err) {
            error.value = "Failed to authenticate, check your email and password or try again later."
        }
        
        isLoading.value = false
        user.email = ""
        user.password = ""  
    }
}

const handleError = () => {
    error.value = null;
}

const close = () => {
    router.replace("/")
}
</script>