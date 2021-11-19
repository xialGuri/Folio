const express = require('express');
const router = express.Router();

const { Writing } = require('../models/Writing');
const { User } = require('../models/User');
const { Folio } = require('../models/Folio');
const { Follow } = require('../models/Follow');

// 사용자 검색
router.post('/search', (req, res) => {
    const searchText = req.body.searchText;

    User.find({ name: { $regex: searchText } })
        .exec((err, userInfo) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    err,
                });
            }

            return res.json({
                success: true,
                userInfo,
            });
        });
});

// 팔로워 + 내 글 찾기
router.post('/writing', (req, res) => {
    const email = req.body.email;

    const promise = new Promise((resolve, reject) => {
        let followers = []
        
        // 1. 내 이메일 기반 팔로워 목록 찾기
        Follow.find({ myEmail: email }, (err, people) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    err,
                });
            }
            followers = people;
        });
        setTimeout(() => resolve(followers), 200);
    })
        .then(async value => {
            // 2. 팔로우 목록의 이메일과 내 이메일을 합쳐서 새로운 배열 생성
            const emails = makeEmailArr(value, email);
            console.log(emails);
            
            // 3. 목록의 글 불러오기
            const promise = new Promise((resolve, reject) => {
                let allWritings = []
                
                emails.map(email => {
                    Writing.find({ email: email }, (err, writings) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                err,
                            });
                        }
                        
                        allWritings = allWritings.concat(writings);
                    });
                });
                setTimeout(() => resolve(allWritings), 300);
            })
                .then(value2 => {
                    console.log(value2);
                    return res.json({
                        success: true,
                        writings: value2,
                    })
                });
        });
});

// 이메일만 뽑아내서 배열 만드는 함수
const makeEmailArr = (followers, myEmail) => {
    const rtn = [myEmail];

    followers.map(follower => {
        console.log(follower.userEmail);
        rtn.push(follower.userEmail);
    });

    return rtn;
};

// 특정 사용자의 글만 찾기
router.post('/writing/user', (req, res) => {
    console.log(req.body.email);
    const email = req.body.email;

    Writing.find({ email: email }, (err, writings) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        return res.json({
            success: true,
            writings,
        });
    });
});

// 새 글 작성
router.post('/writing/new', (req, res) => {
    const writing = new Writing(req.body);

    writing.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        // 작성 성공
        return res.json({
            success: true,
        });
    });
    
});

// 추천하는 사람 찾기
router.post('/recommend', async (req, res) => {
    const email = req.body.email;

    const promise = new Promise((resolve, reject) => {
        let stacks = [];
        // 1. 내 이메일을 사용하여 내 기술 스택 불러오기
        Folio.findOne({ email: email }, (err, folio) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    err,
                });
            }

            // 포트폴리오가 작성되지 않은 경우
            if (!folio) {
                return res.json({
                    success: true,
                    msg: '포트폴리오의 기술/스택 부분을 작성하신 뒤 사용하실 수 있는 부분입니다.',
                });
            }

            // 포트폴리오의 기술/스택이 작성되지 않은 경우
            if (!folio.stacks) {
                return res.json({
                    success: true,
                    msg: '포트폴리오의 기술/스택 부분을 작성하신 뒤 사용하실 수 있는 부분입니다.',
                });
            }

            stacks = folio.stacks;
        });
        setTimeout(() => resolve(stacks), 500);
    })
        .then(value => {
            const promise = new Promise((resolve, reject) => {
                // 2. 내 기술 스택을 사용하여 해당 기술 스택을 보유한 사용자 목록 불러오기
                const users = searchFolioByStacks(value, email);
                setTimeout(() => resolve(users), 400);
            })
                .then(async value2 => {
                    if (value2.length <= 5) {
                        return res.json({
                            success: true,
                            people: value2,
                        });
                    }
                    
                    // 3. 5명보다 많으면 해당 목록에서 랜덤 5명의 정보 반환
                    min = 0;
                    max = value2.length;
                    let rtnPeople = [];
                    for (let i = 0; i < 5; i++) {
                        rtnPeople.push(value2[Math.floor(Math.random() * (max - min)) + min]);
                    }
                    return res.json({
                        success: true,
                        people: rtnPeople,
                    });
                });
        });
});

const searchFolioByStacks = async (stacks, me) => {
    let rtn = [];

    const promise = await new Promise((resolve, reject) => {
        let allUsers = [];

        stacks.forEach(stack => {
            // 1. 해당 스택을 가진 포트폴리오 검색
            Folio.find({ "stacks": stack }, (err, folio) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        err,
                    });
                }
    
                // 2. 해당 포트폴리오의 이메일을 이용하여 사용자 검색
                const promise = new Promise((resolve, reject) => {
                    const users = searchUserInfo(folio, me);
                    setTimeout(() => resolve(users), 200);
                })
                    .then(async value2 => {
                        allUsers = await allUsers.concat(value2);
                    });
            });
        });
        setTimeout(() => resolve(allUsers), 300);
    })
        .then(async value => {
            rtn = await rtn.concat(value);
            rtn = await rtn.filter((item, pos) => rtn.indexOf(item) === pos);
        })

    return await rtn;
};

const searchUserInfo = async (folios, me) => {
    let rtn = [];

    const promise = await new Promise((resolve, reject) => {
        const users = [];
        const emails = [];

        folios.forEach(async folio => {
            if (folio.email !== me && !emails.includes(folio.email)) {
                User.findOne({ email: folio.email }, async (err, user) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            err,
                        });
                    }
    
                    await users.push(user);
                    await emails.push(user.email);
                });
            }
        });
        setTimeout(() => resolve(users), 100);
    })
        .then(value => {
            rtn = value;
        });

    return await rtn;
};

module.exports = router;