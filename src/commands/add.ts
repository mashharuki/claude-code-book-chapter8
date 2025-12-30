import chalk from 'chalk';
import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';

export async function addCommand(
  title: string,
  description?: string
): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);

  const task = await taskService.createTask(title, description);
  console.log(chalk.green(`Task #${task.id} created: ${task.title}`));
}
