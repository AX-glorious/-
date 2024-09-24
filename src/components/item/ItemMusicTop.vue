<template>
    <div v-if="playlist.creator" class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="nav">
            <div class="navLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-baisefanhuix"></use>
                </svg>
                <span class="title">歌单</span>
            </div>
            <div class="navRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sanhengxian-copy"></use>
                </svg>
            </div>
        </div>

        <!-- 中部分 -->
        <div class="middle">
            <div class="playCount">
                <img :src="playlist.coverImgUrl" alt="">
                <div class="count">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                    <span>{{ changeCount(playlist.playCount) }}</span>
                </div>
            </div>
            <div class="msg">
                <div class="title">{{ playlist.name }}</div>
                <div class="user">
                    <img :src="playlist.creator.backgroundUrl" alt="">
                    <span>{{ playlist.creator.nickname }}</span>
                    <!-- <img :src="playlist.coverImgUrl" alt="">
                    <span>创造者名字</span> -->
                </div>
                <div class="text">{{ playlist.description }}</div>
            </div>
        </div>
        <!-- 下部分 -->
        <div class="footer">
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi-copy"></use>
                </svg>
                <span>{{ changeCount(playlist.commentCount) }}</span>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
                <span>{{ playlist.shareCount }}</span>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span>下载</span>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tick"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    setup(props) {
        //用sessionStorage,避免数据丢失（页面渲染了，数据没返回）
        /* if((props.playlist.creator="")){
            props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
        } */
        //本项目选择在渲染开始前使用v-if进行判断
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
    props: ['playlist'],
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    position: relative;

    .bgimg {
        width: 100%;
        height: 450px;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
    }

    .nav {
        height: 50px;
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        // position: fixed;
        // top: 0;
        // left: 0;
        
        .navLeft {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                margin-left: 5px;
                fill: #f9f9f9;
                filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));
            }

            .title {
                font-size: 20px;
                font-weight: 600;
                color: #f3f3f3;
                margin-right: 10px;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);

            }
        }

        .navRight {
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                margin: 0 15px;
                fill: #f9f9f9;
                filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));
            }
        }
    }

    .middle {
        margin: 10px 15px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .playCount {
            position: relative;

            img {
                width: 160px;
                height: 160px;
                border-radius: 12px;
            }

            .count {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 15px;
                font-weight: 600;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                color: rgb(238, 238, 238);

                .icon {
                    width: 15px;
                    height: 15px;
                    vertical-align: middle;
                    margin-right: 5px;
                    margin-top: -2px;
                    fill: #f6f6f6;
                    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));
                }
            }
        }


        .msg {
            width: 60%;
            height: 160px;
            margin-left: 30px;
            margin-top: 5px;

            .title {
                width: 100%;
                height: 30%;
                font-size: 17px;
                color: #f3f3f3;
                font-weight: 600;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
            }

            .user {
                width: 100%;
                height: 35%;
                padding: 10px 0;
                display: flex;
                align-items: center;

                img {
                    height: 40px;
                    width: 40px;
                    border-radius: 100%;
                }

                span {
                    font-size: 16px;
                    color: rgba(211, 211, 211, 0.805);
                    margin-left: 10px;
                    text-shadow: 5px 5px 0 0;
                    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
                }
            }

            .text {
                width: 95%;
                height: 30%;
                padding: 10px 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 14px;
                color: #c7c5c5;
                white-space: normal;
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
            }
        }
    }

    .footer {
        height: 100px;
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-around;

        .iconItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));
            .icon {
                fill: #f9f9f9;
                transform: scale(1.2);
            }

            span {
                font-size: 16px;
                color: #f9f9f9;
                margin-top: 10px;
            }

        }
    }
}
</style>