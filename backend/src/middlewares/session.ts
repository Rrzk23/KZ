import session from 'express-session';
import sessionConfig from '../config/sessionConfig';
import env from '../utils/env'


let environmentKey = env.NODE_ENV || 'development';



const currentSessionConfig = sessionConfig[env.NODE_ENV];

export const sessionMiddleware = session(currentSessionConfig);