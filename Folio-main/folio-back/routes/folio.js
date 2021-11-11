const express = require('express');
const router = express.Router();

const { Folio } = require('../models/Folio');

router.post('/', (req, res) => {
    const { email } = req.body;

    Folio.findOne({ email: email }, (err, folio) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        return res.json({
            success: true,
            folio: folio,
        });
    });
});

router.post('/writing', (req, res) => {
    const folio = new Folio(req.body);

    Folio.findOne({ email: req.body.email }, (err, f) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err
            });
        }

        // 해당 사용자의 포트폴리오가 없을 경우
        if (!f) {
            folio.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        err
                    });
                }

                // 포트폴리오 등록 성공
                return res.json({
                    success: true,
                });
            });
        }
        // 해당 사용자의 포트폴리오가 이미 있을 경우 수정하여 저장
        else {
            Folio.updateOne({ email: req.body.email },
                {"$set":
                    {
                        "stacks": req.body.stacks,
                        "workData": req.body.workData,
                        "intro": req.body.intro,
                        "githubLink": req.body.githubLink
                    }
                }, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        err
                    });
                }

                // 포트폴리오 수정 성공
                return res.json({
                    success: true,
                });
            });
        }
    });
    
});

module.exports = router;