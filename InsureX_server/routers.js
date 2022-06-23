'use strict';

import express from "express";

import RegionsRouter from "./routers/references/RegionsRouter.js";
import CitiesRouter from "./routers/references/CitiesRouter.js";
import InsuredEventTypesRouter from "./routers/references/InsuredEventTypesRouter.js";
import InsuredPropertyTypesRouter from "./routers/references/InsuredPropertyTypesRouter.js";
import InsuranceCaseStatusesRouter from "./routers/references/InsuranceCaseStatusesRouter.js";
import AutomobileTypesRouter from "./routers/references/AutomobileTypesRouter.js";
import SupplierTypesRouter from "./routers/references/SupplierTypesRouter.js";

import RolesRouter from "./routers/references/RolesRouter.js";
import AccountsRouter from "./routers/AccountsRouter.js";
import InsuredPersonsRouter from "./routers/user-entities/InsuredPersonsRouter.js";
import AgentsRouter from "./routers/user-entities/AgentsRouter.js";
import InsuranceCompaniesRouter from "./routers/user-entities/InsuranceCompaniesRouter.js";
import AppraisalCompaniesRouter from "./routers/user-entities/AppraisalCompaniesRouter.js";
import AppraisersRouter from "./routers/user-entities/AppraisersRouter.js";
import SDPRouter from "./routers/user-entities/SDPRouter.js";

import InsuredEventsRouter from "./routers/InsuredEventsRouter.js";
import InsuranceCasesRouter from "./routers/InsuranceCasesRouter.js";

import CarsRouter from "./routers/components/CarsRouter.js";
import DriversRouter from "./routers/components/DriversRouter.js";
import VictimsRouter from "./routers/components/VictimsRouter.js";
import WitnessesRouter from "./routers/components/WitnessesRouter.js";
import PlacesRouter from "./routers/components/PlacesRouter.js";
import IncidentParticipantsRouter from "./routers/components/IncidentParticipantsRouter.js";
import OthersRouter from "./routers/components/OthersRouter.js";
import LastUsersRouter from "./routers/components/LastUsersRouter.js";
import TheftTimeIntervalsRouter from "./routers/components/TheftTimeIntervalsRouter.js";
import BulgaryDetailsRouter from "./routers/components/BulgaryDetailsRouter.js";
import EstatesRouter from "./routers/components/EstatesRouter.js";
import ThirdPersonsRouter from "./routers/components/ThirdPersonsRouter.js";

import CarsInInsuranceCaseRouter from "./routers/insurance-case-entities/CarsRouter.js";
import DriversInInsuranceCaseRouter from "./routers/insurance-case-entities/DriversRouter.js";
import VictimsInInsuranceCaseRouter from "./routers/insurance-case-entities/VictimsRouter.js";
import WitnessesInInsuranceCaseRouter from "./routers/insurance-case-entities/WitnessesRouter.js";
import PlacesInInsuranceCaseRouter from "./routers/insurance-case-entities/PlacesRouter.js";
import IncidentParticipantsInInsuranceCaseRouter from "./routers/insurance-case-entities/IncidentParticipantsRouter.js";
import OthersInInsuranceCaseRouter from "./routers/insurance-case-entities/OthersRouter.js";
import LastUsersInInsuranceCaseRouter from "./routers/insurance-case-entities/LastUsersRouter.js";
import TheftTimeIntervalsInInsuranceCaseRouter from "./routers/insurance-case-entities/TheftTimeIntervalsRouter.js";
import BulgaryDetailsInInsuranceCaseRouter from "./routers/insurance-case-entities/BulgaryDetailsRouter.js";
import EstatesInInsuranceCaseRouter from "./routers/insurance-case-entities/EstatesRouter.js";
import ThirdPersonsInInsuranceCaseRouter from "./routers/insurance-case-entities/ThirdPersonsRouter.js";

import MeetingsRouter from "./routers/MeetingsRouter.js";

const router = express.Router();

router.use("/regions", RegionsRouter);
router.use("/city", CitiesRouter);
router.use("/insured-event-types", InsuredEventTypesRouter);
router.use("/insured-property-types", InsuredPropertyTypesRouter);
router.use("/insurance-case-statuses", InsuranceCaseStatusesRouter);
router.use("/automobile-types", AutomobileTypesRouter);
router.use("/supplier-types", SupplierTypesRouter);

router.use("/roles", RolesRouter);
router.use("/account", AccountsRouter);
router.use("/insured-persons", InsuredPersonsRouter);
router.use("/agents", AgentsRouter);
router.use("/insurance-companies", InsuranceCompaniesRouter);
router.use("/appraisal-companies", AppraisalCompaniesRouter);
router.use("/appraisers", AppraisersRouter);
router.use("/sdp", SDPRouter);

router.use("/insured-events", InsuredEventsRouter);
router.use("/insurance-case", InsuranceCasesRouter);

router.use("/car", CarsRouter);
router.use("/driver", DriversRouter);
router.use("/victim", VictimsRouter);
router.use("/witness", WitnessesRouter);
router.use("/place", PlacesRouter);
router.use("/incident-participant", IncidentParticipantsRouter);
router.use("/other", OthersRouter);
router.use("/last-user", LastUsersRouter);
router.use("/theft-time-interval", TheftTimeIntervalsRouter);
router.use("/bulgary-details", BulgaryDetailsRouter);
router.use("/estate", EstatesRouter);
router.use("/3d-person", ThirdPersonsRouter);

router.use("/insurance-case", CarsInInsuranceCaseRouter);
router.use("/insurance-case", DriversInInsuranceCaseRouter);
router.use("/insurance-case", VictimsInInsuranceCaseRouter);
router.use("/insurance-case", WitnessesInInsuranceCaseRouter);
router.use("/insurance-case", PlacesInInsuranceCaseRouter);
router.use("/insurance-case", IncidentParticipantsInInsuranceCaseRouter);
router.use("/insurance-case", OthersInInsuranceCaseRouter);
router.use("/insurance-case", LastUsersInInsuranceCaseRouter);
router.use("/insurance-case", TheftTimeIntervalsInInsuranceCaseRouter);
router.use("/insurance-case", BulgaryDetailsInInsuranceCaseRouter);
router.use("/insurance-case", EstatesInInsuranceCaseRouter);
router.use("/insurance-case", ThirdPersonsInInsuranceCaseRouter);

router.use("/meetings", MeetingsRouter);

export default router;