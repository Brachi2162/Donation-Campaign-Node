const mongoose = require('mongoose');
const CampaignSchema = new mongoose.Schema({
    title: { type: String, default: "קמפיין לב החסד" },
    targetAmount: Number,
    raisedAmount: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false }
});
module.exports = mongoose.model('Campaign', CampaignSchema);