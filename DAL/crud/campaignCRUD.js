const Campaign = require('../models/Campaign');
exports.getCampaign = () => Campaign.findOne();
exports.updateCampaign = (id, data) => Campaign.findByIdAndUpdate(id, data, { new: true });