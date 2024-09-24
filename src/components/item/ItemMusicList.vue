<template>
    <div  class="itemMusicList">
        <div class="nav" v-if="itemList!=null">
            <div class="navLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <span class="playtext">播放全部
                    <span class="length">(共{{ itemList.length }}首)</span>
                </span>
            </div>
            <div class="navRight">
                <div class="subscribed">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiahao-dange"></use>
                    </svg>
                    <span class="subscribedCount">收藏({{ changeCount(subscribedCount) }})</span>
                </div>
            </div>
        </div>
        <div class="musicList" v-if="itemList!=null">
            <div class="item" v-for="(item, i) in itemList" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="number">{{ i + 1 }}</span>
                    <div>
                        <p class="songname">{{ item.name }}</p>
                        <span class="singer" v-for="(item1, index) in item.ar" :key="index">
                            {{ item1.name }}&nbsp
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-sanhengxian-copy"></use>
                    </svg>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    setup(props) {

        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
            else {
                return num;
            }
        }
        return { changeCount }
    },

    props: ['itemList', 'subscribedCount'],

    methods: {
        playMusic: function (i) {
            this.updataPlayList(this.itemList);
            this.updataPlayListIndex(i);
            console.log("目前下标"+i);
        },
        ...mapMutations(['updataPlayList', 'updataPlayListIndex'])
    },
}
</script>

<style>
.itemMusicList {
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    .nav {
        width: 100%;
        height: 70px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .navLeft {
            display: flex;

            .playtext {
                font-size: 18px;
                font-weight: 600;
                margin-left: 16px;
                color: #2c2c2c;

                .length {
                    font-size: 14px;
                    font-weight: 400;
                    margin-left: -5px;
                    color: #a9a9a9;
                }
            }

            .icon {
                margin-top: -3px;
                transform: scale(1.4);
            }
        }

        .navRight {
            width: 135px;
            height: 62%;
            background-color: #fd4b4b;
            border-radius: 30px;
            margin-right: -5px;

            .subscribed {
                display: flex;

                .subscribedCount {
                    margin-top: 11px;
                    margin-left: 3px;
                    font-size: 16px;
                    color: #f3f3f3;
                }

                .icon {
                    margin-top: 9px;
                    margin-left: 4px;
                    transform: scale(0.65);
                    fill: #f3f3f3;
                }
            }

        }

    }

    .musicList {
        width: 100%;
        height: calc(100vh - 400px - 72px);
        overflow: auto;
        padding: 0 20px;

        .item {
            height: 70px;
            display: flex;
            justify-content: space-between;

            .itemLeft {
                width: 80%;
                display: flex;
                align-items: center;
                padding-right: 20px;
                .number {
                    font-size: 19px;
                    font-weight: 600;
                    margin-right: 20px;
                    color: #191919;
                }

                .songname {
                    font-size: 16px;
                    font-weight: 600;
                    color: #191919;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }

                .singer {
                    font-size: 14px;
                    color: #a9a9a9;
                    
                }

            }

            .itemRight {
                width: 20%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                fill: #6f6f6f;
            }
        }
    }
}
</style>