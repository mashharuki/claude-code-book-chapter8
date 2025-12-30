import chalk from 'chalk';
import type { TaskStatus } from '../types/TaskStatus.js';

export class ColorFormatter {
  static formatStatus(status: TaskStatus): string {
    switch (status) {
      case 'open':
        return chalk.white(status);
      case 'in_progress':
        return chalk.yellow(status);
      case 'completed':
        return chalk.green(status);
      case 'archived':
        return chalk.gray(status);
      default:
        return status;
    }
  }
}
