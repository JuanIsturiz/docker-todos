import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT,
  DB: {
    DBHOST: process.env.DBHOST,
    DBPORT: parseInt(process.env.DBPORT as string) || 3306,
    DBUSERNAME: process.env.DBUSERNAME,
    DBPASSWORD: process.env.DBPASSWORD,
    DBNAME: process.env.DBNAME,
  },
};
