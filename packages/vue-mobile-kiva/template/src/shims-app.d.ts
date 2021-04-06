import {AxiosInstance} from "axios";

declare module "vue/types/vue" {
    import Vue from "vue";

    interface Vue {
        $http: AxiosInstance
    }
}
