const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./DAL/connect.js');
const campaignRouter = require('./routing/campaignRouter');
const donationRouter = require('./routing/donationRouter');
const fundraiserRouter = require('./routing/fundraiserRouter');
const groupRouter = require('./routing/groupRouter');

const Campaign = require('./DAL/models/Campaign');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('socketio', io);
app.use(express.json());
app.use(express.static('public'));

connectDB();
const Group = require('./DAL/models/Group');
const Fundraiser = require('./DAL/models/Fundraiser');

const seedDB = async () => {
    try {
        const Fundraiser = require('./DAL/models/Fundraiser');
        const Group = require('./DAL/models/Group');
        const Campaign = require('./DAL/models/Campaign');

        // 1. ניקוי נתונים קודמים כדי למנוע כפילויות ובעיות קישור
        await Fundraiser.deleteMany({});
        await Group.deleteMany({});
        
        // בדיקת קמפיין - יצירה רק אם לא קיים
        const campaignCount = await Campaign.countDocuments();
        if (campaignCount === 0) {
            await new Campaign({ targetAmount: 100000, raisedAmount: 0 }).save();
        }

        // 2. יצירת 2 הקבוצות
        const groupA = await new Group({ name: "קהילת צפון", totalRaised: 0 }).save();
        const groupB = await new Group({ name: "ישיבת ההיכל", totalRaised: 0 }).save();

        // 3. יצירת 10 מתרימים (5 לכל קבוצה)
        const fundraisersData = [
            // קבוצה א'
            { name: "משה כהן", password: "123", role: "admin", group: groupA._id },
            { name: "יעקב לוי", password: "111", role: "fundraiser", group: groupA._id },
            { name: "אברהם ישראלי", password: "222", role: "fundraiser", group: groupA._id },
            { name: "דניאל מזרחי", password: "333", role: "fundraiser", group: groupA._id },
            { name: "יוסף פרידמן", password: "444", role: "fundraiser", group: groupA._id },
            // קבוצה ב'
            { name: "דוד לוי", password: "456", role: "fundraiser", group: groupB._id },
            { name: "שמעון אטיאס", password: "555", role: "fundraiser", group: groupB._id },
            { name: "חיים שטיין", password: "666", role: "fundraiser", group: groupB._id },
            { name: "מאיר גולדנברג", password: "777", role: "fundraiser", group: groupB._id },
            { name: "נתנאל חדד", password: "888", role: "fundraiser", group: groupB._id }
        ];

        await Fundraiser.insertMany(fundraisersData);

        console.log("✅ בסיס הנתונים אותחל: 2 קבוצות ו-10 מתרימים מקושרים נוצרו!");
    } catch (e) {
        console.error("שגיאה באתחול הנתונים:", e);
    }
};
seedDB();


app.use('/api/campaign', campaignRouter);
app.use('/api/donate', donationRouter);
app.use('/api/fundraisers', fundraiserRouter);
app.use('/api/groups', groupRouter);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const resetData = async () => {
    const Fundraiser = require('./DAL/models/Fundraiser');
    const Group = require('./DAL/models/Group');
    const Campaign = require('./DAL/models/Campaign');
    const Donation = require('./DAL/models/Donation');

    await Fundraiser.updateMany({}, { amountRaised: 0 });
    await Group.updateMany({}, { totalRaised: 0 });
    await Campaign.updateMany({}, { raisedAmount: 0 });
    await Donation.deleteMany({}); 
    console.log("✅ המערכת אותחלה בהצלחה ל-0");
};
//resetData()
