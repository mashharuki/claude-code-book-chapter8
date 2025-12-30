import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { listCommand } from './list.js';
import { StorageService } from '../services/StorageService.js';
import { rm } from 'node:fs/promises';

describe('listCommand', () => {
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

  it('should list tasks', async () => {
    await expect(listCommand()).resolves.not.toThrow();
  });
});
