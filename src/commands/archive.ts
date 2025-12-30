import chalk from 'chalk';
import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';

export async function archiveCommand(id: number): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);

  await taskService.updateTask(id, { status: 'archived' });
  console.log(chalk.green(`Task #${id} archived`));
}
