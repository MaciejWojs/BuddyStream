import { UserId } from '@/modules/users/domain/value-objects/UserId';

import { FollowError } from '../errors/FollowErrors';
import { FollowId } from '../value-objects/FollowId';

export class Follow {
  constructor(
    readonly id: FollowId,
    readonly followerId: UserId,
    readonly followeeId: UserId,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {
    if (followerId.value === followeeId.value) {
      throw new FollowError('follow.self');
    }
  }
}
