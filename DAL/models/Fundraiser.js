const mongoose = require('mongoose');

const fundraiserSchema = new mongoose.Schema({
    name: String,
    password: { type: String, required: true },
    role: { type: String, default: 'fundraiser' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, 
    amountRaised: { type: Number, default: 0 }
});

module.exports = mongoose.model('Fundraiser', fundraiserSchema);