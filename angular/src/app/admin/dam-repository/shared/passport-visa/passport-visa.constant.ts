export namespace PassportVisa {

  export enum AuthorityLevel {
    self = 'self',
    peer = 'peer',
    system = 'system',
    so = 'so',
    dac = 'dac',
  }

  export enum ConditionPrefix {
    const = 'const',
    pattern = 'pattern',
    split_pattern = 'split_pattern',
  }

}
