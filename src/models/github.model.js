const Database = require('../utils/db');
const db = new Database();

const TBL_GITHUB = "oauth_github";
const TBL_COL_ID = "id";
const TBL_COL_NAME = "name";
const TBL_COL_EMAIL = "email";
const TBL_COL_AVATAR = "avatar";
const TBL_COL_HOME_URL = "home_url";

module.exports = class GitHubModel {
    constructor() {
        if (!GitHubModel.instance) {
            GitHubModel.instance = this;
        }
        return GitHubModel.instance;
    }

    create = (entity) => db.insert(TBL_GITHUB, entity);

    findOne_id = async (id) => {
        const rows = await db.load(`SELECT *
                                    FROM ${TBL_GITHUB}
                                    WHERE ${TBL_COL_ID} = '${id}'`);
        if (rows.length === 0) {
            return null
        }
        return rows[0];
    }

    findOne_email = async (email) => {
        const rows = await db.load(`SELECT *
                                    FROM ${TBL_GITHUB}
                                    WHERE ${TBL_COL_EMAIL} = '${email}'`);
        if (rows.length === 0) {
            return null
        }
        return rows[0];
    }
}