<template>
    <div>Hello {{ msg }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            msg: "vue-kiva"
        };
    }
});
</script>

<style lang="less">

</style>
