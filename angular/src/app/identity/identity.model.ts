import { Account } from './account.model';
import { Profile } from './profile.model';

export interface Identity {
  connectedAccounts: Account[];
  profile: Profile;
  properties: {
    subject: string;
  };
}
