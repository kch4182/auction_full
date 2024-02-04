import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        '' : 'http://localhost:4000'
})

// Axios에서 요청이나 응답을 보내기 전 로직(함수) 실행
axiosInstance.interceptors.request.use(function (config) {
    // config : user 정보
    // Bearer Type 토큰 인증 방법 사용하여 headers.Authorization 수정
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken'); // localStorage에 저장되어 있는 것과 Bearer을 합쳐서 config를 재구성
    return config;
}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.data === 'jwt expired') {
        window.location.reload();
    }
    
    return Promise.reject(error);
})



export default axiosInstance;