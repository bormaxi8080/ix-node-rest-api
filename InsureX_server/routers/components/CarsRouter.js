'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import CarsController from "../../controllers/component-entities/CarsController.js";


const router = express.Router();

router

    // Cars
    .get("/", role(null), async(req, res) => {
        // #swagger.tags = ['Cars']
        // #swagger.description = 'Gets array of all cars'
        await CarsController.findAll(req, res);
    })
    .get("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Cars']
        // #swagger.description = 'Gets car by ID'
        // #swagger.parameters['id'] = { description: 'ID of car', type: 'integer', required: true}
        await CarsController.findById(req, res);
    })
    .post("/", role(null), async(req, res) => {
        // #swagger.tags = ['Cars']
        // #swagger.description = 'Creates a new car'
        // #swagger.parameters['number'] = { in: 'body', description: 'Number of a car', type: 'string', required: true }
        // #swagger.parameters['model'] = { in: 'body', description: 'Model of a car', type: 'string', required: true }
        // #swagger.parameters['year'] = { in: 'body', description: 'Year of a car', type: 'string', required: true }
        // #swagger.parameters['automobile_type_id'] = { in: 'body', description: 'Automobile type ID', type: 'integer', required: true }
        // #swagger.parameters['seller'] = { in: 'body', description: 'Seller of a car', type: 'string', required: false }
        // #swagger.parameters['price'] = { in: 'body', description: 'Price of a car', type: 'string', required: false }
        // #swagger.parameters['security_equipment'] = { in: 'body', description: 'Car security equipment description', type: 'string', required: false }
        // #swagger.parameters['info_if_equip_dont_set_owner'] = { in: 'body', description: 'Info if security equipment dont set owner', type: 'string', required: false }
        // #swagger.parameters['key_count'] = { in: 'body', description: 'Car key count', type: 'integer', required: false }
        // #swagger.parameters['has_audio_system'] = { in: 'body', description: 'Has car audio system', type: 'boolean', required: false }
        // #swagger.parameters['model_and_price_audio_system'] = { in: 'body', description: 'Model and price of car audio system', type: 'string', required: false }
        // #swagger.parameters['damage_picture'] = { in: 'body', description: 'Car damage picture in base64 format', type: 'text', required: false }
        await CarsController.create(req, res);
    })
    .patch("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Cars']
        // #swagger.description = 'Updates an existing car'
        // #swagger.parameters['id'] = { description: 'ID of car', type: 'integer', required: true}
        // #swagger.parameters['number'] = { in: 'body', description: 'Number of a car', type: 'string', required: false }
        // #swagger.parameters['model'] = { in: 'body', description: 'Model of a car', type: 'string', required: false }
        // #swagger.parameters['year'] = { in: 'body', description: 'Year of a car', type: 'string', required: false }
        // #swagger.parameters['automobile_type_id'] = { in: 'body', description: 'Automobile type ID', type: 'integer', required: false }
        // #swagger.parameters['seller'] = { in: 'body', description: 'Seller of a car', type: 'string', required: false }
        // #swagger.parameters['price'] = { in: 'body', description: 'Price of a car', type: 'string', required: false }
        // #swagger.parameters['security_equipment'] = { in: 'body', description: 'Car security equipment description', type: 'string', required: false }
        // #swagger.parameters['info_if_equip_dont_set_owner'] = { in: 'body', description: 'Info if security equipment dont set owner', type: 'string', required: false }
        // #swagger.parameters['key_count'] = { in: 'body', description: 'Car key count', type: 'integer', required: false }
        // #swagger.parameters['has_audio_system'] = { in: 'body', description: 'Has car audio system', type: 'boolean', required: false }
        // #swagger.parameters['model_and_price_audio_system'] = { in: 'body', description: 'Model and price of car audio system', type: 'string', required: false }
        // #swagger.parameters['damage_picture'] = { in: 'body', description: 'Car damage picture in base64 format', type: 'text', required: false }
        await CarsController.update(req, res);
    })
    .delete("/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Cars']
        // #swagger.description = 'Deletes a car'
        // #swagger.parameters['id'] = { description: 'ID of car', type: 'integer', required: true}
        await CarsController.delete(req, res);
    })

export default router;