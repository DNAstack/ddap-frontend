export interface DamsInfo {
  [id: string]: DamInfo;
}

export interface DamInfo {
  id: string;
  label: string;
  url: string;
}
