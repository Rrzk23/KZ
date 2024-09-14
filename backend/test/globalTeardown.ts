import mongoose from 'mongoose';

export default async function globalTeardown() {
  await mongoose.disconnect();
  const mongoServer = (global as any).__MONGO_SERVER__;
  if (mongoServer) {
    await mongoServer.stop();
  }
}