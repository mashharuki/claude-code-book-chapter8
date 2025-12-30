import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { startCommand } from './start.js';
import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';
import { rm } from 'node:fs/promises';

describe('startCommand', () => {
  beforeEach(async () => {
    const storage = new StorageService();
    await storage.init();
  });

  afterEach(async () => {
    try {
      await rm('.task', { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should start task', async () => {
    const storage = new StorageService();
    const taskService = new TaskService(storage);
    const task = await taskService.createTask('Test task');

    await expect(startCommand(task.id)).resolves.not.toThrow();
  });
});
