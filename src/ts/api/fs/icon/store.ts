import type { ExtMimes } from "./interface";
import imgIcon from "../../../../assets/mimetypes/image-x-generic.svg";
import svgIcon from "../../../../assets/mimetypes/application-svg.svg";
import pdfIcon from "../../../../assets/mimetypes/application-pdf.svg";
import txtIcon from "../../../../assets/mimetypes/text-plain.svg";
import arcAppI from "../../../../assets/mimetypes/application-arcapp.svg";
import jsonIcon from "../../../../assets/mimetypes/application-json.svg";
import archiveIcon from "../../../../assets/mimetypes/application-x-compress.svg";
import markDownIcon from "../../../../assets/apps/markdownviewer.svg";
import soundIcon from "../../../../assets/mimetypes/audio-x-generic.svg";
import themeIcon from "../../../../assets/handlers/loadtheme.svg";
import arctermIcon from "../../../../assets/apps/arcterm.svg";

export const extensionIcons: ExtMimes = [
  {
    extensions: [".png", ".jpg", ".bmp", ".gif", ".ico", ".webp"],
    image: imgIcon,
  },
  {
    extensions: [".svg"],
    image: svgIcon,
  },
  {
    extensions: [".md"],
    image: markDownIcon,
  },
  {
    extensions: [".app", ".ealc", ".app.json"],
    image: arcAppI,
  },
  {
    extensions: [".pdf"],
    image: pdfIcon,
  },
  {
    extensions: [".txt"],
    image: txtIcon,
  },
  {
    extensions: [".json"],
    image: jsonIcon,
  },
  {
    extensions: [".zip", ".tar", ".tar.gz", ".7z", ".rar"],
    image: archiveIcon,
  },
  {
    extensions: [".flac", ".mp3", ".wav"],
    image: soundIcon,
  },
  {
    extensions: [".arctheme"],
    image: themeIcon,
  },
  {
    extensions: ["arcterm.conf"],
    image: arctermIcon,
  },
];
