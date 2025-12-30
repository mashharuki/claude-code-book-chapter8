import chalk from 'chalk';
import { StorageService } from '../services/StorageService.js';
import { TaskService } from '../services/TaskService.js';
import { GitService } from '../services/GitService.js';

export async function startCommand(id: number): Promise<void> {
  const storage = new StorageService();
  const taskService = new TaskService(storage);
  const gitService = new GitService();

  const task = await taskService.getTaskById(id);

  // ステータスをin_progressに変更
  await taskService.updateTask(id, { status: 'in_progress' });

  // Git連携
  const isGitRepo = await gitService.isGitRepository();
  if (isGitRepo) {
    const branchName = gitService.generateBranchName(task.id, task.title);

    const exists = await gitService.branchExists(branchName);
    if (exists) {
      await gitService.checkoutBranch(branchName);
      console.log(chalk.green(`Switched to branch: ${branchName}`));
    } else {
      await gitService.createBranch(branchName);
      console.log(chalk.green(`Created and switched to branch: ${branchName}`));
    }

    // ブランチ名をタスクに記録
    await taskService.updateTask(id, { branch: branchName });
  } else {
    console.log(
      chalk.yellow('Git repository not found, skipping branch creation')
    );
  }

  console.log(chalk.green(`Task #${id} started`));
}
