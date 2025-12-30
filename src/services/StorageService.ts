import { join } from 'path';
import { promises as fs } from 'fs';
import { JsonStorage } from '../storage/JsonStorage.js';
import type { Task } from '../types/Task.js';
import type { TaskStorage } from '../types/TaskStorage.js';

const TASK_DIR = '.task';
const TASK_FILE = 'tasks.json';

export class StorageService {
  private storage: JsonStorage<TaskStorage>;
  private taskDirPath: string;
  private taskFilePath: string;

  constructor(basePath: string = process.cwd()) {
    this.taskDirPath = join(basePath, TASK_DIR);
    this.taskFilePath = join(this.taskDirPath, TASK_FILE);
    this.storage = new JsonStorage<TaskStorage>(this.taskFilePath);
  }

  async getTasks(): Promise<Task[]> {
    const data = await this.storage.read();
    return data?.tasks || [];
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    const data = await this.storage.read();
    const nextId = data?.nextId || 1;

    await this.storage.write({
      tasks,
      nextId,
    });
  }

  async getNextId(): Promise<number> {
    const data = await this.storage.read();
    return data?.nextId || 1;
  }

  async updateNextId(nextId: number): Promise<void> {
    const tasks = await this.getTasks();
    await this.storage.write({
      tasks,
      nextId,
    });
  }

  async init(): Promise<void> {
    // ディレクトリ作成
    await fs.mkdir(this.taskDirPath, { recursive: true });

    // 初期データ作成
    await this.storage.write({
      tasks: [],
      nextId: 1,
    });
  }

  async exists(): Promise<boolean> {
    return await this.storage.exists();
  }
}
