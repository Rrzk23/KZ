"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_js_1 = require("envalid/dist/validators.js");
const validateEnv = () => {
    return (0, envalid_1.cleanEnv)(process.env, {
        DB_URL: (0, validators_js_1.str)({ default: 'mongodb+srv://mock:QNsZWok9HjBTYdly@cluster0.rxrjtdf.mongodb.net/cool_price_app?retryWrites=true&w=majority&appName=Cluster0' }),
        PORT: (0, validators_js_1.port)({ default: 5000 }),
        //RAPIDAPI_KEY: str(),
        SESSION_SECRET: (0, validators_js_1.str)({ default: 'mock_session_secret' }),
        NODE_ENV: (0, validators_js_1.str)({ choices: ['development', 'production', 'test', 'CI'] }),
        IMAGEKIT_PRIVATE_KEY: (0, validators_js_1.str)({ default: 'abc' }),
        ALPHA_VANTAGE_API_KEY: (0, validators_js_1.str)({ default: 'abc' })
        //REDIS_URL: str()
    });
};
exports.default = validateEnv();
