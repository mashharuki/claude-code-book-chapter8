import Table from 'cli-table3';
import type { Task } from '../types/Task.js';
import { ColorFormatter } from './ColorFormatter.js';

export class TableFormatter {
  static formatTaskList(tasks: Task[]): string {
    if (tasks.length === 0) {
      return 'タスクがありません';
    }

    const table = new Table({
      head: ['ID', 'Status', 'Title', 'Branch'],
      colWidths: [6, 15, 45, 40],
    });

    tasks.forEach((task) => {
      const title =
        task.title.length > 40
          ? task.title.substring(0, 37) + '...'
          : task.title;
      const branch = task.branch || '-';

      table.push([
        task.id.toString(),
        ColorFormatter.formatStatus(task.status),
        title,
        branch,
      ]);
    });

    return table.toString();
  }
}
