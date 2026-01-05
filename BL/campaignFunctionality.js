const campaignCRUD = require('../DAL/crud/campaignCRUD');

exports.getCampaignStatus = async () => {
    return await campaignCRUD.getCampaign();
};

exports.updateTargetAmount = async (newTarget) => {
    const campaign = await campaignCRUD.getCampaign();
    const isFinished = campaign.raisedAmount >= newTarget;
    return await campaignCRUD.updateCampaign(campaign._id, { 
        targetAmount: newTarget, 
        isCompleted: isFinished 
    });
};