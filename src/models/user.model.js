const Database = require('../utils/db');
const db = new Database();

const TBL_USER = "users";
const TBL_COL_ID = "id";
const TBL_COL_NAME = "name";
const TBL_COL_EMAIL = "email";
const TBL_COL_HASH_PASSWORD = "hash_password";
const TBL_COL_AVATAR = "avatar";
const TBL_COL_REFRESH_TOKEN = "refresh_token";

module.exports = class UserModel {
    constructor() {
        if (!UserModel.instance) {
            UserModel.instance = this;
        }
        return UserModel.instance;
    }

    create = (entity) => db.insert(TBL_USER, entity);

    findOne_id = async (id) => {
        const rows = await db.load(`SELECT *
                                    FROM ${TBL_USER}
                                    WHERE ${TBL_COL_ID} = '${id}'`);
        if (rows.length === 0) {
            return null
        }
        return rows[0];
    }

    findOne_email = async (email) => {
        const rows = await db.load(`SELECT *
                                    FROM ${TBL_USER}
                                    WHERE ${TBL_COL_EMAIL} = '${email}'`);
        if (rows.length === 0) {
            return null
        }
        return rows[0];
    }

    findOne_refreshToken = async (refreshToken) => {
        const rows = await db.load(`SELECT *
                                    FROM ${TBL_USER}
                                    WHERE ${TBL_COL_REFRESH_TOKEN} = '${refreshToken}'`);
        if (rows.length === 0) {
            return null
        }
        return rows[0];
    }

    update = (entity, id) => db.update(TBL_USER, entity, {id: id})

};