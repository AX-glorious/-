<template>
    <ItemMusicTop :playlist="state.playlist"/>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import { onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router';
import {getMusicItemList,getListAllMusic} from '@/request/api/Item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import ItemMusicList from '@/components/item/ItemMusicList.vue';

export default{
    setup(){
        const state=reactive({
            playlist:{},//歌单信息
            itemList:{},//歌单歌曲信息
        });
        onMounted(async()=>{
            let id=useRoute().query.id
            console.log(id);
            let res=await getMusicItemList(id);
            console.log(res);
            state.playlist=res.data.playlist
            
            //获取歌单所有歌曲
            let result= await getListAllMusic(id);
            console.log(result);
            state.itemList=result.data.songs;
            //console.log(state.itemList);
            //防止页面刷新，导致的数据丢失，将数据保存到sessionStorage
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        });
        return {state}
    },
    components:{
        ItemMusicTop,ItemMusicList
    }
}
</script>