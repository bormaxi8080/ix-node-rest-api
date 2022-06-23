'use strict';

import pool from "../services/db/pool.js";
import fs from "fs";

export default function (args) {
    let options = { language: null, disableLogs: false };
    if (args && typeof args === 'object') {
        options = { ...options, ...args };
    }

    // Options
    options.language = options.language || 'en-US';
    options.disableLogs = options.disableLogs || false;

    function log(message) {
        if (!options.disableLogs) {
            console.log(message);
        }
    }

    /**
     * Import geography data
     * @returns {Promise<{result: null, success: boolean}|{result: {regions, cities}, success: boolean}>}
     * @private
     */
    async function _importGeography() {
        let queryStr;
        log("Import geography...");

        try {
            // Load data file
            const geography = JSON.parse(fs.readFileSync("./import/data/geography.json", {encoding: "utf-8"}));

            // Clear all regions and cities
            queryStr = `DELETE FROM cities`;
            await pool.query(queryStr);
            queryStr = `DELETE FROM regions`;
            await pool.query(queryStr);

            // Prepare sequences
            queryStr = `ALTER SEQUENCE regions_id_seq RESTART`;
            await pool.query(queryStr);
            queryStr = `ALTER SEQUENCE cities_id_seq RESTART`;
            await pool.query(queryStr);

            let regionsByIndexes = [];

            // Parse and insert regions
            const regions = geography.regions;

            for (let region of regions) {
                const indexes = region.indexes.map(el => Number(el));

                queryStr = `INSERT INTO regions (region_name, description, indexes) VAlUES ('${region.region}', 'No description', '{${indexes}}') RETURNING *`;
                const {rows: [insertedRegion]} = await pool.queryEscape(queryStr);

                // Collect array of indexed regions
                for (let i = 0; i < indexes.length; i++) {
                    regionsByIndexes.push({"index": indexes[i], "region_id": insertedRegion.id});
                }
            }

            // Collected regions by indexes
            log(regionsByIndexes);

            // Parse and insert cities
            const cities = geography.cities;
            for (let city of cities) {
                const index = Number(city.index);
                const region_id = regionsByIndexes.find(el => el.index === index).region_id;

                queryStr = `INSERT INTO cities (city_name, description, region_id, index) VALUES ('${city.city}', 'No description', ${region_id}, ${index})`
                await pool.queryEscape(queryStr);
            }

            // Select data for output

            // Regions
            queryStr = `SELECT id, region_name, indexes FROM regions ORDER BY id ASC`;
            const {rows: insertedRegions} = await pool.query(queryStr);
            // Cities
            queryStr = `SELECT id, city_name, region_id, index FROM cities ORDER by id ASC`;
            const {rows: insertedCities} = await pool.query(queryStr);

            // Return
            return {success: true, result: {regions: insertedRegions, cities: insertedCities}};
        } catch (err) {
            log(err);
            return {success: false, result: null};
        }
    }

    // Main import endpoint
    return async (importSettings) => {
        let success = true;
        let data = {};
        let importResult;

        /*
        HACK NOTE:
        This is the entry point where, with all import options disabled,
        you can insert arbitrary code and test it quickly without fear of breaking the server )
        */

        // Import geography
        if (importSettings.geography) {
            importResult = await _importGeography();
            success = success && importResult.success;
            data.geography = importResult.result;
        }

        return {success: success, data: data};
    }

}