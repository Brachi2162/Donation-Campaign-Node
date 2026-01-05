const express = require('express');
const router = express.Router();
const campaignCRUD = require('../DAL/crud/campaignCRUD');
const { canUpdateTarget } = require('../middleware/auth');

router.get('/info', async (req, res) => {
    const data = await campaignCRUD.getCampaign();
    res.json(data);
});

router.put('/target', canUpdateTarget, async (req, res) => {
    const campaign = await campaignCRUD.getCampaign();
    const newTarget = Number(req.body.newTarget);
    const finished = campaign.raisedAmount >= newTarget;
    
    const updated = await campaignCRUD.updateCampaign(campaign._id, { 
        targetAmount: newTarget, 
        isCompleted: finished 
    });
    
    req.app.get('socketio').emit('campaignUpdate', { campaign: updated });
    res.json(updated);
});

module.exports = router;