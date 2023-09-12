import { Sequelize } from "./sequelize";

/**
 * Connect to the database
 * @param {string} connection - path to the database 
 * @returns database connection
 */
export function getDb(connection = "sqlite::tcm.sqlite") {
  return new Sequelize(connection);
}
