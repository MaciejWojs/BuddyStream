-- Create enum type "stream_recording_status"
CREATE TYPE "stream_recording_status" AS ENUM ('processing', 'ready', 'failed');
-- Create "outbox" table
CREATE TABLE "outbox" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "type" text NOT NULL,
  "payload" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "published_at" timestamptz NULL,
  PRIMARY KEY ("id")
);
-- Create index "outbox_unpublished_idx" to table: "outbox"
CREATE INDEX "outbox_unpublished_idx" ON "outbox" ("created_at") WHERE (published_at IS NULL);
-- Create "users" table
CREATE TABLE "users" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "username" character varying(100) NOT NULL,
  "email" character varying(100) NOT NULL,
  "password_hash" character varying(100) NOT NULL,
  "avatar_key" character varying(100) NULL,
  "avatar_placeholder" text NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "users_email_key" UNIQUE ("email"),
  CONSTRAINT "users_username_key" UNIQUE ("username")
);
-- Create "channels" table
CREATE TABLE "channels" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "owner_id" uuid NOT NULL,
  "ivs_arn" character varying(255) NULL,
  "ingest_endpoint" character varying(255) NULL,
  "playback_url" character varying(255) NULL,
  "stream_key_encrypted" character varying(255) NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "channels_ivs_arn_key" UNIQUE ("ivs_arn"),
  CONSTRAINT "channels_owner_id_key" UNIQUE ("owner_id"),
  CONSTRAINT "channels_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT
);
-- Create "streams" table
CREATE TABLE "streams" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "channel_id" uuid NOT NULL,
  "title" character varying(255) NOT NULL DEFAULT 'Untitled Stream',
  "description" character varying(255) NOT NULL DEFAULT 'Default stream description',
  "status" text NOT NULL DEFAULT 'ready',
  "thumbnail_key" character varying(100) NULL,
  "thumbnail_placeholder" text NULL,
  "likes_count" bigint NULL,
  "ivs_stream_id" character varying(255) NULL,
  "recording_key" character varying(255) NULL,
  "recording_status" "stream_recording_status" NULL,
  "duration_ms" integer NULL,
  "mediaconvert_job_id" character varying(255) NULL,
  "started_at" timestamptz NULL,
  "ended_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "streams_channel_id_channels_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT
);
-- Create index "streams_one_active_per_channel_idx" to table: "streams"
CREATE UNIQUE INDEX "streams_one_active_per_channel_idx" ON "streams" ("channel_id") WHERE (status = ANY (ARRAY['ready'::text, 'live'::text]));
-- Create "chat" table
CREATE TABLE "chat" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "stream_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "body" character varying(500) NOT NULL,
  "deleted_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "chat_stream_id_streams_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "streams" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "chat_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT
);
-- Create index "chat_stream_created_at_id_idx" to table: "chat"
CREATE INDEX "chat_stream_created_at_id_idx" ON "chat" ("stream_id", "created_at", "id");
-- Create "chat_message_edits" table
CREATE TABLE "chat_message_edits" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "message_id" uuid NOT NULL,
  "previous_body" character varying(500) NOT NULL,
  "edited_by" uuid NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "chat_message_edits_edited_by_users_id_fkey" FOREIGN KEY ("edited_by") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT,
  CONSTRAINT "chat_message_edits_message_id_chat_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create index "chat_message_edits_message_created_at_idx" to table: "chat_message_edits"
CREATE INDEX "chat_message_edits_message_created_at_idx" ON "chat_message_edits" ("message_id", "created_at");
-- Create "chat_message_events" table
CREATE TABLE "chat_message_events" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "message_id" uuid NOT NULL,
  "actor_id" uuid NOT NULL,
  "payload" jsonb NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "chat_message_events_actor_id_users_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT,
  CONSTRAINT "chat_message_events_message_id_chat_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "followers" table
