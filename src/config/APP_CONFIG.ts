export const APP_CONFIG = {
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
        max_placeholder_length: 100,
        max_assets_key_length: 100
      },
      max_message_body_length: 500,
      max_token_hash_length: 255
    }
  }
} as const;
