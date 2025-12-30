import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';
import { TableFormatter } from '../formatters/TableFormatter.js';
import type { TaskStatus } from '../types/TaskStatus.js';

export async function listCommand(status?: TaskStatus): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);

  const tasks = status
    ? await taskService.filterByStatus(status)
    : await taskService.getAllTasks();

  const output = TableFormatter.formatTaskList(tasks);
  console.log(output);
}
