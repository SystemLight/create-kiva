<template>
    <template v-for="item in menus">
        <template v-if="item.children&&item.children.length>0">
            <el-sub-menu :index="item.index">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <router-link v-for="subItem in item.children" :to="subItem.link">
                    <el-menu-item :index="subItem.index">
                        {{ subItem.title }}
                    </el-menu-item>
                </router-link>
            </el-sub-menu>
        </template>

        <template v-else>
            <router-link :to="item.link">
                <el-menu-item :index="item.index">
                    {{ item.title }}
                </el-menu-item>
            </router-link>
        </template>
    </template>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const menus = computed(() => store.state.permission.menu);
</script>
