const donationCRUD = require('../DAL/crud/donationCRUD');
const fundraiserCRUD = require('../DAL/crud/fundraiserCRUD');
const groupCRUD = require('../DAL/crud/groupCRUD');
const campaignCRUD = require('../DAL/crud/campaignCRUD');

exports.processDonation = async (amount, fundraiserId, io) => {
    const donationAmount = Number(amount);

    const donationData = { amount: donationAmount };
    if (fundraiserId && fundraiserId.trim() !== "") {
        donationData.fundraiser = fundraiserId;
    }

    await donationCRUD.create(donationData);

    if (fundraiserId && fundraiserId.trim() !== "") {
        const fundraiser = await fundraiserCRUD.getById(fundraiserId);
        if (fundraiser) {
            await fundraiserCRUD.updateFundraiserBalance(fundraiserId, donationAmount);
            if (fundraiser.group) {
                await groupCRUD.updateGroupBalance(fundraiser.group, donationAmount);
            }
        }
    }

    // 3. עדכון הקמפיין הכללי
    const campaign = await campaignCRUD.getCampaign();
    const newTotal = Number(campaign.raisedAmount || 0) + donationAmount;
    const isFinished = newTotal >= campaign.targetAmount;

    const updated = await campaignCRUD.updateCampaign(campaign._id, { 
        raisedAmount: newTotal, 
        isCompleted: isFinished 
    });

    if (io) {
        io.emit('campaignUpdate', { 
            campaign: updated,
            lastDonation: donationAmount 
        });
    }

    return updated;
};