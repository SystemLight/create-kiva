<template>
    <div class="wrap footer-content">
        <slot />
    </div>
</template>

<script>
export default {
    name: "FooterTextNav"
};
</script>

<style lang="less" scoped>
@import "../../styles/var.less";

.wrap {
    width: @container-size;
    margin: 0 auto;
}

.footer-content {
    padding-top: 15px;
    text-align: center;
    color: #888888;
}
</style>
