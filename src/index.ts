#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { showCommand } from './commands/show.js';
import { startCommand } from './commands/start.js';
import { doneCommand } from './commands/done.js';
import { deleteCommand } from './commands/delete.js';
import { archiveCommand } from './commands/archive.js';
import type { TaskStatus } from './types/TaskStatus.js';

const program = new Command();

program
  .name('task')
  .description('CLI task management tool integrated with Git')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize task management')
  .action(async () => {
    try {
      await initCommand();
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('add <title>')
  .description('Add a new task')
  .option('-d, --description <description>', 'Task description')
  .action(async (title: string, options: { description?: string }) => {
    try {
      await addCommand(title, options.description);
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all tasks')
  .option(
    '-s, --status <status>',
    'Filter by status (open, in_progress, completed, archived)'
  )
  .action(async (options: { status?: TaskStatus }) => {
    try {
      await listCommand(options.status);
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('show <id>')
  .description('Show task details')
  .action(async (id: string) => {
    try {
      await showCommand(parseInt(id, 10));
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('start <id>')
  .description('Start working on a task')
  .action(async (id: string) => {
    try {
      await startCommand(parseInt(id, 10));
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('done <id>')
  .description('Mark task as completed')
  .action(async (id: string) => {
    try {
      await doneCommand(parseInt(id, 10));
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('delete <id>')
  .description('Delete a task')
  .action(async (id: string) => {
    try {
      await deleteCommand(parseInt(id, 10));
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program
  .command('archive <id>')
  .description('Archive a task')
  .action(async (id: string) => {
    try {
      await archiveCommand(parseInt(id, 10));
    } catch (error) {
      console.error(chalk.red((error as Error).message));
      process.exit(1);
    }
  });

program.parse();
