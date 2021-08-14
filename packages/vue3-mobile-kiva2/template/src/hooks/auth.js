import {computed} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

export function useUser() {
    const store = useStore();
    return computed(() => store.state.auth.userInfo);
}

export function useLogout() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    return {
        go() {
            store.dispatch("auth/logoutAsync").finally(() => {
                if (route.meta.requiresAuth) {
                    router.replace({path: "/login"});
                }
            });
        }
    };
}
