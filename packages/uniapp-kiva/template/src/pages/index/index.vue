<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "Hello"
        };
    },
    onLoad() {

    },
    methods: {}
};
</script>

<style lang="less">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: unit(200, rpx);
    width: unit(200, rpx);
    margin: unit(200, rpx) auto unit(50, rpx) auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: unit(36, rpx);
    color: #8F8F94;
}
</style>
