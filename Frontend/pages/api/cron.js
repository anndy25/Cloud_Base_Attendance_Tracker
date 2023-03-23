import axios from 'axios';

export default async function handler(req, res) {

    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/class/scheduler`)
    res.status(200).json({ success: true });

}