import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TaskService } from './TaskService.js';
import { StorageService } from './StorageService.js';
import { TaskNotFoundError } from '../utils/errors.js';
import { rm } from 'node:fs/promises';

describe('TaskService', () => {
  let taskService: TaskService;
  let storage: StorageService;
  const testDir = '.test-task';

  beforeEach(async () => {
    storage = new StorageService(testDir);
    await storage.init();
    taskService = new TaskService(storage);
  });

  afterEach(async () => {
    try {
      await rm(testDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should create task', async () => {
    const task = await taskService.createTask('Test task');
    expect(task.title).toBe('Test task');
    expect(task.status).toBe('open');
    expect(task.id).toBe(1);
  });

  it('should get task by ID', async () => {
    const created = await taskService.createTask('Test task');
    const task = await taskService.getTaskById(created.id);
    expect(task.title).toBe('Test task');
  });

  it('should throw error for non-existent task', async () => {
    await expect(taskService.getTaskById(999)).rejects.toThrow(
      TaskNotFoundError
    );
  });

  it('should update task', async () => {
    const created = await taskService.createTask('Test task');
    const updated = await taskService.updateTask(created.id, {
      status: 'completed',
    });
    expect(updated.status).toBe('completed');
  });

  it('should delete task', async () => {
    const created = await taskService.createTask('Test task');
    await taskService.deleteTask(created.id);
    await expect(taskService.getTaskById(created.id)).rejects.toThrow(
      TaskNotFoundError
    );
  });
});
