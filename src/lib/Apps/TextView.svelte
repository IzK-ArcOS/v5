<script lang="ts">
  import "../../css/desktop/apps/textview.css";
  import { closeWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore } from "../../ts/applogic/store";
  import { errorMessage } from "../../ts/errorlogic/main";
  import { createOverlayableError } from "../../ts/errorlogic/overlay";
  import { tryParse } from "../../ts/json";

  export let app: App;

  let errored = false;
  let fileContents = "";

  WindowStore.subscribe(() => {
    errored = false;

    if (!app.openedFile) return (fileContents = "");

    fileContents = new TextDecoder().decode(app.openedFile.data);

    const json = tryParse(fileContents);

    if (!json) return;

    if (json.error && json.valid == false) {
      errored = true;
      return createOverlayableError(
        {
          title: json.error.title,
          message: json.error.message,
          buttons: [
            { caption: "Close", action: () => closeWindow("TextEditor") },
          ],
        },
        "TextEditor"
      );
    }
  });
</script>

{#if app.openedFile && !errored}
  <textarea value={fileContents} spellcheck={false} />
{/if}
