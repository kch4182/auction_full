// 로그인 안 된 사람이 로그인 된 사람만 들어갈 수 있는 Page에 들어갔을 때 로그인 페이지로 이동시켜주는 Component
// 확장 패키지에서 es7 설치 후 rafce 사용
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// isAuth = true 일 경우에만 접근가능
const ProtectedRoutes = ({ isAuth }) => {
  return (
    // isAuth = true라면 Outlet 사용, false라면 /login으로 이동 
    isAuth ? <Outlet /> : <Navigate to = {'/login'} />
  )
}

export default ProtectedRoutes