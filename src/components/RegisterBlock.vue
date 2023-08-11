<template>
	<div class="form-wrapper">
		<h2 class="form-title">
            <span @click="block = 'SignBlock'">Sign Up</span> / <span @click="block = 'LogBlock'">Log In</span>
        </h2>
		<component :is="block"></component>
	</div>
</template>

<script>
import LogBlock from "./LogBlock.vue";
import SignBlock from "./SignBlock.vue";

export default {
    components: {
        LogBlock, SignBlock
    },
    data() {
        return {
            block: "SignBlock"
        }
    }
}
</script>

<style>
.form-wrapper {
    position: fixed;
    z-index: 100;
    width: 450px;
    padding: 45px;
    border-radius: 6px;
    border: none;
    align-items: center;
    background-color: #2c3e50;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    color: #76B1BD;
}

.form-title {
    font-size: 40px;
    margin-bottom: 20px;
}

.form-title span {
    cursor: pointer;
}

.form-control {
    margin: 1.5rem 0;
}

.sign-btn {
    width: 140px;
    height: 35px;
    border-radius: 6px;
    border: none;
    margin-top: 15px;
    font-size: 18px;
    cursor: pointer;
    background-color: #2c3e50;
    color: #76B1BD;
}

.sign-btn:hover {
    transition: 0.4s;
    background: #76B1BD;
    color: #2c3e50;
}

label {
    font-weight: bold;
    font-size: 22px;
    display: block;
    margin-bottom: 0.5rem;
}

input {
    /* display: block; */
    width: 300px;
    border: 1px solid #2c3e50;
    background-color: #a9cfd6;
    font-size: 17px;
}

input:focus {
    background-color: #a9cfd6;
    outline: none;
    border-color: #2c3e50;
}
</style>