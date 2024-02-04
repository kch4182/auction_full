// DataBase에 user에 대한 schema를 생성하고 schema를 이용해서 model을 생성하고 dataBase에 Data 삽입, 삭제, 가져오기, 수정 등을 함
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')

// user 스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength : 50
    },
    email:{
        type : String,
        trim : true,  // 빈칸을 없애줌
        unique : true,
    },
    password:{
        type : String,
        minLength : 5,
    },
    role:{
        type : Number,
        default : 0,
    },
    image : String
})
// pre : previous
// save하기 전에 함수 호출
userSchema.pre('save', async function(next){
    let user = this;

    if(user.isModified('password')){ // user의 password가 수정되면 아래 코드 실행
        const salt = await bcrypt.genSalt(10); // 1) bcrypt 사용하여 랜덤 salt 값 생성
        const hash = await bcrypt.hash(user.password, salt); // 2) hash 사용하여 암호화
        user.password = hash;  // 3) hash된 값 비밀번호 저장
    }
    next();
})

// 비밀번호 비교하는 메소드 생성
userSchema.methods.comparePassword = async function (plainPassword) {
    let user = this;
    console.log(user);
    // user.password : DB에 저장되어 있는 인코딩된 암호
    // plainPassword : 사용자가 입력한 비밀번호를 인코딩한 값 
    // bcrypt 사용하여 plainPassword 값 인코딩한 후 user.password와 비교
    const match = await bcrypt.compare(plainPassword, user.password); // compare를 사용하여 두 개가 일치한지 확인
    return match;
}

// 위에 스키마 사용해서 User 모델 생성 => 때문에 이 코드는 스키마 아래에 위치해야 함
const User = mongoose.model("User", userSchema);

// 다른 파일에서 사용하기 위해 exports
module.exports = User;