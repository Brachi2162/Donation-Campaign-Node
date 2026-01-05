const groupCRUD = require('../DAL/crud/groupCRUD');

exports.getGroupsList = async () => {
    return await groupCRUD.getAll();
};