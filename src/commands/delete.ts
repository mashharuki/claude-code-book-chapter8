import chalk from 'chalk';
import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';
import { confirm } from '../utils/prompt.js';

export async function deleteCommand(id: number): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);

  const task = await taskService.getTaskById(id);
  const confirmed = await confirm(`Delete task #${id} "${task.title}"?`);

  if (!confirmed) {
    console.log(chalk.yellow('Cancelled'));
    return;
  }

  await taskService.deleteTask(id);
  console.log(chalk.green(`Task #${id} deleted`));
}
