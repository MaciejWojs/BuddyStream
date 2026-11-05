import { expect, test } from 'bun:test';

import { UserId } from '@/modules/users/domain/value-objects/UserId';

test('Should throw an error if the UUID is invalid', () => {
  expect(() => new UserId('invalid-uuid')).toThrow();
});

test('Should create a valid UUID', () => {
  const result = new UserId();
  expect(result).toBeDefined();
});

test('Should create a valid UUID with a specific value', () => {
  const uuid = '123e4567-e89b-12d3-a456-426614174000';
  const result = new UserId(uuid);
  expect(result.value).toBe(uuid);
});

test('Should create a valid UUID with v7 format', () => {
  const result = new UserId();
  expect(result.value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
});
