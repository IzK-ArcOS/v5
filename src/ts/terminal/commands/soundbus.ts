import { ArcSoundBus } from "../../sound/main";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const SoundBusCommand: Command = {
  keyword: "soundbus",
  description: "SoundBus CLI",
  exec(cmd, argv, term) {
    switch (argv[0]) {
      case "play":
        play(cmd, argv, term);
        break;
      case "stop":
        stop(cmd, argv, term);
        break;
      default:
        term.std.Error("Missing or invalid subcommand.");
    }
  },
  syntax: "SOUNDBUS <[subcommand]> <...[arguments]>",
};

function play(cmd: string, argv: string[], term: ArcTerm) {
  const sound = argv[1];

  const valid = ArcSoundBus.playSound(sound);

  if (!valid) term.std.Error(`Can't play sound [${sound}]: not found.`);
  else term.std.writeColor(`Playing sound [${sound}]`, "blue");
}

function stop(cmd: string, argv: string[], term: ArcTerm) {
  const sound = argv[1];

  const valid = ArcSoundBus.stopSound(sound);

  if (!valid)
    term.std.Error(
      `Can't stop sound [${sound}]: the requested sound is not playing.`
    );
  else term.std.writeColor(`Stopping sound [${sound}]`, "blue");
}
