<template>
    <div class="flex">
        <el-input
            class="flex-item"
            placeholder="短信验证码"
            :model-value="modelValue"
            @update:modelValue="handleUpdate"
        />
        <el-button
            type="primary"
            class="ml-3"
            :disabled="smsCountState.isStart"
            @click="startSendSms()"
        >
            {{ smsCountState.isStart ? smsCountState.resendTime + "秒后重新发送" : "发送验证码" }}
        </el-button>
    </div>
</template>

<script>
import {inject} from "vue";
import {elFormKey, elFormItemKey} from "element-plus/lib/el-form";
import {UPDATE_MODEL_EVENT} from "element-plus/lib/utils/constants";

import {responseErrorMessage} from "@/utils";
import {useCountdown} from "@/hooks/common";

export default {
    name: "SendSmsItem",
    props: [
        "modelValue",
        "phoneName",
        "phoneValue"
    ],
    emits: [
        "update:modelValue"
    ],
    setup(props, {attrs, slots, emit}) {
        const elForm = inject(elFormKey, {});
        const elFormItem = inject(elFormItemKey, {});

        const [smsCountState, startResendTimer, stopResendTimer] = useCountdown();

        function startSendSms() {
            // 发送短信验证码
            elForm.validateField(props.phoneName || "phone", (validMsg, invalidFields) => {
                if (!validMsg) {
                    sendSms(props.phoneValue).catch((err) => {
                        responseErrorMessage(err, "发送验证码失败");
                        stopResendTimer();
                    });
                    startResendTimer();
                }
            });
        }

        return {
            smsCountState,
            handleUpdate: val => emit(UPDATE_MODEL_EVENT, val),
            startSendSms
        };
    }
};
</script>
