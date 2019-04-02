export interface AccountLink {
  provider: string;
  profile?: {
    username: string;
  };
  label: string;
  linkUrl: string;
}
