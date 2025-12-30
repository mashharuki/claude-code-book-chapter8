import { ValidationError } from './errors.js';

export function validateTaskTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new ValidationError('Task title cannot be empty');
  }

  if (title.length > 200) {
    throw new ValidationError('Task title cannot exceed 200 characters');
  }
}

export function validateTaskId(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('Task ID must be a positive integer');
  }
}
