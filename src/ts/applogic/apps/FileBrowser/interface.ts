import type {
  ArcFile,
  PartialArcFile,
  PartialUserDir,
  UserDirectory,
} from "../../../api/interface";

export interface FileManagerState {
  currentDir: string;
  dirContents: UserDirectory;
  selectedFilename: string;
  openingFile: PartialArcFile;
  deletingFilename: string;
  uploadFile: ArcFile;
  openCancelled: boolean;
  refreshing: boolean;
  uploadProgress: number;
  cuttingFilename: PartialUserDir;
  copyingFilename: PartialUserDir;
  home: boolean;
  populating: boolean;
}
