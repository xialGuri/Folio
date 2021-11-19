const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
        // 해당 사용자가 존재하지 않는 경우
        if (!user) {
            return res.json({
                success: false,
                message: '사용자가 존재하지 않습니다.',
            });
        }

        // 해당 사용자가 존재하는 경우
        user.comparePassword(password, (err, isMatch) => {
            // 비밀번호가 일치하지 않는 경우
            if (!isMatch) {
                return res.json({
                    success: false,
                    message: '비밀번호가 일치하지 않습니다.',
                });
            }

            // 그 외는 로그인 성공
            return res.json({
                success: true,
                user: user,
            });
        });
    });
});

// Sign Up
router.post('/signup', (req, res) => {
    const user = new User(req.body);

    // 만약에 해당 이메일로 가입한 유저가 있을 경우 에러 메시지 반환
    User.findOne({ email: user.email }, (err, findUser) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err
            });
        }

        // 해당 이메일 유저가 이미 존재할 경우
        if (findUser) {
            const msg = '해당 이메일 유저가 이미 존재합니다.';
            console.log(msg);
            return res.json({
                success: false,
                msg: msg,
            });
        }
        
        // 존재하지 않을 경우에는 생성
        user.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    error
                });
            }

            // 회원가입 성공
            return res.json({
                success: true,
            });
        });
    });
    
});

// find user info
router.post('/info', (req, res) => {
    const { email } = req.body;

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        return res.json({
            success: true,
            user: user,
        });
    });
});

module.exports = router;