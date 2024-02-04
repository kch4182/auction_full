// API Handler
// 이 파일은 user에 대한 API를 관리
// 다른 정보에 대한 API를 관리할 거면 따로 파일을 생성해야함
const express = require('express');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

router.get("/auth", auth, (req, res) => {
    // 클라이언트에 return 값 보냄
    return res.status(200).json({
        _id : req.user._id,
        email : req.user.email,
        name : req.user.name,
        role : req.user.role,
        image : req.user.image,
        cart : req.user.cart,
        history : req.user.history,
    });
});

// router를 사용하여 생성

// 1) register에 요청이 왔을 때 전달
router.post('/register', async (req, res, next) => { // 비동기
    // DataBase에 유저가 입력한 정보 저장
    // models/User.js 이용해서 DB에 저장
    try {
        const user = new User(req.body); // User에 대한 객체 생성
        await user.save();  // 비동기로 user 정보 저장
        return res.sendStatus(200); // response가 성공적으로 되면 Status 200 return
    } catch (error) {
        next(error) // error 발생시 next 사용하여 에러 전달
    }
})



// frontend에서 로그인 API를 요청할 때 받아주는 부분
router.post('/login', async(req, res, next) => {

    try {
        // 1) 받은 email 정보가 User안에 있는지 확인
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("아이디를 찾을 수 없습니다.")
        }

        // 2) 아래 선언한 comparePassword 메소드 사용해서 비밀번호 확인
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch){    
            return res.status(400).send("비밀번호가 일치하지 않습니다.")
        
        }

        // 3) Session 유지를 위한 Token 생성 
        const payload = {
            userId : user._id.toHexString() // mongooDB는 ID는 String으로 되어있지 않고 ObjectID로 되어있어 String으로 바꿔야함
        }

        // JWT_SECRET : Token을 생성할 때 필요한 Backend에만 있는 값
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:'1h'}) // Token 유효시간 1시간 설정
        // user의 정보와 Token을 return 
        return res.json({user, accessToken})
    }
    catch(error){
        next(error);
    }
})

// index.js에서 사용하기 때문에 exports
module.exports = router;



