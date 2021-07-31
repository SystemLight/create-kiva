<template>
    <div class="wrap">
        <div>
            <h1>访问的内容不存在</h1>
            <div class="mt-3 text-center">
                <el-button type="primary" @click="$router.replace('/')">返回主页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "not-found"
}
</script>

<style lang="less" scoped>
.wrap {
    margin-top: 35px;
    display: flex;
    justify-content: center;
}
</style>
