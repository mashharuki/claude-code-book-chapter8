import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';
import { DetailFormatter } from '../formatters/DetailFormatter.js';

export async function showCommand(id: number): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);

  const task = await taskService.getTaskById(id);
  const output = DetailFormatter.formatTaskDetail(task);
  console.log(output);
}
