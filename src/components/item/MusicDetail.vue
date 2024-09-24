<template>
    <img class="bgimg" :src="songMsg.al.picUrl" alt="">
    <div class="musicDetail" v-if="songMsg">
        <div class="detailTop">
            <div class="topLeft">
                <svg class="icon" aria-hidden="true" @click="updataSongsDetail">
                    <use xlink:href="#icon-fanhui"></use>
                </svg>
                <div class="msg">
                    <Vue3Marquee class="songname">{{ songMsg.name }}</Vue3Marquee>
                    <span class="singer" v-for="(item, i ) in songMsg.ar" :key="item">
                        {{ item.name }}&nbsp
                    </span>
                </div>
            </div>
            <div class="topRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
            </div>
        </div>
        <div class="detailMiddle" v-show="showCD" @click="updataShowCD()" >

            <img class="cizhen" src="@/assets/DV2.png" alt="" :class="{ cizhen_active: !pauseShow }">
            <div class="dv" :class="{ dv_active: !pauseShow, dv_paused: pauseShow }">
                <img class="cipan" src="@/assets/DV1.png" alt="">
                <img class="dvImg" :src="songMsg.al.picUrl" alt="">
            </div>
        </div>
        <div class="musicLyrics" ref="lyricsContainer"  v-show="!showCD" @click="updataShowCD()">
            <p v-for="item in Lyric" :key="item"
                :class="{ p_active: (currentTime >= item.time && currentTime <= item.next) }" ref="lyricLines">
                {{ item.lrc }}
            </p>
        </div>
        <div class="detailFooter">
            <div class="footerTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-heijiaochangpian-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-xiangqing-01"></use>
                </svg>
            </div>
            <div class="progress">

            </div>
            <div class="bottom">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="pauseShow" @click="play">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-else @click="play">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao11"></use>
                </svg>
            </div>
        </div>
    </div>
</template>


<script>
import { Vue3Marquee } from 'vue3-marquee'
import { mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            isLyricShow: false
        }
    },

    computed: {
        ...mapState(["lyricsList", "currentTime","showCD"]),
        Lyric: function () {
            const regex = /(\[\d{2}:\d{2}.\d{2}\])/g; // 匹配时间点的正则表达式
            let arr = [];

            if (this.lyricsList && this.lyricsList.lyric) {
                const lines = this.lyricsList.lyric.trim().split('\n'); // 将歌词按行分割

                // 遍历每一行歌词数据
                lines.forEach(line => {
                    let timeMatches = line.match(regex); // 匹配当前行中的所有时间点

                    if (timeMatches) {
                        timeMatches.forEach(time => {
                            // 提取分、秒、毫秒
                            let [min, sec, mill] = time.slice(1, -1).split(':').join('.').split('.');
                            // 提取时间点后的歌词部分
                            let lrc = line.replace(regex, '').trim(); // 去除歌词部分的时间点

                            // 计算总毫秒数
                            let timeInSec = parseInt(min) * 60 + parseInt(sec) + parseInt(mill) / 1000.0;

                            // 将结果放入数组
                            arr.push({
                                min: min,
                                sec: sec,
                                mill: mill,
                                lrc: lrc,
                                time: timeInSec
                            });
                        });
                    }
                });
                arr.sort((a, b) => a.time - b.time);
                arr.forEach((item, i) => {
                    if (i == arr.length - 1) {
                        item.next = 1000;
                    } else {
                        item.next = arr[i + 1].time;
                    }
                })
            }
            console.log(arr);
            return arr;
        }
    },

    watch: {
        currentTime() {
            this.$nextTick(() => {
                this.lyricMoveView();
            });
        }
    },
    mounted() {
        console.log(this.songMsg);
        //console.log(this.lyricsList.lyric);
        this.observeLyricChanges();
    },
    props: ['songMsg', 'pauseShow', 'play'],

    methods: {
        ...mapMutations(['updataSongsDetail','updataShowCD']),
        
        lyricMoveView() {
            // 获取 lyricsContainer 容器
            const container = this.$refs.lyricsContainer;
            // 获取所有歌词行
            const lines = Array.from(container.querySelectorAll('p'));

            // 查找当前正在播放的歌词行
            const activeLine = lines.find(line => line.classList.contains('p_active'));

            if (activeLine) {
                // 计算歌词行的高度和歌词行的顶部位置
                const containerHeight = container.clientHeight;
                const lineTop = activeLine.offsetTop;
                const lineHeight = activeLine.clientHeight;

                // 计算需要滚动的距离，使歌词行在视图中心
                const targetPosition = containerHeight * 7 / 10;
                const scrollPosition = lineTop - (targetPosition - lineHeight / 2);
                // 滚动容器到目标位置
                requestAnimationFrame(() => {
                    container.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                });
            }
        },
        observeLyricChanges() {
            const container = this.$refs.lyricsContainer;
            const observer = new MutationObserver(() => {
                this.lyricMoveView();
            });

            observer.observe(container, {
                childList: true,
                attributes: true,
                subtree: true,
                attributeFilter: ['class']
            });
        }
    },
    components: {
        Vue3Marquee,
    }
}
</script>

