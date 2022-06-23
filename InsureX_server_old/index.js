const express = require("express")
const compression = require("compression")
const cors = require("cors")
const formidable = require('express-formidable');

const insuranceCompanyRouter = require("./controllers/insuranceCompany.js")
const insuredPersonController = require("./controllers/insuredPerson")
const regionsController = require("./controllers/regions")
const agentsController = require("./controllers/agents")
const appraisalCompanyController = require("./controllers/appraisalCompany")
const appraisersController = require("./controllers/appraisers")
const SDPController = require("./controllers/SDP")
const insuredEventsController = require("./controllers/insuredEvents")
const accountController = require("./controllers/account")

const bodyParser = require('body-parser');
const role = require("./middleware/role.js")

const app = express()
app.use(cors())

app.disable('x-powered-by')
app.use(express.static('.'))
app.use(formidable({ multiples: true }));

app.use(compression())

app.use("/account", accountController)
app.use("/insurance-companies", role(["superadmin", "insurance_company"]), insuranceCompanyRouter)
app.use("/insured-persons", role(["superadmin", "insurance_company"]), insuredPersonController)
app.use("/regions", role(["superadmin", "insurance_company"]), regionsController)
app.use("/agents", role(["superadmin", "insurance_company"]), agentsController)
app.use("/appraisal-companies", role(["superadmin", "insurance_company"]), appraisalCompanyController)
app.use("/appraisers", role(["superadmin", "insurance_company"]), appraisersController)
app.use("/SDP", role(["superadmin", "insurance_company"]), SDPController)
app.use("/insured-events", role(["superadmin", "insurance_company"]), insuredEventsController)

app.listen(68, () => {
    console.log("server started")
})