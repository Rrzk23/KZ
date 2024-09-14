import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MemoryStore } from 'express-session';
import app from '../src/app';
import { createSessionMiddleware } from '../src/middlewares/session';

let mongoServer: MongoMemoryServer;

export default async function globalSetup() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  const memoryStore = new MemoryStore();
  const sessionMiddleware = createSessionMiddleware(memoryStore);
  app.use(sessionMiddleware);

  // Make mongoServer available globally
  (global as any).__MONGO_SERVER__ = mongoServer;
}