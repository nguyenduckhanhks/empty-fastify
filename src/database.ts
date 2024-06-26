import { Sequelize } from "sequelize-typescript";
import { Environment } from "./config/environment";
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  host: process.env.DB_HOST,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [],
  // query: { raw: true },
  logging: false,
  pool: {
    max: 100,
  },
});
export default async function init() {
  if (Environment.IS_WORKER) {
    return;
  }
  await sequelize.sync({ alter: false });
}
