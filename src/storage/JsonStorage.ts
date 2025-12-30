import { promises as fs } from 'fs';
import { dirname } from 'path';
import { StorageError } from '../utils/errors.js';

export class JsonStorage<T> {
  constructor(private filePath: string) {}

  async read(): Promise<T | null> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw new StorageError(
        `Failed to read file: ${(error as Error).message}`
      );
    }
  }

  async write(data: T): Promise<void> {
    try {
      // 原子的な書き込み: 一時ファイルに書き込んでからrename
      const tempPath = `${this.filePath}.tmp`;
      const dirPath = dirname(this.filePath);

      // ディレクトリが存在しない場合は作成
      await fs.mkdir(dirPath, { recursive: true });

      // 一時ファイルに書き込み
      await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');

      // renameで原子的に書き換え
      await fs.rename(tempPath, this.filePath);
    } catch (error) {
      throw new StorageError(
        `Failed to write file: ${(error as Error).message}`
      );
    }
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.filePath);
      return true;
    } catch {
      return false;
    }
  }
}
