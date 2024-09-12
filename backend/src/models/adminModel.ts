import { InferSchemaType, Schema, model } from 'mongoose';

const adminSchema = new Schema({
  adminName: { type: 'string', required: true, unique: true },
  password: { type: 'string', required: true, select: false },
});

type Admin = InferSchemaType<typeof adminSchema>;

export default model<Admin>('Admin', adminSchema);