import { Profile } from './profile.model';

export interface Account {
  claims: any;
  profile: Profile;
  properties: {
    subject: string;
  };
  provider: string;
}
