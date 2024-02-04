import React, {useState}from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/thunkFunctions'

const RegisterPage = () => {
  const {
    register, // 입력 요소를 react-hook-form에 등록하여 입력 값을 추적하고 유효성 검사 규칙 설정
    handleSubmit, // Form 제출 시 실행할 함수 정의 
    formState : { errors }, // 유효성 체크를 하여 통과하지 못하면 error 메시지 보여줌 -> required  -> errors.email.message  
    reset // reset() 호출하면 해당 value들을 초기화 
    } = useForm({ mode : 'onChange'})    // onChange mode는 입력 값이 변경될 때마다 유효성 검사가 자동으로 이루어져 사용자에게 실시간으로 오류 메시지 전달

  // BackEnd로 액션을 보낼 때 사용할 dispatch
  const dispatch = useDispatch();
  
  // 객체를 받아옴
  const onSubmit = ({email, password, name}) => {

    const body = {
      email,
      password,
      name,
      image : 'https://via.placeholder.com/600x400?text=no+user+image'
    }
  
    dispatch(registerUser(body)); // dispatch함수를 사용해 body를 전송 => registerUser : store/thunkFunctions.js

    reset();
  }
  
  // 오류 메시지를 담을 변수
  const userEmail = {
    required :  "필수 필드입니다.",
  }

  const userName = {
    required :  "필수 필드입니다.",
  }
  
  const userPassword = {
    required :  "필수 필드입니다.", 
    minLength: {
      value : 6,
      message : "최소 6자리입니다."
    }
  }
  // 전체 약관동의 상태확인
  const [allAgreed, setallAgreed] = useState(false); 
  // 개별 약관동의 상태 확인 초기화
  const [agreements, setAgreements] = useState({
    auctionAgreed : false, // 온라인 경매 약관 동의
    termsAgreed : false,  // 이용약관 동의(필수)
    personalInfoAgreed : false, // 개인정보 이용 수집 동의(필수)
    eventAlarmAgreed : false, // 경매알림, 이벤트 및 메일 수신 동의 
  })

  // 약관동의 단일 항목 이벤트 핸들러
  const handleAgreementChange = (event) => {
    const { name, checked } = event.target; // event.target은 동의 체크박스
    // prevAgreements는 처음 agreements 값
    // ...(전개 연산자)는 배열이나 객체 내의 값을 펼쳐서 개별 요소로 가져오는 역할을 함
    setAgreements((prevAgreements) => ({...prevAgreements, [name] : checked }));

    const allChecked = Object.values({...agreements, [name] : checked}).every(
      (value) => value === true
    );
    setallAgreed(allChecked);
  }

  // 약관동의 전체 항목 이벤트 핸들러
  const handleAllAgreementChange = (event) => {
    const { checked } = event.target;
    setAgreements((prevAgreements) => Object.keys(prevAgreements).reduce(
      (newAgreements, agreementKey) => ({...newAgreements, [agreementKey] : checked,}),
      {}
      ) 
    );
    setallAgreed(checked);
  };


  // handleSubmit을 사용하여 onSubmit함수 실행
  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>

      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>
          회원가입
        </h1>
        <div className='text-m text-right'> <b className = 'text-red-500'>* </b>필수 </div>
        <div className="border-b border-gray-500 py-3"></div>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          
          <div className='mb-2'>
            <label
              htmlFor = 'email'
              className='text-m font-semibold text-gray-800'
              >이메일 <b className = 'text-red-500'>* </b>
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
              >비밀번호 <b className = 'text-red-500'>* </b>
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

          <div className='mb-2'>
            <label
              htmlFor = 'name'
              className='text-m font-semibold text-gray-800'
              >성명(실명) <b className = 'text-red-500'>* </b>
            </label>
            <input
              type='text'
              id='name'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register("name", userName)}
              />
              {
                errors?.name &&
                <div>
                  <span className='text-red-500'>
                    {errors.name.message}
                  </span>
                </div>
              }
            
          </div>
              
          <section className='flex flex-col justify-center mt-5 max-w-[400px] m-auto'>
            <div>
              
              <label className='text-xl font-semibold text-center' > 약관동의</label>
              <div className="border-b border-gray-500 py-0.2 pb-3"></div>
              <ul className = "py-4">
                <li>
                  <input
                  type="checkbox" 
                  id = "agree_check_all"
                  name = "agree_check_all"
                  checked={allAgreed}
                  onChange = {handleAllAgreementChange}
                  />
                  <label className = "text-m "htmlFor = "agree_check_all"><b>전체동의</b></label>
                  <div className="border-b border-gray-500/ py-2"></div>
                </li>
                
                <li className = "text-sm pt-2 py-1">
                  <input 
                  type = "checkbox"
                  id = "agree_check_auction"
                  name = "auctionAgreed"
                  required
                  checked = {agreements.auctionAgreed}
                  onChange={handleAgreementChange} 
                  />
                  <label htmlFor = "agree_check_auction"><b>  [필수]  </b>온라인 경매 약관 동의</label>
                </li>

                <li className = "text-sm py-1">
                  <input 
                  type = "checkbox"
                  id = "agree_check_terms"
                  name = "termsAgreed"
                  required
                  checked = {agreements.termsAgreed}
                  onChange={handleAgreementChange} 
                  />
                  <label htmlFor = "agree_check_terms"><b>  [필수]  </b>이용약관 동의</label>
                </li>

                <li className = "text-sm py-1">
                  <input 
                  type = "checkbox"
                  id = "agree_check_info"
                  name = "personalInfoAgreed"
                  required
                  checked = {agreements.personalInfoAgreed}
                  onChange={handleAgreementChange} 
                  />
                  <label htmlFor = "agree_check_info"><b>  [필수]  </b>개인정보 이용 수집 동의</label>
                </li>

                <li className = "text-sm py-1">
                  <input 
                  type = "checkbox"
                  id = "agree_check_event"
                  name = "eventAlarmAgreed"
                  required
                  checked = {agreements.eventAlarmAgreed}
                  onChange={handleAgreementChange} 
                  />
                  <label htmlFor = "agree_check_event"><b>  [선택]  </b>경매알림, 이벤트 및 메일 수신 동의</label>
                </li>
              </ul>
            </div>
              
          </section>
          {/* 약관동의 */}
          
          <div className='mt-6'>
            <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 duration-200'>
              회원가입</button>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            아이디가 있다면?{" "}
            <a
              href='/login'
              className='font-medium hover:underline'>
              로그인
            </a>
          </p>
          </form>
          
      </div>

      
    </section>
  )
}

export default RegisterPage;