CREATE TABLE "followers" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "follower_id" uuid NOT NULL,
  "followee_id" uuid NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "followers_pair_unique" UNIQUE ("follower_id", "followee_id"),
  CONSTRAINT "followers_followee_id_users_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "followers_follower_id_users_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "follower_is_not_followee" CHECK (follower_id <> followee_id)
);
-- Create "global_roles" table
CREATE TABLE "global_roles" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "name" character varying(50) NOT NULL,
  "code" character varying(50) NOT NULL,
  "description" character varying(255) NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "global_roles_code_key" UNIQUE ("code"),
  CONSTRAINT "global_roles_name_key" UNIQUE ("name")
);
-- Create "permissions" table
CREATE TABLE "permissions" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "code" character varying(50) NOT NULL,
  "description" character varying(255) NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "permissions_code_key" UNIQUE ("code")
);
-- Create "global_role_permissions" table
CREATE TABLE "global_role_permissions" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "global_role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "global_role_permissions_unique" UNIQUE ("global_role_id", "permission_id"),
  CONSTRAINT "global_role_permissions_global_role_id_global_roles_id_fkey" FOREIGN KEY ("global_role_id") REFERENCES "global_roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "global_role_permissions_permission_id_permissions_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "global_user_roles" table
CREATE TABLE "global_user_roles" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "user_id" uuid NOT NULL,
  "global_role_id" uuid NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "global_user_roles_unique" UNIQUE ("user_id", "global_role_id"),
  CONSTRAINT "global_user_roles_global_role_id_global_roles_id_fkey" FOREIGN KEY ("global_role_id") REFERENCES "global_roles" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT,
  CONSTRAINT "global_user_roles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "notifications" table
CREATE TABLE "notifications" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "recipient_id" uuid NOT NULL,
  "type" text NOT NULL,
  "payload" jsonb NOT NULL,
  "read_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "notifications_recipient_id_users_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create index "notifications_recipient_created_at_idx" to table: "notifications"
CREATE INDEX "notifications_recipient_created_at_idx" ON "notifications" ("recipient_id", "created_at");
-- Create "refresh_tokens" table
CREATE TABLE "refresh_tokens" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "user_id" uuid NOT NULL,
  "token_hash" character varying(255) NOT NULL,
  "revoked_at" timestamptz NULL,
  "expires_at" timestamptz NOT NULL DEFAULT (now() + '7 days'::interval),
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "refresh_tokens_token_hash_key" UNIQUE ("token_hash"),
  CONSTRAINT "refresh_tokens_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "stream_vod_likes" table
CREATE TABLE "stream_vod_likes" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "stream_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "stream_vod_likes_stream_user_unique" UNIQUE ("stream_id", "user_id"),
  CONSTRAINT "stream_vod_likes_stream_id_streams_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "streams" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "stream_vod_likes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "streamer_roles" table
CREATE TABLE "streamer_roles" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "name" character varying(50) NOT NULL,
  "code" character varying(50) NOT NULL,
  "description" character varying(255) NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "streamer_roles_code_key" UNIQUE ("code"),
  CONSTRAINT "streamer_roles_name_key" UNIQUE ("name")
);
-- Create "streamer_role_permissions" table
CREATE TABLE "streamer_role_permissions" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "streamer_role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "streamer_role_permissions_unique" UNIQUE ("streamer_role_id", "permission_id"),
  CONSTRAINT "streamer_role_permissions_Cmmxo03YRoR4_fkey" FOREIGN KEY ("streamer_role_id") REFERENCES "streamer_roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "streamer_role_permissions_permission_id_permissions_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "streamer_user_roles" table
CREATE TABLE "streamer_user_roles" (
  "id" uuid NOT NULL DEFAULT uuidv7(),
  "streamer_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "streamer_role_id" uuid NOT NULL,
  "updated_at" timestamptz NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "streamer_user_roles_unique" UNIQUE ("streamer_id", "user_id", "streamer_role_id"),
  CONSTRAINT "streamer_user_roles_streamer_id_users_id_fkey" FOREIGN KEY ("streamer_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "streamer_user_roles_streamer_role_id_streamer_roles_id_fkey" FOREIGN KEY ("streamer_role_id") REFERENCES "streamer_roles" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT,
  CONSTRAINT "streamer_user_roles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "streamer_is_not_user" CHECK (streamer_id <> user_id)
);
