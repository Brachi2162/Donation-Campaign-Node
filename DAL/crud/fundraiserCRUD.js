
const Fundraiser = require('../models/Fundraiser');



exports.getAll = async () => await Fundraiser.find().populate('group');

exports.getById = async (id) => {
    return await Fundraiser.findById(id).populate('group');
};

exports.updateFundraiserBalance = async (id, amt) => {
    return await Fundraiser.findByIdAndUpdate(
        id, 
        { $inc: { amountRaised: amt } }, 
        { new: true } 
    );
};