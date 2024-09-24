import service from "../index.js"; // 导入 axios 实例

// 获取歌单详情页的数据
export function getMusicItemList(id) {
    return service({
        method: "GET",
        url: `/playlist/detail?id=${id}`
    });
}
//获取歌单所有歌曲
export function getListAllMusic(id) {
    return service({
        method: "GET",
        url: `/playlist/track/all?id=${id}`
    });
}

//获取歌词
export function getMusicLyrics(id){
    return service({
        method:"GET",
        url:`/lyric?id=${id}`
    })

}
