
export class DnaChangeQueryParser {

  // example of valid string: "1 : 123456 T > C"
  static readonly regex = new RegExp(/^\s*(\w+)\s*:\s*(\d+.*)\s+([a-zA-Z]+)\s*>\s*([a-zA-Z]+)\s*$/);

  static validate(query: string): boolean {
    return this.regex.test(query);
  }

  static parseParams(query: string): any {
    const params = this.regex.exec(query);

    return {
      referenceName: params[1],
      start: params[2],
      referenceBases: params[3],
      alternateBases: params[4],
    };
  }

}
