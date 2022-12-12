var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const { _id } = jwt.verify(token, JWT_SECRET);
        req.id = _id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;