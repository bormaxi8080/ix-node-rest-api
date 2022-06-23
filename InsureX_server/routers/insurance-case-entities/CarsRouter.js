'use strict';

import express from "express";

import role from "./../../middleware/role.js";
import CarsController from "../../controllers/component-entities/CarsController.js";


const router = express.Router();

router

    // Cars in insurance case
    .get("/:case_id/car", role(null), async(req, res) => {
        // #swagger.tags = ['Cars', 'Insurance Cases']
        // #swagger.description = 'Gets insurance case cars'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        await CarsController.findInInsuranceCase(req, res);
    })
    .get("/:case_id/car/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Cars', 'Insurance Cases']
        // #swagger.description = 'Gets a car with same ID from insurance case if exists'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of car', type: 'integer', required: true}
        await CarsController.findInInsuranceCase(req, res);
    })
    .post("/:case_id/car", role(null), async(req, res) => {
        // #swagger.tags = ['Cars', 'Insurance Cases']
        // #swagger.description = 'Creates a new car and append it to insurance case'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
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
    .patch("/:case_id/car/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Cars', 'Insurance Cases']
        // #swagger.description = 'Appends a car to insurance case and update it (no creates car!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
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
    .delete("/:case_id/car/:id", role(null), async(req, res) => {
        // #swagger.tags = ['Cars', 'Insurance Cases']
        // #swagger.description = 'Remove car from insurance case (no deletes car!)'
        // #swagger.parameters['case_id'] = { description: 'ID of insurance case', type: 'integer', required: true}
        // #swagger.parameters['id'] = { description: 'ID of car', type: 'integer', required: true}
        await CarsController.delete(req, res);
    })

export default router;