export type DevHostOption = string | {
  phrase: string;
  portOverride?: number;
  main?: boolean | ((url: string) => string);
};

export type DevHostsPluginOptions = {
  hosts?: DevHostOption[];
  baseReplace?: string;
};

