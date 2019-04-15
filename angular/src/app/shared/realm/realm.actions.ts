export const REALM_CHANGE = '[Realm] Change Realm';

export class ChangeRealm {

  static readonly type = '[Realm] ChangeRealm';

  constructor(public name: string) {

  }
}
