
import service from "../index.js"; // 导入 axios 实例

// 获取首页轮播图数据
export function getBanner() {
  return service({
    method: "GET",
    url: "/banner?type=2"
  })
}

//获取推荐歌单
  export function getMusicList(){
    return service({
      method:"GET",
      url:"/personalized?limit=10"
    })
}
