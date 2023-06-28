export interface Cred {
  username: string;
  password: string;
}

export type Params = { [key: string]: string };

export interface ApiError {
  title: string;
  message: string;
}

export interface UserDirectory {
  name: string;
  scopedPath: string;
  files: PartialArcFile[];
  directories: PartialUserDir[];
}

export interface PartialUserDir {
  name: string;
  scopedPath: string;
}

export interface PartialArcFile {
  size?: number;
  mime: string;
  filename: string;
  scopedPath: string;
}

export interface ArcFile {
  name: string;
  path: string;
  data: ArrayBuffer;
  mime: string;
  anymime?: boolean;
}

export interface DirReadResponse {
  valid: boolean;
  data: UserDirectory;
  error?: ApiError;
}

export const defaultDirectory: UserDirectory = {
  files: [],
  directories: [],
  name: "",
  scopedPath: "",
};

export type DirectoryGet = Promise<UserDirectory | false>;

export interface DefaultResponse {
  valid: boolean;
  data: any;
  error?: {
    title: string;
    message: string;
  };
  statusCode?: number;
}

export interface UserFileLoader {
  name: string;
  description: string;
  icon: string;
  loader: (file: ArcFile) => void;
  extensions: string[];
}

export type ApiResponse = Promise<DefaultResponse>;

export interface FSQuota {
  username: string;
  max: number;
  free: number;
  used: number;
}
