<template>
    <el-main class="main-container">
        <router-view />
    </el-main>
</template>

<style lang="scss" scoped>
@use "../../styles/mixin";

.main-container {
    @include mixin.scrollBar();

    background: #F0F2F5;
}
</style>
