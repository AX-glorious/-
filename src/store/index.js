import { getMusicLyrics } from '@/request/api/Item';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{//播放列表
      al: {
        id: 13943,
        name: "壁虎漫步",
        pic:109951169280576030,
        picUrl:"https://p2.music.126.net/4h0xW1RujTFvRJZTnOmZCQ==/109951169280576036.jpg",
        pic_str:"109951169280576036",
      },
      id:2607435663,
      name:"Tell me"
    }],
    playListIndex:0,
    pauseShow:true,//暂停按钮显示
    songsDetail:false,//歌曲详情页显示
    lyricsList:{},//歌词
    currentTime:0,//歌曲播放实时时间
    showCD: false,

  },
  getters: {
  },
  mutations: {
    updataPauseShow:function(state, value){
      state.pauseShow=value;
    },

    updataPlayList:function(state,value){
      state.playList=value;
      // console.log(state.playList);
    },

    updataPlayListIndex:function(state,value){
      state.playListIndex=value;
    },

    updataSongsDetail:function(state){
      state.songsDetail=!state.songsDetail;
    },

    udataLyrics:function(state,value){
      state.lyricsList=value;
    },

    updataCurrentTime(state,value){
      state.currentTime=value;
      console.log(state.currentTime);
    },
    updataShowCD(state){
      state.showCD=!state.showCD
    }
  },
  //异步请求用action
  actions: {
    getLyrics: async function(context,value){
      let res =await getMusicLyrics(value);
      console.log("歌词响应:");
      console.log(res);
      context.commit("udataLyrics",res.data.lrc);
        }
  },
  modules: {
  }
})
