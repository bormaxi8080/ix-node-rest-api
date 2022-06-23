const express = require("express")
const router = express.Router()
const pool = require("../db/pool")

const rolesController = {
    async getAllRoles(req, res) {
        const { rows: roles } = await pool.query("SELECT * FROM roles")
        res.send(roles)
        return roles
    }
}

router.get("", rolesController.getAllRoles)
module.exports = router