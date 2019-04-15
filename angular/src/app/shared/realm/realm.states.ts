import { Action, State, StateContext } from '@ngxs/store';

import { ChangeRealm } from './realm.actions';
import { defaultRealm } from './realm.constant';

export interface RealmStateModel {
  name: string;
}

@State<RealmStateModel>({
  name: 'realm',
  defaults: {
    name: defaultRealm,
  },
})
export class RealmState {

  @Action(ChangeRealm)
  public changeRealm(ctx: StateContext<RealmStateModel>, { name }: ChangeRealm) {
    ctx.setState((state) => ({ ...state, name }));
  }

}
