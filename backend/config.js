const { PORT = 3001 } = process.env;
const MONGODB_URL = process.env.MONGODB_URL;
const DATA_BASE = "mongodb://localhost:27017";

export { PORT, DATA_BASE, MONGODB_URL };
