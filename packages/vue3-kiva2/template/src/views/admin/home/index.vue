<template>
    <el-space direction="vertical" :size="15" style="width: 100%" alignment="stretch">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="custom-card" shadow="never">
            <template #header>
                <div>
                    <span>项目一</span>
                </div>
            </template>
            <template #default>
                <div>主页内容</div>
            </template>
        </el-card>

    </el-space>
</template>

<script>
export default {
    name: "home"
};
</script>
