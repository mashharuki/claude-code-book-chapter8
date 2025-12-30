import simpleGit, { SimpleGit } from 'simple-git';
import { GitRepositoryNotFoundError } from '../utils/errors.js';
import { generateSlug } from '../utils/slug.js';

export class GitService {
  private git: SimpleGit;

  constructor(basePath: string = process.cwd()) {
    this.git = simpleGit(basePath);
  }

  async isGitRepository(): Promise<boolean> {
    try {
      await this.git.status();
      return true;
    } catch {
      return false;
    }
  }

  async createBranch(branchName: string): Promise<void> {
    const isRepo = await this.isGitRepository();
    if (!isRepo) {
      throw new GitRepositoryNotFoundError();
    }

    await this.git.checkoutLocalBranch(branchName);
  }

  async checkoutBranch(branchName: string): Promise<void> {
    const isRepo = await this.isGitRepository();
    if (!isRepo) {
      throw new GitRepositoryNotFoundError();
    }

    await this.git.checkout(branchName);
  }

  async branchExists(branchName: string): Promise<boolean> {
    const isRepo = await this.isGitRepository();
    if (!isRepo) {
      return false;
    }

    try {
      const branches = await this.git.branchLocal();
      return branches.all.includes(branchName);
    } catch {
      return false;
    }
  }

  generateBranchName(taskId: number, title: string): string {
    const slug = generateSlug(title);
    return `feature/task-${taskId}-${slug}`;
  }
}
