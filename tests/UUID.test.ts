import { describe, expect, test } from 'bun:test';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import { UserId } from '@/modules/users/domain/value-objects/UserId';

const uuid_v7 = '01a1ad32-0663-74ab-a681-baa99bba4a0a';
const FORCE_UUID_V7 = APP_CONFIG.domain.force_uuid_v7;

describe('creation', () => {
  test('Should create a valid UUID with a random value', () => {
    const result = new UserId();
    const result2 = new UserId();
    expect(result).toBeDefined();
    expect(result2).toBeDefined();
    expect(result.value).not.toBe(result2.value);
  });

  test('Should create a valid UUID with a specific value', () => {
    const result = new UserId(uuid_v7);
    expect(result.value).toBe(uuid_v7);
  });
});

describe('validation', () => {
  test('Should throw an error if the UUID is invalid', () => {
    expect(() => new UserId('invalid-uuid')).toThrow();
  });

  describe.skipIf(!FORCE_UUID_V7)('UUID v7', () => {
    test('Should create a valid UUID with v7 format', () => {
      const result = new UserId();
      expect(result.value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('Should throw an error if the UUID is v4 format', () => {
      const uuid_v4 = 'e97d7fb5-5185-452b-b2b8-20bd2da70a9a';
      expect(() => new UserId(uuid_v4)).toThrow();
    });
  });
});
