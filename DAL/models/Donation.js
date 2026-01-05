const mongoose = require('mongoose');
const DonationSchema = new mongoose.Schema({
    amount: Number,
    fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser' },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Donation', DonationSchema);