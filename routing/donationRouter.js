const express = require('express');
const router = express.Router();
const donationFunctionality = require('../BL/donationFunctionality');

router.post('/', async (req, res) => {
    try {
        const { amount, fundraiserId } = req.body;
        
        const io = req.app.get('socketio'); 
        
        const updated = await donationFunctionality.processDonation(amount, fundraiserId, io);
        
        res.json(updated);
    } catch (err) {
        console.error("Router Error:", err);
        res.status(500).json({ error: "שגיאה בביצוע התרומה" });
    }
});

module.exports = router;