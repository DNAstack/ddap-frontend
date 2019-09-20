
export class TimeDurationParser {

  // example of valid string: "10d"
  static readonly regex = new RegExp(/^(-*\d+)(s|m|h|d|w)$/);

  static validate(duration: string): boolean {
    return this.regex.test(duration);
  }

  static parseAsDuration(duration: string): Duration {
    if (!TimeDurationParser.validate(duration)) {
      return null;
    }

    const params = this.regex.exec(duration);
    const value = parseInt(params[1], 10);
    return {
      value,
      unitOfTime: TimeDurationParser.humanizeUnitOfTime(value, params[2]),
    };
  }

  static humanizeUnitOfTime(value: number, unitOfTime: string): string {
    let longUnitOfTime = TimeDurationParser.shorthandToLongUnitOfTime(unitOfTime);
    if (value === 1) {
      longUnitOfTime = longUnitOfTime.substring(0, longUnitOfTime.length - 1);
    }
    return longUnitOfTime;
  }

  private static shorthandToLongUnitOfTime(unitOfTime: string) {
    switch (unitOfTime) {
      case 's': return 'seconds';
      case 'm': return 'minutes';
      case 'h': return 'hours';
      case 'd': return 'days';
      case 'w': return 'weeks';
      case 'M': return 'months';
      case 'y': return 'years';
      default: return '';
    }
  }

}

export interface Duration {
  value: number;
  unitOfTime: string;
}
