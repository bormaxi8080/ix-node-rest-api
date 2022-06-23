const pool = require("../db/pool")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../config")
const express = require("express")
const role = require("../middleware/role")
const router = express.Router()
const bcrypt = require("bcrypt")

const accountController = {
    async registration(req, res) {
        const { login } = req.fields
        await pool.query(`INSERT INTO users (role, login) VALUES ('${login}')`)
        res.status(200).json({ message: "successfully" })
    },

    async login(req, res) {
        const { username, password } = req.fields
        console.log(req.fields)

        const { rows } = await pool.query(`SELECT * FROM users WHERE login = '${username}'`)
        console.log(rows)

        if (!rows.length) {
            return res.status(404).json({ message: "User not found" })
        }

        const user = rows[0]

        if (password !== user.password) {
            return res.status(404).json({ message: "Incorrect password" })
        }

        if (user.role === "insurance_company") {
            const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE account_id = ${user.id}`)
            user.insurance_company_id = insuranceCompany.id
        }

        const token = jwt.sign({
            role: user.role,
            id: user.id
        }, secretKey)

        return res.send({ token, user })
    },

    async get(req, res) {
        const token = req.headers.authorization?.split(" ")[1]

        const { id } = jwt.verify(token, secretKey)
        const { rows: [user] } = await pool.query(`SELECT * FROM users WHERE id = ${id}`)

        console.log(user.role)
        if (user.role === "insurance_company") {
            const { rows: [insuranceCompany] } = await pool.query(`SELECT * FROM insurance_companies WHERE account_id = ${user.id}`)
            user.insurance_company_id = insuranceCompany.id
        }

        return res.send({ user })
    }
}

router.post("", accountController.registration)
router.get("/get-user", role([]), accountController.get)
router.post("/login", accountController.login)
module.exports = router