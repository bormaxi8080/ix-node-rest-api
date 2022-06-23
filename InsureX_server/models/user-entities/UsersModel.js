'use strict';

import { sequelizer, Sequelize, Op, Model, DataTypes } from "../../services/db/sequelizer.js";

import ModelBase from "../base/ModelBase.js";

const Users = {
    name: 'users',
    itemName: 'user',
    tableName: 'users',
    fields: {
        /*id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },*/
        role: {
            allowNull: false,
            type: DataTypes.STRING
        },
        login: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }
}

class UsersModel extends ModelBase {
    // Only specific model methods here

    async userExists(login) {
        const item = await this.model.findOne({ where: { login: login } });
        return (item !== null);
    }

    async findByLogin(login) {
        return await this.model.findOne({ where: { login: login } });
    }
}

const usersModel = new UsersModel(Users);

export default usersModel;