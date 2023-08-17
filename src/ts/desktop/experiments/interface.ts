export interface Experiment {
  title: string;
  description: string;
}

export type Experiments = { [key: string]: Experiment };
