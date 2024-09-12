import { InferSchemaType, Schema, model } from 'mongoose';

const projectSchema = new Schema({
  title: { type: 'string', required: true },
  image: {type: 'string'},
  text: {type: 'string', required: true},
  demoUrl: {type: 'string'},
}, { timestamps: true });

type Project = InferSchemaType<typeof projectSchema>;

export default model<Project>('Project', projectSchema);