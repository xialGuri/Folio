const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    return res.json({
        success: true,
        testData: '백에서 보낸 테스트 문자열입니다. 잘 전달받으셨나요?',
    });
});

module.exports = router;