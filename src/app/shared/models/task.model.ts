import { Category } from "./category.model";

interface BaseTask {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
  categoryId: string;
}

export interface RawTask extends BaseTask {
  createdAt: string;
  updatedAt?: string;
}

export interface Task extends BaseTask {
  createdAt: Date;
  updatedAt?: Date;
}

export interface TaskDetail extends Task {
  category: Category;
}

export interface AddTask {
  name: string;
  description?: string;
  completed: boolean;
  categoryId: string;
}

export interface UpdateTask {
  id: string;
  name?: string;
  description?: string;
  completed?: boolean;
  categoryId?: string;
}
