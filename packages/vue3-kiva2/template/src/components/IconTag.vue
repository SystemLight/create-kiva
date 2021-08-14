<template>
    <div class="custom-tag" :class="{'px-1':!closeable,'py-1':!closeable}">
        <div class="tag-content" @click="handleClick">
            <div class="tag-avatar-icon">
                <img :src="image || defaultAvatarURL" alt="icon">
            </div>
            <div class="tag-avatar-text">
                {{ text }}
            </div>
        </div>
        <div v-if="closeable" class="tag-avatar-close" @click="handleRemove">
            <i class="el-icon-close" />
        </div>
    </div>
</template>

<script>
import {defaultAvatarURL} from "@/utils";

export default {
    name: "IconTag",
    props: [
        "image",
        "text",
        "closeable"
    ],
    emits: [
        "remove",
        "click"
    ],
    setup(props, {emit}) {
        return {
            defaultAvatarURL,
            handleClick: () => emit("click"),
            handleRemove: () => emit("remove")
        };
    }
};
</script>

<style lang="less" scoped>
@import "../styles/var.less";

.custom-tag {
    margin-right: 15px;
    margin-bottom: 10px;
    background-color: @color-brand;
    border-radius: 8px;
    padding: 0 3px;
    display: flex;
    align-items: center;

    .tag-content {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;

        .tag-avatar-icon {
            width: 30px;
            height: 30px;
            overflow: hidden;
            font-size: 0;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .tag-avatar-text {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #FFFFFF;
            margin-left: 5px;
            font-size: @font-size-3;
            line-height: 1;
        }
    }

    .tag-avatar-close {
        cursor: pointer;
        margin-left: 8px;
        margin-right: 8px;
        font-size: @font-size-2;

        i:hover {
            background-color: @color-info;
            border-radius: 50%;
            color: #FFFFFF;
        }
    }
}
</style>
