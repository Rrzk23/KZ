import session from "express-session";
import env from "../utils/env";
import MongoStore from "connect-mongo";

const sessionMiddleware = session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: process.env.CI === 'true' ? undefined : MongoStore.create({
      mongoUrl: env.DB_URL,
    }),
  });
// For testing purposes only
// passing a session store
export function setSessionStore(store: session.Store) {
    const sessionMiddleware = session({
      secret: 'test-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000,
      },
      rolling: true,
      store: store,
    });
    return sessionMiddleware;
  }

export default sessionMiddleware;