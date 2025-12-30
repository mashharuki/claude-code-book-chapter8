import type { Task } from '../types/Task.js';
import { ColorFormatter } from './ColorFormatter.js';

export class DetailFormatter {
  static formatTaskDetail(task: Task): string {
    const lines: string[] = [];

    lines.push(`ID: ${task.id}`);
    lines.push(`Title: ${task.title}`);
    lines.push(`Status: ${ColorFormatter.formatStatus(task.status)}`);

    if (task.description) {
      lines.push(`Description: ${task.description}`);
    }

    if (task.branch) {
      lines.push(`Branch: ${task.branch}`);
    }

    lines.push(`Created: ${new Date(task.createdAt).toLocaleString()}`);
    lines.push(`Updated: ${new Date(task.updatedAt).toLocaleString()}`);

    return lines.join('\n');
  }
}
