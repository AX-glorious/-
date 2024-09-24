<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicFooter">
            <van-swipe :loop="false" :width="150" class="my-swp" :show-indicators="false">
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
                    <div class="imgInf">
                        <img :src="item.picUrl" alt="">
                        <div class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-bofang1"></use>
                            </svg>
                            <div class="number">{{ changeCount(item.playCount) }}</div>
                        </div>
                    </div>
                     <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js';
import { reactive,onMounted } from 'vue';

export default {
    //vue2写法
   /*  data() {
        return {
            musicList: []
        }
    },
    methods: {
        async getGnedan() {
            let res = await getMusicList();
            console.log(res);
            this.musicList = res.data.result
        },
        changeCount:function(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1)+"亿"
            }else if(num>=10000){
                return (num/10000).toFixed(1)+"万"
            }
        }
    },
    mounted() {
        this.getGnedan()
    } */

    //vue3写法
    setup(){
        const state=reactive({
            musicList:[],
        })

        function changeCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1)+"亿"
            }else if(num>=10000){
                return (num/10000).toFixed(1)+"万"
            }
            else{
                return num;
            }
        }

        onMounted(async()=>{
            let res = await getMusicList();
            console.log(res);
            state.musicList = res.data.result;
        })
        return {state,changeCount}
    }
};

</script>

<style>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 20px;
            font-weight: 900;
        }

        .more {
            color: #3f3f3f;
            font-size: 14px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 32px;
            padding: 0 10px;
            border-radius: 20px
        }
    }

    .musicFooter {
        width: 100%;
        height: 200px;
        margin-top: 5px;
        .my-swp {
            height: 100%;
        }

        .imgInf {
            position: relative;
            display: inline-block;

            img {
                width: 100%;
                height: 130px;
            }

            .playCount {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                .icon{
                    width: 15px;
                    height: 15px;
                    vertical-align: middle;
                    margin:10px 0 0 0
                }
                .number{
                    font-size: 15px;
                    font-weight: 600;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    color: rgb(238, 238, 238);
                    margin:6px 5px 0 5px;
                }
                .icon{
                    fill:#f5f5f5;
                    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.3));

                }
            }
        }
        .name{
            font-size: 14px;
            color: #3f3f3f;
        }
    }
}
</style>