<template>
    <div class="footerMusic">
        <div class="left" @click="updataSongsDetail(); getMusicLyrics()">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="text">
                <p class="song">{{ playList[playListIndex].name }}</p>
                <span class="tip">横滑可以切换歌曲</span>
            </div>
        </div>
        <div class="right">

            <svg class="icon" aria-hidden="true" v-if="pauseShow" @click="play">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>


            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao11"></use>
            </svg>
        </div>
        <audio ref="audio" :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
            @timeupdate="timeUpdate"></audio>
        <van-popup v-model:show="songsDetail" position="bottom" :style="{ height: '100%', width: '100%' }">
            <MusicDetail :songMsg="playList[playListIndex]" :play="play" :pauseShow="pauseShow" />
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {

    data(){
        return{
            interVal: 0,
        };
    },

    computed: {
        ...mapState(['playList', 'playListIndex', 'pauseShow', 'songsDetail'])

    },

    updated() {
    },

    mounted() {
        // console.log("歌曲播放情况：");
        // console.log(this.$refs);
        
    },
    methods: {
        play: function () {
            //判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updataPauseShow(false);
                this.updataTime();
            }
            else {
                this.$refs.audio.pause();
                this.updataPauseShow(true);
                clearInterval(this.interVal); //暂停清除定时器
            }
        },
        getMusicLyrics: function () {
            this.$store.dispatch("getLyrics", this.playList[this.playListIndex].id);
        },

        //可以用audio自带的事件，但是audio的监测函数会一直都更新数据，时间快，浪费资源
        //定时取数据，节流，节省后续计算资源。
        updataTime: function () {
          this.interVal=setInterval(()=>{
            this.updataCurrentTime(this.$refs.audio.currentTime)
          },500)
        },
        ...mapMutations(['updataPauseShow', 'updataSongsDetail','updataCurrentTime'])
    },
    watch: {
        //监听下标，发生改变（点击列表切换歌曲）,就自动播放
        playListIndex: function () {
            //监听，如果下标改变就请求歌词
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                this.updataPauseShow(false);
            }
        },

        playList: function () {
            if (this.pauseShow) {
                this.$refs.audio.atuoplay = true;
                this.updataPauseShow(false);
            }
        }
    },
    components: {
        MusicDetail
    }
}
</script>

<style>
.footerMusic {
    width: 100%;
    height: 72px;
    background-color: #fbfbfb;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    align-items: center;

    .left {
        width: 70%;
        display: flex;

        img {
            width: 50px;
            height: 50px;
            margin: 0 15px;
            border-radius: 50%;
        }

        .text {
            margin-top: 3px;

            .song {
                font-size: 19px;
                font-weight: 600;
                color: #191919;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
            }

            .tip {
                font-size: 14px;
                color: #7e7e7e
            }
        }
    }

    .right {
        width: 21%;
        display: flex;
        justify-content: space-between;
        margin-left: 15px;

        .icon {
            fill: #4b4b4b;
            transform: scale(1.2);
        }
    }
}
</style>