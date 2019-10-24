import { Profile } from './profile.model';

export interface Account {
  profile: Profile;
  properties: {
    subject: string;
  };
  provider: string;
  identityProvider?: {
    ui: {
      label: string;
    }
  };
  passport?: any;
  loginHint: string;
}
