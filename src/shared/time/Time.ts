export class Time {
  private constructor() {}

  static expiresAt(duration: Temporal.DurationLike): Date {
    return new Date(Temporal.Now.instant().add(duration).epochMilliseconds);
  }

  static toEpochSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }
}
