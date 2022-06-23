'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

const Roles = {
    name: 'roles',
    itemName: 'role',
    tableName: 'roles',
    fields: {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }
}

class RolesModel extends ModelBase {
    // Only specific model methods here

}

const rolesModel = new RolesModel(Roles);

export default rolesModel;