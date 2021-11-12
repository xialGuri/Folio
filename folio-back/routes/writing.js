const express = require('express');
const router = express.Router();

const { Writing } = require('../models/Writing');

router.post('/new', (req, res) => {
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

module.exports = router;