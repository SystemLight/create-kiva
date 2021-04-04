declare module "*.vue" {
    import type {DefineComponent} from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// 声明补充VUE属性
// declare module "vue/types/vue" {
//     import Vue from "vue";
//
//     interface Vue {
//         $myProperty: string
//     }
// }

// 声明补充VUE类组件属性
// declare module "vue/types/options" {
//     interface ComponentOptions<V extends Vue> {
//         myOption?: string
//     }
// }
