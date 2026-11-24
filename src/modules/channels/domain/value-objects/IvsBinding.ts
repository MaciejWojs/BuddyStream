import { ChannelError } from '../errors/ChannelErrors';
import { EncryptedStreamKey } from './EncryptedStreamKey';
import { IngestEndpoint } from './IngestEndpoint';
import { IvsArn } from './IvsArn';
import { PlaybackUrl } from './PlaybackUrl';

type IvsBindingParts = {
  arn: string | null;
  ingestEndpoint: string | null;
  playbackUrl: string | null;
  encryptedStreamKey: string | null;
};

export class IvsBinding {
  private constructor(
    readonly arn: IvsArn,
    readonly ingestEndpoint: IngestEndpoint,
    readonly playbackUrl: PlaybackUrl,
    readonly encryptedStreamKey: EncryptedStreamKey
  ) {}

  static create(parts: {
    arn: string;
    ingestEndpoint: string;
    playbackUrl: string;
    encryptedStreamKey: string;
  }): IvsBinding {
    return new IvsBinding(
      new IvsArn(parts.arn),
      new IngestEndpoint(parts.ingestEndpoint),
      new PlaybackUrl(parts.playbackUrl),
      new EncryptedStreamKey(parts.encryptedStreamKey)
    );
  }

  static fromPersistence(parts: IvsBindingParts): IvsBinding | null {
    const { arn, ingestEndpoint, playbackUrl, encryptedStreamKey } = parts;
    const missing = arn === null || ingestEndpoint === null || playbackUrl === null || encryptedStreamKey === null;
    const present = arn !== null || ingestEndpoint !== null || playbackUrl !== null || encryptedStreamKey !== null;

    if (missing && present) {
      throw new ChannelError('channel.ivs_binding.incomplete');
    }
    if (missing) {
      return null;
    }

    return IvsBinding.create({ arn, ingestEndpoint, playbackUrl, encryptedStreamKey });
  }
}