<style lang="less">
.bgimg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(40px);
}

.musicDetail {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;

    .detailTop {
        height: 50px;
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        overflow: hidden;


        .topLeft {
            width: 45%;
            height: 100%;
            display: flex;
            margin-left: 5px;

            .icon {
                width: 20%;
                margin-right: 10px;
                transform: scale(1.1);
                fill: #f9f9f9;
                filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.5));
            }

            .msg {
                width: 80%;

                .songname {
                    font-size: 17px;
                    font-weight: 600;
                    color: #f9f9f9;
                    text-shadow: 2px 1px 4px rgba(0, 0, 0, 0.5);
                }

                .singer {
                    font-size: 14px;
                    color: #e0e0e0;
                    text-shadow: 2px 1px 4px rgba(0, 0, 0, 0.5);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        .text {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .topRight {
            margin-right: 20px;

            .icon {
                transform: scale(1.1);
                margin-left: 5px;
                fill: #f9f9f9;
                filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.5));
            }
        }
    }

    .detailMiddle {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 20px;

        .cizhen {
            width: 190px;
            height: 200px;
            position: absolute;
            margin-top: 30px;
            transform-origin: 50% 20px;
            transform: rotate(-28deg);
            transition: all 1.5s;
            z-index: 1;

        }

        .cizhen_active {
            width: 190px;
            height: 200px;
            margin-top: 30px;
            position: absolute;
            transform-origin: 50% 20px;
            transform: rotate(-5deg);
            transition: all 1.5s;
            z-index: 1;

        }

        .dv {
            margin-top: 165px;
            animation: rotate 10s linear infinite;

            .cipan {
                width: 290px;
                height: 290px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

            }

            .dvImg {
                width: 200px;
                height: 200px;
                border-radius: 50%;
                left: 50%;
                z-index: -1;

            }
        }

        .dv_active {
            animation-play-state: running;
        }

        .dv_paused {
            animation-play-state: paused;
        }

        @keyframes rotate {
            from {
                transform: rotateZ(0deg);
            }

            to {
                transform: rotateZ(360deg);
            }
        }
    }

    .musicLyrics {
        width: 100%;
        max-width: 100%;
        height: 63%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 13%;
        overflow-y: auto;
        //绝对定位在页面中心
        // position: absolute;
        // top: 44%;
        // left: 50%;
        // transform: translate(-50%, -50%);

        p {
            font-size: 15px;
            color: #d7d7d7;
            margin-bottom: 20px;
            padding: 0 25px;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
        }

        .p_active {
            width: 100%;
            padding: 0 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 20px;
            color: #f9f9f9;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
            transition: color 0.2s ease-out, font-size 0.2s ease-out;
        }
    }

    .musicLyrics::-webkit-scrollbar {
        width: 0;
        /* 隐藏滚动条 */
    }


    .detailFooter {
        width: 100%;
        height: 180px;
        position: absolute;
        bottom: 0;
        left: 0;

        .footerTop {
            width: 100%;
            height: 60px;
            padding: 0 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            fill: #e9e9e9;
            filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.3));

            .icon {
                transform: scale(1.1);
            }
        }

        .progress {
            width: 100%;
            height: 40px;
        }

        .bottom {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .icon {
                transform: scale(1.3);
                fill: #f2f2f2;
                filter: drop-shadow(2px 1px 4px rgba(0, 0, 0, 0.5));

            }
        }

    }
}
</style>
