import {reactive} from "vue";

/**
 * 计时触发器
 * @param counterSize
 * @returns {(UnwrapNestedRefs<{resendTimer: number, resendTime: number, isStart: boolean}>|startResendTimer|stopResendTimer)[]}
 */
export function useCountdown(counterSize = 60) {
    const state = reactive({
        isStart: false,
        resendTime: counterSize,
        resendTimer: 0
    });

    function startResendTimer() {
        // 开始重新发送计时
        state.isStart = true;
        state.resendTimer = setInterval(() => {
            state.resendTime--;
            if (state.resendTime < 1) {
                stopResendTimer();
            }
        }, 1000);
    }

    function stopResendTimer() {
        // 停止重新发送计时
        clearInterval(state.resendTimer);
        state.isStart = false;
        state.resendTime = counterSize;
    }

    return [state, startResendTimer, stopResendTimer];
}
