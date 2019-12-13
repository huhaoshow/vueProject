// 这个文件封装了axios基准路径

// 引入axios
import axios from 'axios'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// 暴露axios
export default axios
