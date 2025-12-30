import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import { join } from 'path';
import { JsonStorage } from './JsonStorage.js';

const TEST_DIR = join(process.cwd(), '.test-storage');
const TEST_FILE = join(TEST_DIR, 'test.json');

describe('JsonStorage', () => {
  let storage: JsonStorage<{ value: string }>;

  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
    storage = new JsonStorage<{ value: string }>(TEST_FILE);
  });

  afterEach(async () => {
    try {
      await fs.rm(TEST_DIR, { recursive: true, force: true });
    } catch {
      // Ignore errors
    }
  });

  it('should write and read data', async () => {
    const data = { value: 'test' };
    await storage.write(data);

    const result = await storage.read();
    expect(result).toEqual(data);
  });

  it('should return null for non-existent file', async () => {
    const result = await storage.read();
    expect(result).toBeNull();
  });

  it('should check file existence', async () => {
    expect(await storage.exists()).toBe(false);

    await storage.write({ value: 'test' });
    expect(await storage.exists()).toBe(true);
  });
});
