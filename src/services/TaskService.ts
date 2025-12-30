import { StorageService } from './StorageService.js';
import type { Task } from '../types/Task.js';
import type { TaskStatus } from '../types/TaskStatus.js';
import { TaskNotFoundError } from '../utils/errors.js';
import { validateTaskTitle, validateTaskId } from '../utils/validation.js';

export class TaskService {
  constructor(private storage: StorageService) {}

  async createTask(title: string, description?: string): Promise<Task> {
    validateTaskTitle(title);

    const tasks = await this.storage.getTasks();
    const nextId = await this.storage.getNextId();

    const now = new Date().toISOString();
    const newTask: Task = {
      id: nextId,
      title,
      description,
      status: 'open',
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(newTask);
    await this.storage.saveTasks(tasks);
    await this.storage.updateNextId(nextId + 1);

    return newTask;
  }

  async getTaskById(id: number): Promise<Task> {
    validateTaskId(id);

    const tasks = await this.storage.getTasks();
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.storage.getTasks();
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    validateTaskId(id);

    const tasks = await this.storage.getTasks();
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new TaskNotFoundError(id);
    }

    const updatedTask: Task = {
      ...tasks[index],
      ...updates,
      id: tasks[index].id, // IDは変更不可
      createdAt: tasks[index].createdAt, // 作成日時は変更不可
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updatedTask;
    await this.storage.saveTasks(tasks);

    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    validateTaskId(id);

    const tasks = await this.storage.getTasks();
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new TaskNotFoundError(id);
    }

    tasks.splice(index, 1);
    await this.storage.saveTasks(tasks);
  }

  async filterByStatus(status: TaskStatus): Promise<Task[]> {
    const tasks = await this.storage.getTasks();
    return tasks.filter((t) => t.status === status);
  }
}
