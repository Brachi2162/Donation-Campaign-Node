// const Donation = require('../models/Donation');

// const createDonation = async (donationData) => {
//     const newDonation = new Donation(donationData);
//     return await newDonation.save();
// };

// const getAllDonations = async () => {
//     return await Donation.find().populate('fundraiser');
// };


// module.exports = { createDonation, getAllDonations };
const Donation = require('../models/Donation');
exports.create = (data) => new Donation(data).save();