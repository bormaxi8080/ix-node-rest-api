const { secretKey } = require("../config")
const jwt = require("jsonwebtoken")

module.exports = (roles) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(403).json({ message: "User not auth" })
    }

    const { role } = jwt.verify(token, secretKey)
    console.log(roles)
    if (!roles.includes(role) && roles.length) {
        return res.status(403).json({ message: "No access" })
    }

    next()
}