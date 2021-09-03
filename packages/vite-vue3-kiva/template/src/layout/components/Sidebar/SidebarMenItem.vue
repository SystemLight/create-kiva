<template>
    <template v-for="item in menus">
        <template v-if="item.children&&item.children.length>0">
            <el-sub-menu :index="item.index">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <app-link v-for="subItem in item.children" :to="subItem.link||''">
                    <el-menu-item :index="subItem.index">
                        {{ subItem.title }}
                    </el-menu-item>
                </app-link>
            </el-sub-menu>
        </template>

        <template v-else>
            <app-link :to="item.link||''">
                <el-menu-item :index="item.index">
                    {{ item.title }}
                </el-menu-item>
            </app-link>
        </template>
    </template>
</template>

<script lang="ts" setup>
import AppLink from "./Link.vue";
import {useStore} from "@/store";
import {computed} from "vue";
import {MenuType} from "@/store/interface";

const store = useStore();
const menus = computed<MenuType[]>(() => store.state.permission.menu);
</script>
