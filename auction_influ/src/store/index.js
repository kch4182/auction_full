import { combineReducers, configureStore } from "@reduxjs/toolkit";
// userSlice의 reducer를 가져옴
// Reducer는 새로운 Store를 생성하고, 상태를 업데이트
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH, PAUSE, PERSIST, PURGE, REGISTER,
    REHYDRATE, persistReducer, persistStore
} from 'redux-persist';

// 여러 개의 reducer들을 combineReducers를 사용하여 하나의 reducer로 합쳐줌
const rootReducer = combineReducers({
    // 아래 코드와 같은 형식으로 여러 개 Reducer들을 작성
    user : userReducer
});

// redux의 지속성을 관리하기 위한 객체
const persistConfig = {
    key : "root", // key 이름
    storage,      // localStorage에 저장
    // whitelist : [] // 여러 reducer 중 해당 reducer만 localStorage에 저장
    // blacklist : [] // 해당 reducer만 제외하고 저장

};

// 매개변수로 persistConfig와 baseReducer인 rootReducer를 넣어줌
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore : Redux의 Store를 생성
export const store = configureStore({
    reducer : persistedReducer, // 변수명 : reducer => reducer는 상태를 변화시키는 함수
    // getDefaultMiddleware : 기본으로 포함된 middleware들을 얻을 수 있게 해주는 함수
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Action의 Type들을 무시
            },  // serializableCheck : object 값을 string 값으로 변환
        }),
    })

export const persistor = persistStore(store);
