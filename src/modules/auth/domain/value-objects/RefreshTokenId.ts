import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class RefreshTokenId extends BaseUUID {
  constructor(id?: string) {
    super(id);
  }
}
