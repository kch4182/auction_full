import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, authUser} from "./thunkFunctions";
import { toast } from 'react-toastify';

// 초기상태
const initialState = {
    userData : {
        id : '',
        email : '',
        name : '',
        role : '0', // role : 0,1 로 일반유저, admin 유저 구분 => 권한 구분
        image : '', // URL 넣어주면 됨
    },
    isAuth : false, // isAuth가 True이면 로그인 상태, False이면 로그아웃 상태
    isLoading : false, // userData를 가져오는 동안은 True, 가져왔다면 False 
    error : "",     // error Message를 보내는 것
}

// name(이름), initialState(초기상태), reducer 내용 => 3가지가 필요함 
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers:(builder) => {
        builder
        // 1. 회원가입
        // 1) pending : 회원가입
        .addCase(registerUser.pending, (state) => { // addCase : Case 등록
            state.isLoading = true;
        })
        // 2) fulfilled : 회원가입 성공했을 때
        .addCase(registerUser.fulfilled, (state) => { 
            state.isLoading = false;
            toast.info('회원가입 성공')
        })
        // 3) rejected : 회원가입 실패했을 때
        .addCase(registerUser.rejected, (state, action) => { 
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        // 2. 로그인
        // 1) pending : 로그인
        .addCase(loginUser.pending, (state) => { // addCase : Case 등록
            state.isLoading = true;
        })
        // 2) fulfilled : 로그인 성공했을 때
        .addCase(loginUser.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.userData = action.payload; // action.payload로 가져온 값을 userData에 넣음
            state.isAuth = true; // 로그인 상태 true
            // 브라우저 세션 관리를 위해 Token 사용
            // localStorage : 로컬 스토리지에 값을 저장하는 코드
            // accessToken : 사용자가 로그인하면 서버에서 발급
            localStorage.setItem('accessToken', action.payload.accessToken); // Token 값 저장 : Token 안에 user 정보가 담겨있음
        })
        // 3) rejected : 로그인 실패했을 때
        .addCase(loginUser.rejected, (state, action) => { 
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        // 3. 인증
        // 1) 인증 시도
        .addCase(authUser.pending, (state) => {
            state.isLoading = true;
        })
        // 2) 인증 성공하면 isAuth = true로 변경
        .addCase(authUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload; // 받은 payload 정보 userData에 넣음
            state.isAuth = true;
        })
        // 3) Token이 만료되었을 때
        .addCase(authUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // 에러
            state.userData = initialState.userData; // userData 초기화
            state.isAuth = false;   // 인증 false 설정
            localStorage.removeItem('accessToken'); // Token 없앰
        })



    }
})
// 다른 module에서 사용하기 때문에 export
export default userSlice.reducer;