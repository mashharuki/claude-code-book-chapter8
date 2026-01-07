import { describe, it, expect, afterEach } from 'vitest';
import { initCommand } from './init.js';
import { StorageService } from '../services/StorageService.js';
import { rm } from 'node:fs/promises';

describe('initCommand', () => {
  afterEach(async () => {
    try {
      await rm('.task', { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should initialize task management', async () => {
    const storage = new StorageService();

    await expect(initCommand()).resolves.not.toThrow();

    expect(await storage.exists()).toBe(true);
  });
});
