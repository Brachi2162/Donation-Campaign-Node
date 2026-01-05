const fundraiserCRUD = require('../DAL/crud/fundraiserCRUD');

exports.getFundraisersList = async () => {
    const list = await fundraiserCRUD.getAll();
    return list.sort((a, b) => b.amountRaised - a.amountRaised);
};