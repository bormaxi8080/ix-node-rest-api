'use strict';

import ControllerModelBase from "../controllers/base/ControllerModelBase.js";

import MeetingsModel from "../models/MeetingsModel.js";

class MeetingsController extends ControllerModelBase {
    // Only specific controller methods here

}

const meetingsController = new MeetingsController(MeetingsModel);

export default meetingsController;