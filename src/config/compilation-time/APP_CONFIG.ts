import { defineConfig } from './defineConfig';

export const APP_CONFIG = defineConfig({
  core: {
    appName: 'buddy-stream-backend',
    appVersion: 'v0.1.0',
    appDescription: 'Buddy Stream Backend for video streaming platform'
  },
  security: {
    hash_algorithm: 'argon2id'
  },
  database: {
    limits: {
      roles: {
        max_name_length: 50,
        max_code_length: 50,
        max_description_length: 255
      },
      permissions: {
        max_code_length: 50,
        max_description_length: 255
      },
      users: {
        max_username_length: 100,
        max_email_length: 100
      },
      shared: {
        max_hash_length: 100,
        max_assets_key_length: 100
      },
      max_message_body_length: 500,
      max_token_hash_length: 255
    }
  },

  domain: {
    force_uuid_v7: true,
    limits: {
      users: {
        min_username_length: 3,
        min_password_length: 14,
        max_password_length: 64,
        min_password_strength: 3
      }
    }
  }
});
