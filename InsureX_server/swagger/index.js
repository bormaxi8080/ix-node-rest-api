'use strict';

import config from "../config.js";
import logger from "../services/Logger.js";

import { join, dirname } from "path";
import { fileURLToPath } from "url";
import swaggerAutogen from "swagger-autogen";

const _dirname = dirname(fileURLToPath(import.meta.url));

const doc = {
    info: {
        title: 'InsureX API',
        version: config.apiVersion,
        description: 'InsureX server API definitions'
    },
    host: config.server.host + ':' + config.server.port,
    schemes: ['http', 'https'],
    basePath: "/api",
    consumes: ['application/json'],
    produces: ['application/json'],

    tags: [
        {
            "name": "Regions",
            "description": "Provides API interface to operate regions"
        },
        {
            "name": "Cities",
            "description": "Provides API interface to operate cities"
        },
        {
            "name": "Insured Event Types",
            "description": "Provides API interface to operate insured event types"
        },
        {
            "name": "Insured Property Types",
            "description": "Provides API interface to operate insured property types"
        },
        {
            "name": "Insurance Case Statuses",
            "description": "Provides API interface to operate insurance case statuses"
        },
        {
            "name": "Automobile Types",
            "description": "Provides API interface to operate automobile types"
        },
        {
            "name": "Supplier Types",
            "description": "Provides API interface to operate supplier types"
        },
        {
            "name": "Role",
            "description": "Provides API interface to operate user roles"
        },
        {
            "name": "Account",
            "description": "Provides API interface to user account"
        },
        {
            "name": "Insured Persons",
            "description": "Provides API interface to operate insured persons"
        },
        {
            "name": "Agents",
            "description": "Provides API interface to operate agents"
        },
        {
            "name": "SDP",
            "description": "Provides API interface to operate SDP"
        },
        {
            "name": "Insured Events",
            "description": "Provides API interface to operate insured events. This routes is deprecated in API v.2.x!"
        },
        {
            "name": "Insurance Cases",
            "description": "Provides API interface to operate insurance cases"
        },
        {
            "name": "Cars",
            "description": "Provides API interface to operate cars"
        },
        {
            "name": "Drivers",
            "description": "Provides API interface to operate drivers"
        },
        {
            "name": "Victims",
            "description": "Provides API interface to operate victims"
        },
        {
            "name": "Witnesses",
            "description": "Provides API interface to operate witnesses"
        },
        {
            "name": "Places",
            "description": "Provides API interface to operate places"
        },
        {
            "name": "Incident Participants",
            "description": "Provides API interface to operate incident participants"
        },
        {
            "name": "Others",
            "description": "Provides API interface to operate other persons abstraction"
        },
        {
            "name": "Last Users",
            "description": "Provides API interface to operate last users abstraction"
        },
        {
            "name": "Theft Time Intervals",
            "description": "Provides API interface to operate theft time intervals abstraction"
        },
        {
            "name": "Bulgary Details",
            "description": "Provides API interface to operate bulgary details abstraction"
        },
        {
            "name": "Estates",
            "description": "Provides API interface to operate estates abstraction"
        },
        {
            "name": "Third Persons",
            "description": "Provides API interface to operate third persons abstraction"
        },
        {
            "name": "Insurance Companies",
            "description": "Provides API interface to operate insurance companies"
        },
        {
            "name": "Appraisal Companies",
            "description": "Provides API interface to operate appraisal companies"
        },
        {
            "name": "Appraisers",
            "description": "Provides API interface to operate appraisers"
        },
        {
            "name": "Meetings",
            "description": "Provides API interface to operate meetings"
        }
    ],

    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },

    definitions: {
        // REFERENCES

        regions: [ { $ref: '#/definitions/region' } ],
        region: {
            "id": 1,
            "region_name": "ירושלים",
            "description": "No description",
            "indexes": [11]
        },
        cities: [ { $ref: '#/definitions/city'} ],
        city: {
            "id": 66,
            "city_name": "אבו ג'ווייעד (שבט)",
            "description": "No description",
            "region_id": 6,
            "index": 62,
            "region": { $ref: '#/definitions/region' }
        },
        insured_event_types : [ {$ref: '#/definitions/insured_event_type'} ],
        insured_event_type: {
            "id": 1,
            "insured_event_type": "תאונת דרכים",
            "description": "Accident",
            "ru_description": "Авария",
            "available_insured_property_types": [ {$ref: '#/definitions/insured_property_types'}]
        },
        insured_property_types: [ {$ref: '#/definitions/insured_property_type'} ],
        insured_property_type: {
            "id": 1,
            "insured_property_type": "רכב",
            "insured_event_type_ids": [
                1,
                3,
                5
            ],
            "description": "Automobile",
            "ru_description": "Автомобиль",
            "insured_event_types": [ {$ref: '#/definitions/insured_event_type'} ]
        },
        insurance_case_statuses: [ { $ref: '#/definitions/insurance_case_status'} ],
        insurance_case_status: {
            "id": 1,
            "description": "פתיחת אירוע תאונת דרכים",
            "ru_description": "Открытие страхового случая",
            "inbox_notification": true
        },
        automobile_types: [ {$ref: '#/definitions/automobile_types'} ],
        automobile_type: {
            "id": 1,
            "automobile_type": "פרטי ומסחרי עד 3.5 טון",
            "description": "Personal and corporate vehicles weighing up to 3.5 tons",
            "ru_description": "Личный и корпоративный транспорт массой до 3.5 тонн"
        },
        supplier_types: [ { $ref: '#/definitions/supplier_type' } ],
        supplier_type: {
            "id": 5,
            "name": "מוסך",
            "description": "Service station",
            "ru_description": "СТО"
        },

        // USERS AND SECURITY

        roles: [ { $ref: '#/definitions/role' } ],
        role: {
            "id": 1,
            "name": "superadmin",
            "description": "Superuser role"
        },
        accounts: [ { $ref: '#/definitions/account' } ],
        account: {
            "token": 'access_token',
            "user": { $ref: '#/definitions/user' },
            "insured_person": { $ref: '#/definitions/insured_person' },
            "agent": { $ref: '#/definitions/agent' }
        },
        user: {
            "id": 1,
            "role": "superadmin",
            "login": "admin",
            "password": "1234567",
            "created_at": "14:23:48.737091+00",
            "updated_at": null
        },
        insured_persons: [ { $ref: '#/definitions/insured_person'} ],
        insured_person: {
            "id": 147,
            "login_id": "213",
            "passport_id": "050-7895627",
            "first_name": "Max",
            "second_name": "Marshak",
            "phone": "3455666122",
            "email": "test.email@gmail.com",
            "address": "Some address, Novosibirsk, Russia",
            "user_id": 111,
            "city_id": 1,
            "region_id": 1,
            "agent_id": 33,
            "insurance_company_id": 53,
            "sign_picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAACg...",
            "insurance_company": { $ref: '#/definitions/insurance_company' },
            "agent": { $ref: '#/definitions/agent' },
            "region": { $ref: '#/definitions/region' },
            "city": { $ref: '#/definitions/city' }
        },
        agents: [ { $ref: '#/definitions/agent' } ],
        agent: {
            "id": 33,
            "first_name": "יובל",
            "second_name": "בן נון",
            "passport_id": "050-789563224",
            "employee_number": "666666",
            "phone": "0543334444",
            "email": "y@g.com",
            "region_id": 2,
            "address": "רמת השרון",
            "login_id": "050-789563224",
            "insurance_company_ids": [
                53,
                54,
                55
            ],
            "user_id": 122,
            "insurance_companies": [
                { $ref: '#/definitions/insurance_company' }
            ],
            "region": { $ref: '#/definitions/region' }
        },
        insurance_companies: [ { $ref: '#/definitions/insurance_company' } ],
        insurance_company: {
            "title": "מגדל",
            "ie_number": 111111,
            "address": "מגדל תל אביב",
            "phone": 1111111,
            "email": "m@g.com",
            "id": 53,
            "account_id": 59
        },
        sdps: [ { $ref: '#/definitions/sdp' } ],
        sdp: {
            "id": 33,
            "first_name": "יובל",
            "second_name": "בן נון",
            "phone": "0543334444",
            "email": "y@g.com",
            "passport_id": "050-7895627",
            "city_id": 1,
            "region_id": 6,
            "address": "רמת השרון",
            "login_id": "050-7895627",
            "user_id": 144,
            "insurance_company_ids": [
                53,
                54,
                55
            ],
            "supplier_type_ids": [1, 2],
            "region": { $ref: '#/definitions/region'},
            "city": { $ref: '#/definitions/city'}
        },
        appraisers: [ { $ref: '#/definitions/appraiser' } ],
        appraiser: {
            "id": 37,
            "insurance_company_id": 1,
            "appraisal_company_id": 37,
            "region_id": 2,
            "passport_id": "050-789686649990",
            "first_name": "Max",
            "second_name": "Marshak",
            "phone": "89139021392",
            "email": "bormaxi1980@gmail.com",
            "address": "Address 1, Novosibirsk",
            "user_id": 530,
            "login_id": "050-789686649990",
            "region": { $ref: '#/definitions/region'}
        },
        appraisal_companies: [ { $ref: '#/definitions/appraisal_company' } ],
        appraisal_company: {
            "id": 36,
            "appraisal_company_name": "חברת שמאות מגדל1",
            "phone": "0543333333",
            "email": "z@g.com",
            "office_address": "כפר סבא",
            "region_id": 6,
            "city_id": 1,
            "oao_ie_number": 1010101,
            "insurance_company_ids": [
                53
            ],
            "region": { $ref: '#/definitions/region'},
            "city": { $ref: '#/definitions/city'}
        },
        insured_events: [ { $ref: '#/definitions/insured_event' } ],
        insured_event: {
            "id": 61,
            "insurance_company_id": 53,
            "insured_person_id": 128,
            "region_id": 3,
            "address": "Test address",
            "date": "2022-04-19T17:00:00.000Z",
            "agent_id": 32,
            "appraisal_company_id": 42,
            "appraiser_id": 23,
            "insured_event_number": "7895669200422",
            "folder_google_drive_id": "1UYius9f19DMFfVayvIAM2hhi3ilFa8UM",
            "folder_google_drive_link": "https://drive.google.com/drive/folders/1UYius9f19DMFfVayvIAM2hhi3ilFa8UM",
            "folder_google_drive_name": "050-7895669_200422",
            "files": { $ref: '#/definitions/insured_event_files' },
            "insured_person": { $ref: '#/definitions/insured_person' },
            "insurance_company": { $ref: '#/definitions/insurance_company' },
            "agent": { $ref: '#/definitions/agent' },
            "appraisal_company": { $ref: '#/definitions/appraisal_company' },
            "appraiser": { $ref: '#/definitions/appraiser' },
            "region": { $ref: '#/definitions/region' }
        },
        insured_event_files: [ { $ref: '#/definitions/insured_event_file' } ],
        insured_event_file: {
            "id": 53,
            "insured_event_id": 61,
            "link": "https://drive.google.com/uc?id=1wQ93v864deVix4u5GH9MSyAq2VRIVBzn&export=download",
            "file_google_drive_id": "1wQ93v864deVix4u5GH9MSyAq2VRIVBzn",
            "file_type": "image/png",
            "file_name": "5544.png"
        },
        insurance_cases: [ { $ref: '#/definitions/insurance_case' } ],
        insurance_case: {
            "id": 12,
            "insured_event_id": 216,
            "insured_person_id": 1,
            "event_type_id": 1,
            "property_type_id": 1,
            "agent_id": 32,
            "city_id": 1,
            "status_id": 1,
            "incident_date": "2022-04-19T17:00:00.000Z",
            "address": "Insurance address",
            "details": "Insurance case details",
            "document_date": "2022-04-19T17:00:00.000Z",
            "insured_number": "999999-230422",
            "policy": "POLICY DATA",
            "claim_amount": 2,
            "whose_signature": "Person whose signature insurance case",
            "insured_person": { $ref: '#/definitions/insured_person' },
            "event_type": { $ref: '#/definitions/insured_event_type' },
            "property_type": { $ref: '#/definitions/insured_property_type' },
            "agent": { $ref: '#/definitions/agent' },
            "city": { $ref: '#/definitions/city' },
            "status": { $ref: '#/definitions/insurance_case_status' },
            "type_hash": "accident"
        },
        cars: [ { $ref: '#/definitions/car' } ],
        car: {
            "id": 1,
            "number": "X041MM",
            "model": "Toyota Windom",
            "year": "1998",
            "automobile_type_id": 1,
            "seller": "Car seller name",
            "price": 50000,
            "security_equipment": "No security equipment",
            "key_count": 3,
            "has_audio_system": true,
            "model_and_price_audio_system": "Toshiba XC",
            "damage_picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAACg...",
            "automobile_type": { $ref: '#/definitions/automobile_type'},
            insurance_case_ids: [
                8
            ]
        },
        drivers: [ { $ref: '#/definitions/driver' } ],
        driver: {
            names: 'John Smith',
            birthday: '01.01.1980',
            phone: '+79996665342',
            license_number: 'license 1-XXXX-2341',
            has_permission: true,
            car_model: 'Toyota Windom',
            driver_id: 'XXC-905621',
            insurance_case_ids: [
                8
            ]
        },
        victims: [ { $ref: '#/definitions/victim' } ],
        victim: {
            first_name: 'John',
            last_name: 'Smith',
            passport_id: 1,
            address: 'John address',
            city_ids: [1, 2],
            insurance_case_ids: [
                8
            ]
        },
        witnesses: [ { $ref: '#/definitions/witness' } ],
        witness: {
            names: 'John Smith',
            phone: '+79996665342',
            insurance_case_ids: [
                8
            ]
        },
        places: [ {$ref: '#/definitions/place'} ],
        place: {
            "id": 1,
            "place": "toJob",
            "description": "בדרך מהעבודה",
            "ru_description": "По пути с работы",
            "insurance_case_ids": [
                38,
                72
            ]
        },
        incident_participants: [ { $ref: '#/definitions/incident_participant' } ],
        incident_participant: {
            police: true,
            firefighters: false,
            tow_truck: true,
            insurance_case_ids: [
                8
            ]
        },
        others: [ { $ref: '#/definitions/other' } ],
        other: {
            names: 'John Smith',
            license_number: '1778266-XC',
            passport_number: '773-344516',
            car_model: 'Toyota Windom',
            phone: '+79996665342',
            is_sue: true,
            insurance_case_ids: [
                8
            ]
        },
        last_users: [ { $ref: "#/definitions/last_user" } ],
        last_user: {
            "id": 1,
            "first_name": "Max",
            "last_name": "Marshak",
            "passport_id": "222-888999",
            "phone": "+7 913 902 13 92",
            "relationship": "Some relationship",
            "insurance_case_ids": [
                1,
                2
            ]
        },
        theft_time_intervals: [ { $ref: "#/definitions/theft_time_interval" } ],
        theft_time_interval: {
            "id": 1,
            "start_time_interval": "15:00:00+00",
            "end_time_interval": "17:30:00+00",
            "insurance_case_ids": [
                1,
                2
            ]
        },
        bulgary_details: [ { $ref: "#/definitions/bulgary_detail" } ],
        bulgary_detail: {
            "id": 1,
            "sum": 550.35,
            "is_owner_single": true,
            "has_damage_earlier": false,
            "has_additional_insurance": true,
            "additional_insurance_info": "ADDITIONAL INSURANCE INFO",
            "has_evidences": false,
            "has_police_call": true,
            "insurance_case_ids": [
                1,
                2
            ]
        },
        estates: [ { $ref: "#/definitions/estate"} ],
        estate: {
            "id": 1,
            "damage_amount": 500.45,
            "single_owner": true,
            "were_damaged": false,
            "has_additional_insurance": true,
            "additional_insurance_info": "ADDITIONAL INSURANCE INFO",
            "has_tenant": null,
            "insurance_case_ids": [
                1,
                2
            ]
        },
        third_persons: [ { $ref: "#/definitions/third_person"} ],
        third_person: {
            "id": 1,
            "first_name": "Maxim",
            "last_name": "Marshak",
            "phone": "78199100222",
            "address": "Test address",
            "damage_info": "DAMAGE INFO",
            "insurance_case_ids": [
                1,
                2
            ]
        },
        meetings: [ { $ref: "#/definitions/meetings" } ],
        meeting: {
            "id": 1,
            "date": "2022.06.19 12:00:00",
            "sdp_id": 1,
            "appraiser_id": 1,
            "insurance_case_id": 20,
            "approved": true,
            "accepted": false
        }
    },

    components: {
        responses: {
            "200": {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            error: false,
                            message: "Object, array or error message"
                        }
                    }
                }
            }
        }
    }
}

const outputFile = join(_dirname, 'swagger-output.json');

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routers.js, ... */
const endpointsFiles = [join(_dirname, '../routers.js')];

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(async ({success}) => {
    logger.info(`Generating Swagger documentation from endpoints: ${endpointsFiles.join(', ')}`);
    logger.info(`Working environment: ${config.ENV}, API version: ${doc.info.version}`);
    logger.info(`Generated Swagger documentation: ${success}`);
})