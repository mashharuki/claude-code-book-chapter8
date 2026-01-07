export class TaskNotFoundError extends Error {
  constructor(id: number) {
    super(`Task with ID ${id} not found`);
    this.name = 'TaskNotFoundError';
  }
}

export class GitRepositoryNotFoundError extends Error {
  constructor() {
    super('Git repository not found');
    this.name = 'GitRepositoryNotFoundError';
  }
}

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
