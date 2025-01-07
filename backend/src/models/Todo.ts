import mongoose, { Document, Schema } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, required: true },
});

export interface Todo extends Document {
  title: string;
  description: string;
  done: boolean;
}

export const TodoModel = mongoose.model<Todo>("Todo", TodoSchema);
