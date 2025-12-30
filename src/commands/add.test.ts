import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { addCommand } from './add.js';
import { StorageService } from '../services/StorageService.js';
import { rm } from 'node:fs/promises';

describe('addCommand', () => {
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

  it('should add task', async () => {
    await expect(addCommand('Test task')).resolves.not.toThrow();
  });
});
