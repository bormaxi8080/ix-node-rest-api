'use strict';

import ModelBase from "../base/ModelBase.js";

import UsersModel from "../user-entities/UsersModel.js";

class UserEntityModelBase extends ModelBase {
    // Only specific model methods here

    async _extend(item) {
        return await super._extend(item);
    }

    _mutateFields(fields) {
        return super._mutateFields(fields);
    }

    _preQueryCreate(fields) {
        fields = this._mutateFields(fields);
        return super._preQueryCreate(fields);
    }

    _preQueryUpdate(fields) {
        fields = this._mutateFields(fields);
        return super._preQueryUpdate(fields);
    }

    async findByUserId(user_id) {
        const item = await this.model.findOne({ where: { user_id: `${user_id}` } } );
        return await this._extend(item);
    }

    async findByLoginId(login_id) {
        const item = await this.model.findOne({ where: { login_id: `${login_id}` } } );
        return await this._extend(item);
    }

    async getUserData(id) {
        const item = await this.findById(id);
        const user = await UsersModel.findById(item.user_id);
        return {
            id: user.id,
            login: user.login,
            role: user.role,
            first_name: item.first_name,
            last_name: item.second_name,
            email: item.email,
            phone: item.phone
        };
    }
}

export default UserEntityModelBase;