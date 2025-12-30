import chalk from 'chalk';
import { StorageService } from '../services/StorageService.js';

export async function initCommand(): Promise<void> {
  const storage = new StorageService();

  if (await storage.exists()) {
    console.log(chalk.yellow('Already initialized'));
    return;
  }

  await storage.init();
  console.log(chalk.green('Initialized successfully'));
  console.log(`Created .task/tasks.json`);
}
