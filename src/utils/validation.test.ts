import { describe, it, expect } from 'vitest';
import { validateTaskTitle, validateTaskId } from './validation.js';
import { ValidationError } from './errors.js';

describe('validateTaskTitle', () => {
  it('should accept valid title', () => {
    expect(() => validateTaskTitle('Valid title')).not.toThrow();
  });

  it('should reject empty title', () => {
    expect(() => validateTaskTitle('')).toThrow(ValidationError);
    expect(() => validateTaskTitle('   ')).toThrow(ValidationError);
  });

  it('should reject title over 200 characters', () => {
    const longTitle = 'a'.repeat(201);
    expect(() => validateTaskTitle(longTitle)).toThrow(ValidationError);
  });
});

describe('validateTaskId', () => {
  it('should accept valid ID', () => {
    expect(() => validateTaskId(1)).not.toThrow();
  });

  it('should reject non-integer ID', () => {
    expect(() => validateTaskId(1.5)).toThrow(ValidationError);
  });

  it('should reject negative ID', () => {
    expect(() => validateTaskId(-1)).toThrow(ValidationError);
  });

  it('should reject zero ID', () => {
    expect(() => validateTaskId(0)).toThrow(ValidationError);
  });
});
