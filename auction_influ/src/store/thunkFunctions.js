import axiosInstance from "../utils/axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

// thunkAPI : Redux Thunk API 객체입니다. 이 객체를 통해 현재의 thunk에서 Redux 상태를 조작하거나 다른 액션을 디스패치(dispatch)할 수 있음
// 1. 회원가입 API 요청 처리
export const registerUser = createAsyncThunk( // createAsyncThunk : 
    "user/registerUser", //payloadCreator
    // async 사용하여 다른 파일에서 인자 받아옴
    // payloadCreator
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`, // EndPoint
                body             
            )

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

// 2. 로그인 API 요청 처리
export const loginUser = createAsyncThunk( // createAsyncThunk : 
    "user/loginUser", //payloadCreator
    // async 사용하여 다른 파일에서 인자 받아옴
    // payloadCreator
    async (userData, thunkAPI) => {
        try {
            console.log('thunklocal:', localStorage)
            const response = await axiosInstance.post(
                `/users/login`, // EndPoint
                userData,        // email, password 값 담음
            )

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

// 3. Token 유효 API 요청 처리
export const authUser = createAsyncThunk( // createAsyncThunk : 
    "user/authUser", //payloadCreator
    // async 사용하여 다른 파일에서 인자 받아옴
    // payloadCreator
    // thunkAPI는 항상 2번째 매개변수
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/users/auth`
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)
