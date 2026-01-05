const Group = require('../models/Group');

exports.getAll = async () => await Group.find();

exports.updateGroupBalance = async (id, amt) => {
    return await Group.findByIdAndUpdate(
        id, 
        { $inc: { totalRaised: amt } }, 
        { new: true }
    );
};