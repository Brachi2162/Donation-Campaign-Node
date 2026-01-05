const express = require('express');
const router = express.Router();
const fundraiserFunctionality = require('../BL/fundraiserFunctionality');

router.get('/', async (req, res) => {
    const list = await fundraiserFunctionality.getFundraisersList();
    res.json(list);
});

module.exports = router;