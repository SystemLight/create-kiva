<template>
    <div>
        <el-button type="primary" round @click="changeAvatar">
            <slot />
        </el-button>
        <input
            @change="handleChangeAvatar"
            accept="image/*"
            type="file"
            ref="avatarFileRef"
            style="display: none"
        >
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: "ChooseFileButton",
    emits: ["change"],
    setup(props, {emit}) {
        const avatarFileRef = ref(null);

        const handleChangeAvatar = (e) => {
            emit("change", e);
        }

        return {
            avatarFileRef,
            changeAvatar: () => avatarFileRef.value.click(),
            handleChangeAvatar
        }
    }
}
</script>
