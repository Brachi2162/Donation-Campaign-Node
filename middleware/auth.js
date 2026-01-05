const Fundraiser = require('../DAL/models/Fundraiser');

const canUpdateTarget = async (req, res, next) => {
    const password = req.headers['password'];
    console.log("--- ניסיון עדכן יעד ---");
    console.log("סיסמה שהתקבלה מהדפדפן:", password);

    if (!password) {
        return res.status(403).json({ message: "לא נשלחה סיסמה ב-Headers" });
    }

    try {
        // חיפוש המשתמש - שים לב לשימוש ב-trim() למניעת רווחים מיותרים
        const user = await Fundraiser.findOne({ 
            password: password.trim(), 
            role: 'admin' 
        });

        if (user) {
            console.log("אישור מנהל: נמצא משתמש בשם", user.name);
            next();
        } else {
            console.log("שגיאה: לא נמצא מנהל עם סיסמה זו בבסיס הנתונים");
            res.status(403).json({ message: "סיסמה שגויה או שאינך מנהל" });
        }
    } catch (err) {
        console.error("שגיאה בשרת:", err);
        res.status(500).json({ message: "שגיאה פנימית בשרת" });
    }
};

module.exports = { canUpdateTarget };