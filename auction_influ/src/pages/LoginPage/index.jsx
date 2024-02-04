// 로그인 Page
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/thunkFunctions'


const LoginPage = () => {
  const {
    register, // 입력 요소를 react-hook-form에 등록하여 입력 값을 추적하고 유효성 검사 규칙 설정
    handleSubmit, // Form 제출 시 실행할 함수 정의 
    formState : { errors }, // 유효성 체크를 하여 통과하지 못하면 error 메시지 보여줌 -> required  -> errors.email.message  
    reset // reset() 호출하면 해당 value들을 초기화 
    } = useForm({ mode : 'onChange'})    // onChange mode는 입력 값이 변경될 때마다 유효성 검사가 자동으로 이루어져 사용자에게 실시간으로 오류 메시지 전달
 
  // BackEnd로 액션을 보낼 때 사용할 dispatch
 const dispatch = useDispatch();
  
 // 객체를 받아옴
 const onSubmit = ({email, password}) => {
  
   const body = {
     email,
     password,
   }
 
   dispatch(loginUser(body)); // dispatch함수를 사용해 body를 전송 => registerUser : store/thunkFunctions.js

   reset();
 }
  // 오류 메시지를 담을 변수
  const userEmail = {
    required :  "필수 필드입니다.",
  }

  const userPassword = {
    required :  "필수 필드입니다.", 
    minLength: {
      value : 6,
      message : "최소 6자리입니다."
    }
  }
  
  
  
  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>

    <div className='p-6 bg-white rounded-md shadow-md'>
      <h1 className='text-3xl font-semibold text-center py-5'>
        로그인
      </h1>
      <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='mb-2'>
          <label
            htmlFor = 'email'
            className='text-m font-semibold text-gray-800'
            >아이디
          </label>
          <input
            type='email'
            id='email'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register("email", userEmail)}
            />
          {
            errors?.email && 
              <div>
                <span className='text-red-500'>
                  {errors.email.message} {/* 'message' 속성 사용 */}
                </span>
              </div>
          }
        </div>

        <div className='mb-2'>
          <label
            htmlFor = 'password'
            className='text-m font-semibold text-gray-800'
            >비밀번호
          </label>
          <input
            type='password'
            id='password'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('password', userPassword)}
            />
          {
            errors?.password && (
              <div>
                <span className='text-red-500'>
                  {errors.password.message} {/* 'message' 속성 사용 */}
                </span>
              </div>
            )
          }
        </div>

            
        <div className='mt-6'>
          <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 duration-200'>
            로그인</button>
        </div>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          아이디가 없다면?{" "}
          <a
            href='/register'
            className='font-medium hover:underline'>
            회원가입
          </a>
        </p>
        </form>
        
    </div>

    
  </section>
  )
}

export default LoginPage