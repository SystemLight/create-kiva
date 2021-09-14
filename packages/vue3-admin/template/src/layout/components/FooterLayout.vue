<template>
    <el-footer class="footer-container" height="40px">
        后台管理系统 copyright 2010-2100
    </el-footer>
</template>

<style lang="scss" scoped>
@use "../../styles/variables";

.footer-container {
    border-top: 1px solid variables.$color-border-1;
    line-height: 40px;
    text-align: center;
    font-size: variables.$font-size-4;
    color: rgba(0, 0, 0, .45);
}
</style>
