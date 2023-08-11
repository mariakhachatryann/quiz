<template>
    <teleport to="body">
        <div v-if="show" @click="tryClose" class="backdrop"></div>
        <transition name="dialog">
            <dialog open v-if="show">
                <header>
                    <slot name="header">
                        <h2>{{ title }}</h2>
                    </slot>
                </header>
                <section>
                    <slot></slot>
                </section>
                <menu v-if="!fixed && type === 'warning'">
                    <slot name="actions">
                        <button @click="tryClose">Close</button>
                    </slot>
                </menu>
                <menu v-if="!fixed && type !== 'warning'">
                    <slot name="actions">
                        <button class="yes-btn" @click="yes">Yes</button>
                        <button class="no-btn" @click="no">No</button>
                    </slot>
                </menu>
            </dialog>
        </transition>
    </teleport>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        fixed: {
            type: Boolean,
            required: false,
            default: false,
        },
        type: {
            type: String,
            required: false,
            default: "warning" 
        }
    },
    emits: ["close", "no", "yes"],
    methods: {
        tryClose() {
            if (this.fixed) {
                return;
            }
            this.$emit("close");
        },
        no() {
            if (this.fixed) {
                return;
            }
            this.$emit("no");
        },
        yes() {
            if (this.fixed) {
                return;
            }
            this.$emit("yes");
        }
    },
};
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
}

dialog {
    position: fixed;
    top: 35vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: #76B1BD;
}

header {
    background-color: #2c3e50;
    color: white;
    width: 100%;
    padding: 1rem;
}

header h2 {
    margin: 0;
}

section {
    padding: 1rem;
}

menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}

button {
    width: 100px;
    height: 20px;
    font-size: 16px;
    border-radius: 6px;
	border: none;
	cursor: pointer;
	background-color: #2c3e50;
    color: aliceblue;
    margin-right: 7px;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.dialog-enter-active {
    transition: all 0.3s ease-out;
}

.dialog-leave-active {
    transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: scale(1);
}

@media (min-width: 768px) {
    dialog {
        left: calc(50% - 20rem);
        width: 40rem;
    }
}
</style>