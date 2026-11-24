import { ChannelId } from '@/modules/channels/domain/value-objects/ChannelId';

import { DurationMs } from '../value-objects/DurationMs';
import { IvsStreamId } from '../value-objects/IvsStreamId';
import { LikesCount } from '../value-objects/LikesCount';
import { MediaConvertJobId } from '../value-objects/MediaConvertJobId';
import { RecordingKey } from '../value-objects/RecordingKey';
import { RecordingStatus } from '../value-objects/RecordingStatus';
import { StreamDescription } from '../value-objects/StreamDescription';
import { StreamId } from '../value-objects/StreamId';
import { StreamPeriod } from '../value-objects/StreamPeriod';
import { StreamStatus } from '../value-objects/StreamStatus';
import { StreamTitle } from '../value-objects/StreamTitle';
import { ThumbnailKey } from '../value-objects/ThumbnailKey';

export class Stream {
  constructor(
    readonly id: StreamId,
    readonly channelId: ChannelId,
    readonly title: StreamTitle,
    readonly description: StreamDescription,
    readonly status: StreamStatus,
    readonly thumbnailKey: ThumbnailKey | null,
    readonly thumbnailPlaceholder: string | null,
    readonly likesCount: LikesCount | null,
    readonly ivsStreamId: IvsStreamId | null,
    readonly recordingKey: RecordingKey | null,
    readonly recordingStatus: RecordingStatus | null,
    readonly durationMs: DurationMs | null,
    readonly mediaConvertJobId: MediaConvertJobId | null,
    readonly period: StreamPeriod,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}
}
