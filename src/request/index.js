import axios from "axios";
let service=axios.create({
    baseURL:"http://localhost:3000/",
    timeout:3000
})

export default service


// import axios from 'axios';
// import { ref, onMounted } from 'vue';


// let progressData = ref({
//     progress: [],
//     ImgUrl: [],
// });

// onMounted(() => {
//     axios.get("/data/resumeData/chinese/progressData.json")
//         .then(response => {
//             progressData.value = response.data
//         })
//         .catch(
//             error => {
//                 console.error('加载项目数据时出错:', error);
//             }
//         )
// })