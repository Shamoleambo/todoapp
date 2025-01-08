import { Todo } from "../models/Todo";
import { Document } from "mongoose";

export interface TodoRepository {
  save(todo: Todo): Promise<Document>;
}
