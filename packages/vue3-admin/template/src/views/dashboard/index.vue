<template>
    <el-row :gutter="15">
        <el-col :span="6" v-for="item in 25" class="mt-5">
            <el-card shadow="never">
                <div v-for="o in 4" :key="o" style="padding: 5px 0">{{ "列表内容 " + o }}</div>
                <template #header>
                    <span>卡片名称</span>
                </template>
            </el-card>
        </el-col>
    </el-row>
</template>
