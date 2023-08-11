import { createRouter, createWebHashHistory } from "vue-router";

import MainPage from "@/views/MainPage.vue";
import SelectOptions from "@/views/SelectOptions.vue";
import QuestionsPage from "@/views/QuestionsPage.vue";
import ScoresPage from "@/views/ScoresPage.vue";
import RegisterForm from "@/components/RegisterBlock.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    { path: "/", redirect: "/main"},
    { path: "/main", component: MainPage, children: [ { path: "auth", component: RegisterForm} ] },
    { path: "/options", component: SelectOptions },
    { path: "/questions", component: QuestionsPage },
    { path: "/scores", component: ScoresPage },
    { path: "/:notFound(.*)", component: NotFound }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
