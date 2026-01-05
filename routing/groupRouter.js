const express = require('express');
const router = express.Router();
const groupFunctionality = require('../BL/groupFunctionality');

router.get('/', async (req, res) => {
    const list = await groupFunctionality.getGroupsList();
    res.json(list);
});

module.exports = router;