<template>
    <div class="block">
        <h2 class="not-found">Page not found.</h2>
        <p class="not-found-text"> This page could not be found - maybe check out our 
            <router-link to="/" >Main Page</router-link>
        </p>
    </div>
</template>

<style scoped>
.block {
    display: inline-block;
    margin-top: 270px;
    background: #76B1BD;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,.26);
    padding: 45px;
    width: 100%;
}

.block .not-found {
    font-size: 28px;
    margin-bottom: 10px;
}

.block .not-found-text {
    font-size: 18px;
}

.block .not-found-text a {
    color: #2c3e50;
}
</style>