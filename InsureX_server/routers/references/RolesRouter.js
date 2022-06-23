'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import RolesController from "../../controllers/references/RolesController.js";

const router = express.Router();

router

    .get("/", role(["superadmin"]), async (req, res) => {
        // #swagger.tags = ['Role']
        // #swagger.description = 'Gets array of all users roles'
        await RolesController.findAll(req, res);
    })

export default router;