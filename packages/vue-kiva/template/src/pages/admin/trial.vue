<template>
    <div>
        hello trial {{ count }}
        <el-button type="primary" @click="addCount">增加</el-button>
    </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";

import types from "@/models/common/types";

const {mapState} = createNamespacedHelpers("common");

export default {
    name: "trial",
    computed: {
        ...mapState(["count"])
    },
    methods: {
        addCount() {
            this.$store.commit(types.COMMON_INCREMENT);
        }
    }
};
</script>

<style scoped>

</style>
