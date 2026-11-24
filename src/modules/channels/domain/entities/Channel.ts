import { UserId } from '@/modules/users/domain/value-objects/UserId';

import { ChannelId } from '../value-objects/ChannelId';
import { IvsBinding } from '../value-objects/IvsBinding';

export class Channel {
  constructor(
    readonly id: ChannelId,
    readonly ownerId: UserId,
    readonly ivs: IvsBinding | null,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}
}
