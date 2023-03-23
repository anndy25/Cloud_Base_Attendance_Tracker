import cron from "node-cron";
import ClassModel from "../models/class";
import StudentModel from "../models/student";

function formatDateTime(date:Date):string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dayOfWeek} ${hours}.${minutes}`;
  }

 const scheduler = async () => {
    cron.schedule('*/59 * * * *', async () => {
        try {

            // console.log("1min")
            // await ClassModel.updateMany({}, { $set: { notifications: [] } });
            // await StudentModel.updateMany({}, { $set: { status: {} } });
            console.log(`deleted old data in notifications ${formatDateTime(new Date())}`);

        } catch (err) {
            console.log(err);
        }
    })
}

export default scheduler;