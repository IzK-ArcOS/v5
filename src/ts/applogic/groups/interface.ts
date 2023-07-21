export interface AppGroup {
  name: string;
  icon?: string;
  id?: string;
}

export interface CompiledAppGroup {
  apps: string[];
  name: string;
  icon?: string;
  id: string;
}

export type CompiledAppGroupStore = { [key: string]: CompiledAppGroup };
export type AppGroupStore = { [key: string]: AppGroup & { id: string } };
