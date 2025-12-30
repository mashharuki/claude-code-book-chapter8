import { describe, it, expect } from 'vitest';
import { generateSlug } from './slug.js';

describe('generateSlug', () => {
  it('should convert title to slug', () => {
    expect(generateSlug('ユーザー認証機能')).toBe('');
    expect(generateSlug('User Authentication')).toBe('user-authentication');
  });

  it('should handle special characters', () => {
    expect(generateSlug('Task #1: Fix bug')).toBe('task-1-fix-bug');
  });

  it('should handle multiple spaces', () => {
    expect(generateSlug('Add    new    feature')).toBe('add-new-feature');
  });
});
