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
      max_message_body_length: 500,
      max_token_hash_length: 255
    }
  }
} as const;
