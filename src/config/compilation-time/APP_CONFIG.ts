import { version } from '../../../package.json';
import { defineConfig } from './defineConfig';

const appVersion = version.startsWith('v') ? version : `v${version}`;

export const APP_CONFIG = defineConfig({
  core: {
    appName: 'buddy-stream-backend',
    appVersion: appVersion,
    appDescription: 'Buddy Stream Backend for video streaming platform'
  },
  security: {
    hash_algorithm: 'argon2id',
    jwt_algorithm: 'HS256',
    access_token_expires_in_minutes: 15,
    refresf_token_expires_in_days: 7,
    refresh_token_secret_length: 64
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
        max_hash_length: 255,
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
      },
      roles: {
        min_name_length: 4,
        min_code_length: 6
      },
      permissions: {
        min_code_length: 6
      },
      refresh_tokens: {
        min_secret_length: 32,
        max_secret_length: 128
      }
    }
  }
});
