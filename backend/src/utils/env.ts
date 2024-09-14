import { cleanEnv } from 'envalid';
import { port, str } from 'envalid/dist/validators.js';

const validateEnv = () => {

  return cleanEnv(process.env, {
    DB_URL: str(),
    PORT: port(),
    RAPIDAPI_KEY: str(),
    SESSION_SECRET: str(),
    NODE_ENV: str({choices: ['development', 'production','test','CI']}),
    REDIS_URL: str()
  });
};

export default validateEnv();