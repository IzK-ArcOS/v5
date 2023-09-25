import { ArcTermIcon, MarkDownViewerIcon } from "../../../icon/apps";
import { ThemesIcon } from "../../../icon/main";
import {
  ArcAppMimeIcon,
  AudioMimeIcon,
  CompressMimeIcon,
  ImageMimeIcon,
  JsonMimeIcon,
  PdfMimeIcon,
  PlainMimeIcon,
  SvgMimeIcon,
} from "../../../icon/mimetypes";
import type { ExtMimes } from "./interface";

export const extensionIcons: ExtMimes = [
  {
    extensions: [".png", ".jpg", ".bmp", ".gif", ".ico", ".webp"],
    image: ImageMimeIcon,
  },
  {
    extensions: [".svg"],
    image: SvgMimeIcon,
  },
  {
    extensions: [".md"],
    image: MarkDownViewerIcon,
  },
  {
    extensions: [".app", ".ealc", ".app.json"],
    image: ArcAppMimeIcon,
  },
  {
    extensions: [".pdf"],
    image: PdfMimeIcon,
  },
  {
    extensions: [".txt"],
    image: PlainMimeIcon,
  },
  {
    extensions: [".json"],
    image: JsonMimeIcon,
  },
  {
    extensions: [".zip", ".tar", ".tar.gz", ".7z", ".rar"],
    image: CompressMimeIcon,
  },
  {
    extensions: [".flac", ".mp3", ".wav"],
    image: AudioMimeIcon,
  },
  {
    extensions: [".arctheme"],
    image: ThemesIcon,
  },
  {
    extensions: ["arcterm.conf"],
    image: ArcTermIcon,
  },
];
