import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StorageService } from './StorageService.js';
import { rm } from 'node:fs/promises';

describe('StorageService', () => {
  let storage: StorageService;
  const testDir = '.test-storage-service';

  beforeEach(async () => {
    storage = new StorageService(testDir);
    await storage.init();
  });

  afterEach(async () => {
    try {
      await rm(testDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should initialize with empty tasks', async () => {
    const tasks = await storage.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should save and get tasks', async () => {
    const testTasks = [
      {
        id: 1,
        title: 'Test',
        status: 'open' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    await storage.saveTasks(testTasks);
    const tasks = await storage.getTasks();
    expect(tasks).toEqual(testTasks);
  });
});
