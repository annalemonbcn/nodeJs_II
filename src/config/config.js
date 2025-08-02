import "dotenv/config";

const config = {
  PORT: process.env.PORT || 8090,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  PERSISTENCE: process.env.PERSISTENCE,
};

export default config;
