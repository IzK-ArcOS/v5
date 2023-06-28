const observer = new MutationObserver(mutationCallback);

function attachDisableAnchorRedirection() {
  const anchors = document.querySelectorAll("a");

  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", (e) => e.preventDefault());
  }
}

function mutationCallback(mutationsList: MutationRecord[]) {
  for (let i = 0; i < mutationsList.length; i++) {
    const mutation = mutationsList[i];

    if (mutation.type !== "childList") continue;

    attachDisableAnchorRedirection();
  }
}

export function preventAnchorRedirects() {
  observer.observe(document.body, { childList: true, subtree: true });
}
