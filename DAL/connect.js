const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/maching_db');
        console.log("מחובר ל-MongoDB בהצלחה");
    } catch (err) {
        console.error("שגיאת חיבור:", err);
    }
};

module.exports = connectDB; 