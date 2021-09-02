<template>
    <div class="dashboard-container">
        系统主页
        <el-button type="primary" @click="handleClick">删除</el-button>
    </div>
</template>

<script lang="ts" setup>
import {ElButton} from "element-plus";
import {useStore} from "@/store";

const store = useStore();

const handleClick = () => {
    store.dispatch("user/logout").then(() => {
        // location.reload();
    });
};

defineExpose({
    handleClick
});
</script>
