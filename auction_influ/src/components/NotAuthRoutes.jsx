// 로그인된 사람이 로그인 페이지나 회원가입 페이지를 들어가지 못하도록 하는 파일
// rafce
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

// 
const NotAuthRoutes = ({ isAuth }) => {
  return (
    // isAuth가 true라면 초기화면(LandingPage)으로 이동 false라면 설정한 <>인 login, register로 이동 가능
    isAuth ? <Navigate to = {'/'} /> : <Outlet />
  )
}


export default NotAuthRoutes