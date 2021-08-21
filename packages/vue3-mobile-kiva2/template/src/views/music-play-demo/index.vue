<template>
    <div>
        <van-nav-bar title="音乐播放组件" left-arrow @click-left="$router.back()" />
        <div class="p-5">
            <music-play
                album="专辑"
                title="名称"
                url="http://192.168.52.183/r/%E6%99%AE%E8%B4%A4%E4%B8%8A%E5%B8%88%E8%A8%80%E6%95%99/1-1.mp3"
            />
        </div>
    </div>
</template>

<script>
import MusicPlay from "@/components/MusicPlay/index.vue";

export default {
    name: "music-play-demo",
    components: {
        MusicPlay
    }
};
</script>

<style lang="less" scoped>

</style>
