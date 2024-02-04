const express = require('express'); // express module 가져옴
const path = require('path')
const port = 4000;  // PORT 설정
// const HOST = '0.0.0.0'; // HOST 지정
const cors = require('cors'); // cors module 가져옴
// APP
const app = express(); // express() 사용하여 App 생성
// Mongoose 연결
const mongoose = require('mongoose');

// 환경변수 연결
const dotenv = require('dotenv');
dotenv.config();

const { error } = require('console');
app.use(cors());  // CORS 미들웨어를 사용하여 Cross-Origin Resource Sharing 허용
app.use(express.json()); // JSON 파싱 미들웨어를 사용하여 요청 본문의 JSON 데이터를 파싱

// Mongoose 코드 추가
mongoose.connect(process.env.MONGO_URI) // connect 사용하여 env 파일과 연결
.then(() => {
    console.log('연결 선공')
})
.catch(error => {
    console.log('몽구스 연결 실패')
    console.error(error);
}) 

// /(root)경로로 GET요청이 들어왔을 때 setImmediate를 사용하여 비동기 에러를 설정하고 
app.get('/', (req, res, next) => {
    setImmediate(() => { next( new Error('it is a error')) }); // 비동기 에러는 next를 사용해서 강제로 보내야 함
})  // setImmediate는 비동기적으로 콜백 함수를 실행해서 오류를 발생시켜 next 함수를 사용하여 에러 메시지 전달

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

// /users에 경로에 대한 요청을 설정한 경로로 전달
app.use('/users', require('./routes/users'));


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error.message|| '에러가 발생했습니다.');
})

// express.static() : backend에서 정적인 파일을 보낼 수 있게 해줌
// 절대 경로를 사용하는 것이 오류가 안남
app.use(express.static(path.join(__dirname, '../uploads')));//app.use('/가상경로', express.static('uploads')) -> 이런 식으로 가상경로를 설정할 수 있음

// listen method를 사용해서 app을 4000번 포트로 실행할 수 있음
// Terminal -> node index.js
app.listen(port, () => {
    console.log(`${port}성공실행`);
});