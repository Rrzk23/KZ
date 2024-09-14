import session from 'express-session';
import sessionConfig from '../config/sessionConfig';
import env from '../utils/env'

const currentSessionConfig = sessionConfig[env.NODE_ENV];

export const sessionMiddleware = session(currentSessionConfig);