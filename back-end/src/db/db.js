import pkg from "pg";

import Sequelize from "sequelize";

const { Pool } = pkg;
const connectDB = async () => {
  const pool = new Pool({
    connectionString: `${process.env.PG_URI}/${process.env.DB_NAME}`,
  });

  try {
    const client = await pool.connect();
    console.log(`!!!Postgres Connection Established ${client.host}`);
    client.release();
  } catch (error) {
    console.log("Postgres Db Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

// Sequelize setup for ORM
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.DB_NAME,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

export { sequelize };
