// import './App.css'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './pages/LandingPage/index.jsx'
import RegisterPage from './pages/RegisterPage/index.jsx'
import LoginPage from './pages/LoginPage/index.jsx'
import NavBar from './layout/NavBar/index.jsx'
import Footer from './layout/Footer/index.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authUser } from './store/thunkFunctions'
import { useDispatch, useSelector } from 'react-redux';
import ProtectedPage from './pages/ProtectedPage/index.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import NotAuthRoutes from './components/NotAuthRoutes.jsx'


function Layout () {
  return (
    <div className ='flex flex-col h-screen justify-between' >
      <ToastContainer
      position = 'bottom-right'
      theme = 'light'
      pauseOnHover
      autoClose = {1500}
      />
      <NavBar />
      <main className = 'mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )

}
function App() {
  // 1) Redux 관련
  // Token 유효 확인 : isAuth가 true이면 유효
  const dispatch = useDispatch(); // useDispatch : dispatch를 사용할 수 있는 함수

  // useSelector : Redux store에서 상태 값을 가져오기 위한 Hook
  // ?.(optional chaning)을 사용해서 state.user에 값이 없어도 에러가 발생하지 않음
  const isAuth = useSelector(state => state.user?.isAuth ); // state.user에 값이 있다면 isAuth 속성에 접근
  
  // 2) Router 관련
  // useLocation : React Router에서 현재 경로(location) 정보를 가져오는 Hook
  const { pathname } = useLocation();

  // 3) isAuth, pathname, dispatch 값 중 하나라도 변경되면 authUser 액션이 dispatch됨
  useEffect(() => {
    // isAuth가 true일 때만 dispatch(authUser()); 실행
    if(isAuth) {
      dispatch(authUser()); 
  }
  }, [dispatch, isAuth, pathname]) // pathname : page 경로


  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />}/>

        {/* 로그인한 사용자만 갈 수 있는 경로 */}
        <Route element = {< ProtectedRoutes isAuth={isAuth}/>}>
          <Route path='/protected' element={<ProtectedPage/>}/>
        </Route>
      
        <Route element = {< NotAuthRoutes isAuth ={isAuth}/>}>
        {/* 로그인한 사용자는 갈 수 없는 경로 */}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      </Route>

    </Routes>
    
  )
}

export default App
