const express = require("express")
const router = express.Router()
const pool = require("../db/pool.js")

const regionsController = {
    async getAllRegions(req, res) {
        const { rows: regions } = await pool.query("SELECT * FROM regions")
        res.send({regions})
    }
}

router.get("", regionsController.getAllRegions)
module.exports = router