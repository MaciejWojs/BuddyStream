import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class RefreshTokenId extends BaseUUID {
  private constructor(value?: string) {
    super(value);
  }
}
