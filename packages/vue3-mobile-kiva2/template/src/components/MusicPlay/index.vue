<template>
    <div class="mc-info-box" style="background: #FFFFFF">

        <div
            class="mc-info-box-image"
            :style="`background: url('${avatar || require('./artworks_large.jpg')}');`"
            style="background-size: 65px"
        ></div>

        <div class="mc-info-box-container">
            <div class="mc-info-box-head">
                <div
                    class="mc-info-box-btn"
                    :class="{bubble:bubbleAnimate}"
                    @animationend="bubbleAnimate=false"
                    @click="playMusic"
                >
                    <div
                        :class="{loading:playLoading,'mc-info-box-play':displayPlay,'mc-info-box-pause':displayPause }"
                    ></div>
                </div>
                <div class="mc-info-box-title">
                    <p>{{ album }}</p>
                    <p>
                        <span>{{ title }}</span>
                    </p>
                </div>
                <div class="mc-info-box-blur"></div>
            </div>

            <div class="mc-info-box-progress-bar">
                <div class="mc-step" :style="{width:currentPercentage}"></div>
                <div
                    class="mc-progress-mask"
                    @touchstart="touchstartListener"
                    @touchmove="touchmoveListener"
                    ref="mask"
                ></div>
            </div>

            <div class="mc-info-box-footer">
                <div class="mc-info-box-time">
                    <span>{{ currentTimed }}</span>
                    |
                    <span>{{ totalTimed }}</span>
                </div>
                <div class="mc-info-box-controller">
                    <i class="icon rewind mr10" @click="rewind10">rewind</i>
                    <i class="icon mr10" :class="`speed-${currentSpeed}`" @click="playbackRate">rate</i>
                    <i class="icon forward" @click="forward30">forward</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, onUnmounted} from "vue";

import {throttle} from "@/utils";

