import { cleanEnv } from 'envalid';
import { port, str } from 'envalid/dist/validators.js';

const validateEnv = () => {
  

  return cleanEnv(process.env, {
    DB_URL: str({ default: 'mongodb+srv://mock:QNsZWok9HjBTYdly@cluster0.rxrjtdf.mongodb.net/cool_price_app?retryWrites=true&w=majority&appName=Cluster0' }),
    PORT: port({default: 5001}),
    //RAPIDAPI_KEY: str(),
    SESSION_SECRET: str({default: 'mock_session_secret'}),
    NODE_ENV: str({choices: ['development', 'production','test','CI']}),
    //REDIS_URL: str()
  });
};

export default validateEnv();