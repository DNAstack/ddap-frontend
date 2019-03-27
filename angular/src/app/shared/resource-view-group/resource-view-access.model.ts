export interface ResourceViewAccess {
  inProgress: boolean;
  account: string;
  token: string;
  url?: string;
  error?: string;
}