function getTime(timeDisplay) {
    // 用秒数来显示当前播放进度
    timeDisplay = Math.floor(timeDisplay);//获取实时时间
    //分钟
    let minute = timeDisplay / 60;
    let minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    let second = timeDisplay % 60;
    let seconds = Math.round(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

export default {
    name: "MusicPlay",
    props: [
        "avatar",
        "album",
        "title",
        "url"
    ],
    setup(props) {
        const currentSpeed = ref(1);
        const currentTimed = ref("00:00");
        const totalTimed = ref("00:00");
        const currentPercentage = ref("0");
        const playLoading = ref(false);
        const displayPlay = ref(true);
        const displayPause = ref(false);
        const bubbleAnimate = ref(false);
        const mask = ref(null);

        let snatch = false;
        let wait = false;
        const audio = new Audio(props.url);

        const playMusic = () => {
            if (audio.paused) {
                displayPlay.value = false;
                displayPause.value = true;
                playLoading.value = true;
                audio.play();
            } else {
                displayPlay.value = true;
                displayPause.value = false;
                playLoading.value = false;
                audio.pause();
            }
            bubbleAnimate.value = true;
        };

        function forward30() {
            let time = audio.currentTime + 30;
            if (time > audio.duration) {
                audio.currentTime = audio.duration;
                return;
            }
            audio.currentTime = time;
        }

        function rewind10() {
            let time = audio.currentTime - 10;
            if (time < 0) {
                audio.currentTime = 0;
                return;
            }
            audio.currentTime = time;
        }

        function playbackRate() {
            if (audio.playbackRate === 1) {
                audio.playbackRate = 2;
                currentSpeed.value = 2;
            } else {
                audio.playbackRate = 1;
                currentSpeed.value = 1;
            }
        }

        const canPlayListener = (e) => {
            totalTimed.value = getTime(audio.duration);
        };
        const timeUpdateListener = (e) => {
            currentTimed.value = getTime(audio.currentTime);
            if (!snatch) {
                currentPercentage.value = parseInt((audio.currentTime / audio.duration) * 100) + "%";
            }
            if (wait) {
                playLoading.value = false;
                wait = false;
            }
        };
        const playingListener = () => {
            setTimeout(function() {
                playLoading.value = false;
            }, 500);
        };
        const stopMusicListener = () => {
            audio.pause();
            audio.currentTime = 0;
            currentPercentage.value = "0";
            displayPlay.value = true;
            displayPause.value = false;
        };
        const waitingListener = () => {
            playLoading.value = true;
        };

        const touchstartListener = (e) => {
            snatch = true;
        };
        const touchmoveListener = throttle(function(e) {
            let maskX = mask.value.parentElement.offsetLeft;
            let maskWidth = mask.value.offsetWidth;
            let percent = (e.touches[0].clientX - maskX) / maskWidth;
            audio.parcent = percent;
            let w = parseInt((percent) * 100);
            if (w > 100) {
                w = 100;
            }
            if (w < 0) {
                w = 0;
            }
            currentPercentage.value = w + "%";
        });
        const touchendListener = (e) => {
            if (snatch) {
                audio.currentTime = audio.parcent * audio.duration;
                snatch = false;
            }
        };

        audio.addEventListener("canplay", canPlayListener);
        audio.addEventListener("timeupdate", timeUpdateListener, false);
        audio.addEventListener("playing", playingListener);
        audio.addEventListener("ended", stopMusicListener);
        audio.addEventListener("waiting", waitingListener);
        document.addEventListener("touchend", touchendListener);

        onUnmounted(function() {
            audio.removeEventListener("canplay", canPlayListener);
            audio.removeEventListener("timeupdate", timeUpdateListener, false);
            audio.removeEventListener("playing", playingListener);
            audio.removeEventListener("ended", stopMusicListener);
            audio.removeEventListener("waiting", waitingListener);

            document.removeEventListener("touchend", touchendListener);
        });

        return {
            forward30,
            rewind10,
            playbackRate,
            currentSpeed,
            mask,
            touchstartListener,
            touchmoveListener,
            playMusic,
            displayPlay,
            displayPause,
            bubbleAnimate,
            playLoading,
            currentPercentage,
            totalTimed,
            currentTimed
        };
    }
};
</script>

<style scoped>
@keyframes Build {
    0% {
        background-size: 0 10px;
    }
    70% {
        background-size: 1407px 10px;
    }
    80% {
        background-size: 1407px 60px;
    }
    90% {
        background-size: 1407px 70px;
    }
    100% {
        background-size: 1407px 60px;
    }
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes bubble {
    0% {
        transform: scale(0.5);
    }
    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
}

.bubble {
    animation: bubble 1s;
}

.mc-wrap {
    padding: 0 10px;
    max-width: 880px;
    margin: 0 auto;
}

.mc-info-title {
    padding-top: 30px;
}

.mc-info-title span {
    font-size: 14px;
    color: #4EACD4;
}

.mc-info-head h2 {
    margin-top: 30px;
    font-size: 32px;
    color: #000000;
}

.mc-info-head p:first-of-type {
    font-size: 20px;
    color: #999999;
    margin: 10px 0;
}

.mc-info-head p:last-child {
    font-size: 13px;
    color: #999999;
    margin-bottom: 25px;
}

.mc-info-box {
    padding: 6px;
    border: 1px solid #EAEAEA;
    color: #666666;
    border-radius: 5px;
}

.mc-info-box .mc-info-box-image {
    width: 65px;
    height: 65px;
    border-radius: 5px;
    margin-right: 10px;
    float: left;
}

.mc-info-box .mc-info-box-container .mc-info-box-head {
    position: relative;
}

.mc-info-box .mc-info-box-container .mc-info-box-head:after {
    top: 0;
    right: 0;
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 60px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #FFFFFF 85%);
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-btn {
    background: #92CE00;
    margin: 5px 10px 0 0;
    float: left;
    position: relative;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-size: 100% 100%;
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-btn .mc-info-box-play {
    position: absolute;
    background: url("./spirit.svg") no-repeat -1102px 14px;
    width: 100%;
    height: 100%;
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-btn .mc-info-box-pause {
    position: absolute;
    background: url("./spirit.svg") no-repeat -1153px 14px;
    width: 100%;
    height: 100%;
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-btn .loading:after {
    content: " ";
    display: block;
    width: 48px;
    height: 48px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid;
    border-color: #FFFFFF transparent #FFFFFF transparent;
    animation: loading 1.2s linear infinite;
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-title {
    padding-top: 10px;
    overflow: hidden;
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-title p:first-child {
    font-size: 13px;
    color: #999999;
}

.mc-info-box .mc-info-box-container .mc-info-box-head .mc-info-box-title p:last-child {
    overflow: hidden;
    margin-top: 5px;
    font-size: 20px;
    color: #666666;
    font-weight: 800;
    white-space: nowrap;
}

.mc-info-box .mc-info-box-container .mc-info-box-progress-bar {
    position: relative;
    animation: Build 1.5s cubic-bezier(0.5, 0, 0.5, 1.5) 1;
    height: 60px;
    background: url("./2.svg") repeat-x 0 50%;
    margin: 20px 0 10px 0;
}

.mc-info-box .mc-info-box-container .mc-info-box-progress-bar .mc-step {
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    position: absolute;
    background: url("./selector2.svg") repeat-x 0 50%;
}

.mc-info-box .mc-info-box-container .mc-info-box-progress-bar .mc-progress-mask {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.mc-info-box .mc-info-box-container .mc-info-box-footer {
    display: flex;
}

.mc-info-box .mc-info-box-container .mc-info-box-footer .mc-info-box-time {
    font-size: 12px;
    color: #999999;
}

.mc-info-box .mc-info-box-container .mc-info-box-footer .mc-info-box-controller {
    flex-grow: 2;
    text-align: center;
}

.mc-info-box .mc-info-box-container .mc-info-box-footer .mc-info-box-detail {
    flex-grow: 1;
    text-align: right;
}

.icon {
    background-repeat: no-repeat;
    background-image: url("./spirit.svg");
    background-size: 1193px 32px;
    display: inline-block;
    height: 26px;
    width: 26px;
    opacity: 0.5;
    text-align: initial;
    text-indent: -99999px;
    transition: opacity 0.2s;
}

.icon.rewind {
    background-position: 4px 2px;
}

.icon.speed-1 {
    background-position: -41px 3px;
}

.icon.speed-2 {
    background-position: -161px 3px;
}

.icon.forward {
    background-position: -241px 2px;
}

.icon.info {
    background-position: -281px 2px;
}

.icon.share {
    background-position: -321px 0;
}

.mr10 {
    margin-right: 10px;
}
</style>
