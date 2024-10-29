
const Notification = require('../models/Notification');

const cleanOldNotifications = async () => {

  await Notification.deleteMany({
    $expr: { $eq: [{ $size: "$seenBy" }, "$totalRecipients"] }
   
  });
};

// after every 5 minutes cleanup operation 
setInterval(cleanOldNotifications, 5 * 60 * 1000);

