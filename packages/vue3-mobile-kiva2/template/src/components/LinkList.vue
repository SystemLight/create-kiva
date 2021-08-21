<template>
    <div class="link-nav-box">
        <div class="link-nav-title">{{ title }}</div>
        <div class="link-nav">
            <a v-for="item in items" :href="item.href" class="link-nav-item">{{ item.text }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "LinkList",
    props: [
        "title",
        "items"
    ]
};
</script>

<style lang="less" scoped>
.link-nav-box {
    .link-nav-title {
        margin: 24px 0 8px 16px;
        color: rgba(69, 90, 100, 0.6);
        font-size: 14px;
    }

    .link-nav {
        .link-nav-item {
            display: block;
            background: #FFFFFF;
            border-radius: 99px;
            margin-bottom: 15px;
            padding: 12px;
            font-size: 14px;
            color: #323233;
        }
    }
}
</style>
