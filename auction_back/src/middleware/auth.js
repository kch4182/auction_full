// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

let auth = async (req, res, next) => {
    // req.headers에서 토큰 부분 가져옴
    const authHeader = req.headers['authorization'];
    console.log('authHeader:', authHeader);

    // Bearer를 제외한 토큰 나머지 부분 가져옴
    // authHeader가 있다면 authHeader를 split으로 나눠줌
    const token = authHeader && authHeader.split(' ')[1]; // Bearer를 없애기 위해 space split 사용하여 없앰 => 뒷부분 토큰 부분만 token에 저장
    console.log('token:', token);
    if (!token) return res.sendStatus(401);

    // token이 있으면 유효한지 확인
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); 
        // token을 가져와서 decode 안에 있는 _id 값이 User에 있는지 찾음
        const user = await User.findOne({ "_id" : decode.userId });
        if (!user) {
            return res.status(400).send('존재하지 않는 유저입니다.');
        }
        // user가 있다면 req.user에 넣음
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = auth;