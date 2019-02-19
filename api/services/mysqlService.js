
require('app-module-path').addPath(require('app-root-path').toString());

const knex = require('knex')(require('knexFile'));

/**
 * MySql Adapter Service
 */
class MsqlService {
  /**
   *Add new row in selected table in MySql
   *@param {string} table - Mysql table
   *@param {string} properties - Object details
   */
  async insertToTable(table, properties) {
    await knex(table).insert(properties);
    return properties;
  }

  /**
   * @param {string} table - Mysql table
   * @param {fields} fields - object details
   */
  async getTableContents(table, fields) {
    return await knex.select(
        ...fields,
    ).from(table);
  }

  /**
   * @param {String} table - Mysql Table
   * @param {String} fields - Fields to be retrived
   * @param {Array} prop - Property used to compare values with
   * @param {Array} value - The value to compare
   */
  async getSpecificFieldOfRow(table, fields, prop, value) {
    try {
      return await knex.where({
        [prop]: value,
      }).select(...fields).from(table).first();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {*} id - id of supply to be use for searching
   * @param {*} table - Mysql Table
   * @param {*} fields - fields to be  retrieved
   */
  async getTableRow(id, table, fields) {
    try {
      return await knex.where({id}).select(...fields)
          .first()
          .from(table);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {*} name - name of supply to be use for searching
   * @param {*} table - Mysql Table
   * @param {*} fields - fields to be  retrieved
   */
  async getTableRowByName(name, table, fields) {
    try {
      return await knex.where({name}).select(...fields)
          .first()
          .from(table);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MsqlService;
