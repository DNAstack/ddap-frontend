import { Account } from './account.model';
import { Profile } from './profile.model';

export interface Identity {
  account: {
    connectedAccounts: Account[];
    profile: Profile;
    properties: {
      subject: string;
    };
  };
  scopes: string[];
  sandbox: boolean;
}
