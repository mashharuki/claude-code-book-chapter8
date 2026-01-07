import chalk from 'chalk';
import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';

export async function doneCommand(id: number): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);

  await taskService.updateTask(id, { status: 'completed' });
  console.log(chalk.green(`Task #${id} completed`));
}
