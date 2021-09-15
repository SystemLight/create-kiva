<template>
    <div id="demo">
        <button @click="show = !show">
            Toggle
        </button>

        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
        <el-icon :size="20">
            <edit />
        </el-icon>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {Edit} from "@element-plus/icons";

const show = ref(false);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
