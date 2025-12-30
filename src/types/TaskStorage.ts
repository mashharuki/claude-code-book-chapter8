import type { Task } from './Task.js';

export interface TaskStorage {
  tasks: Task[];
  nextId: number;
}
