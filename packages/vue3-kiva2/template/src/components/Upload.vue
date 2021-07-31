<template>
    <el-upload
        class="custom-upload"
        drag
        :action="action"
        :file-list="modelValue"
        :on-remove="handleRemoveFile"
        :http-request="uploadFile"
    >
        <template #default>
            <div>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>
        </template>
    </el-upload>
</template>

<script>
import {ref} from "vue";
import {upload} from "@/api";

export default {
    name: "Upload",
    props: [
        "modelValue",
        "action"
    ],
    emits: [
        "update:modelValue"
    ],
    setup(props, {emit}) {
        const fileList = ref([]);

        const handleRemoveFile = (item) => {
            emit("update:modelValue", props.modelValue.filter((v) => v.uid !== item.uid));
        };

        const uploadFile = (context) => {
            upload(context.action, context.file, (percent) => {
                context.file.percent = percent;
                context.onProgress(context.file);
            }).then(({data}) => {
                context.onSuccess();
                emit("update:modelValue", [...props.modelValue, data]);
            }).catch((e) => {
                context.onError(e);
            });
        };

        return {
            fileList,
            handleRemoveFile,
            uploadFile
        };
    }
};
</script>

<style scoped>

</style>
