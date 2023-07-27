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
      case "list":
        list(term);
        break;
      default:
        term.std.Error("Missing or invalid subcommand.");
    }
  },
  help(term) {
    term.std.writeColor("[play] - Plays the specified sound.", "aqua");
    term.std.writeColor("[stop] - Stops the current playing sound.", "aqua");
    term.std.writeColor("[list] - Lists playable sounds.\n\n", "aqua");
    term.std.writeColor("Example: [soundbus] play ...", "blue")
  },
  syntax: "SOUNDBUS <[subcommand]> <...[arguments]>",
};

function play(cmd: string, argv: string[], term: ArcTerm) {
  const sound = argv[1];

  const valid = ArcSoundBus.playSound(sound);

  if (!valid)
    term.std.Error(
      `Can't play sound [${sound}]: the sound could not be found.`
    );
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

function list(term: ArcTerm) {
  const sounds = ArcSoundBus.getStore();

  for (let i = 0; i < sounds.length; i++) {
    const sound = sounds[i];
    const id = sound[0].padEnd(32, " ");
    const source = sound[1];

    term.std.writeColor(`[${id}]${source}`, "blue");
  }
}