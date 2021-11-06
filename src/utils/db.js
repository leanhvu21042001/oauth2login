const mysql = require('mysql');
const dbConfig = require('./../config/db');

const pool = mysql.createPool(dbConfig.poolConfig);


// Cơ chết promies

module.exports = class Database {
    constructor() {
        if (!Database.instance) {
            Database.instance = this;
        }
        return Database.instance;
    }

    load = function (sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, results) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    insert = function (table, entity) {

        const sql = `INSERT INTO ${table}
                     SET ?`;
        return new Promise((resolve, reject) => {
            pool.query(sql, entity, (err, results) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    update = function (table, entity, condition) {
        const sql = `UPDATE ${table}
                     SET ?
                     WHERE ?`;

        return new Promise((resolve, reject) => {
            pool.query(sql, [entity, condition], (err, results, fields) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    delete = function (table, condition) {
        const sql = `DELETE
                     FROM ${table}
                     WHERE ?`;
        return new Promise((resolve, reject) => {
            pool.query(sql, condition, (err, results) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    update2condition = function (table, entity, condition1, condition2) {
        const sql = `UPDATE ${table}
                     SET ?,
                         updated_at=?
                     WHERE ?
                       AND ?`;
        const CURRENT_TIMESTAMP = {
            toSqlString: function () {
                return 'CURRENT_TIMESTAMP()';
            }
        };
        return new Promise((resolve, reject) => {
            pool.query(sql, [entity, CURRENT_TIMESTAMP, condition1, condition2], (err, results, fields) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    delete2condition = function (table, entity, condition1, condition2) {
        const sql = `UPDATE ${table}
                     SET ?,
                         updated_at=?,
                         deleted_at=?
                     WHERE ?
                       AND ?`;
        const CURRENT_TIMESTAMP_UPDATE = {
            toSqlString: function () {
                return 'CURRENT_TIMESTAMP()';
            }
        };
        const CURRENT_TIMESTAMP_DELETE = {
            toSqlString: function () {
                return 'CURRENT_TIMESTAMP()';
            }
        };
        return new Promise((resolve, reject) => {
            pool.query(sql, [entity, CURRENT_TIMESTAMP_UPDATE, CURRENT_TIMESTAMP_DELETE, condition1, condition2], (err, results, fields) => {
                if (err) {
                    console.error(err)
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

}

//
//   module.exports = {
//     load: function (sql) {
//       return new Promise((resolve, reject) => {
//         pool.query(sql, (err, results) => {
//           if (err) {
//             console.error(err)
//             return reject(err);
//           }
//           resolve(results);
//         });
//       });
//     },
//     insert: function (table, entity) {
//
//       const sql = `INSERT INTO ${table} SET ?`;
//       return new Promise((resolve, reject) => {
//         pool.query(sql, entity, (err, results) => {
//           if (err) {
//             console.error(err)
//             return reject(err);
//           }
//           resolve(results);
//         });
//       })
//     },
//     update: function (table, entity, condition) {
//       const sql = `UPDATE ${table} SET ? WHERE ?`;
//
//       return new Promise((resolve, reject) => {
//         pool.query(sql, [entity, condition], (err, results, fields) => {
//           if (err) {
//             console.error(err)
//             return reject(err);
//           }
//           resolve(results);
//         });
//       })
//     },
//     delete: function (table, condition) {
//       const sql = `DELETE FROM ${table} WHERE ?`;
//       return new Promise((resolve, reject) => {
//         pool.query(sql, condition, (err, results) => {
//           if (err) {
//             console.error(err)
//             return reject(err);
//           }
//           resolve(results);
//         });
//       })
//     },
//     update2condition: function (table, entity, condition1, condition2) {
//       const sql = `UPDATE ${table} SET ? , updated_at=? WHERE ? AND ?`;
//       const CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
//       return new Promise((resolve, reject) => {
//         pool.query(sql, [entity, CURRENT_TIMESTAMP, condition1, condition2], (err, results, fields) => {
//           if (err) {
//             console.error(err)
//             return reject(err);
//           }
//           resolve(results);
//         });
//       })
//     },
//     delete2condition: function (table, entity, condition1, condition2) {
//       const sql = `UPDATE ${table} SET ? , updated_at=?, deleted_at=? WHERE ? AND ?`;
//       const CURRENT_TIMESTAMP_UPDATE = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
//       const CURRENT_TIMESTAMP_DELETE = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
//       return new Promise((resolve, reject) => {
//         pool.query(sql, [entity, CURRENT_TIMESTAMP_UPDATE, CURRENT_TIMESTAMP_DELETE, condition1, condition2], (err, results, fields) => {
//           if (err) {
//             console.error(err)
//             return reject(err);
//           }
//           resolve(results);
//         });
//       })
//     },
// }

/*

delete2condition: function (table, condition1, condition2) {
    const sql = `DELETE FROM ${table} WHERE ? AND ?`;
    return new Promise((resolve, reject) => {
      pool.query(sql, [condition1, condition2], (err, results) => {
        if (err) {
          console.error(err)
          return reject(err);
        }
        resolve(results);
      });
    })
  },

 */