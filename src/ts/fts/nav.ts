export interface NavData {
  back: {
    disabled: boolean;
    redir: string;
  };
  forw: {
    disabled: boolean;
    redir: string;
  };
  prog: {
    val: number;
    max: number;
  };
}
