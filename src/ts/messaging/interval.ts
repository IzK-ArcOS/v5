import { get } from "svelte/store";
import { getUserPfp } from "../api/pfp";
import { openWindow, requestUserAttention } from "../applogic/events";
import { makeNotification } from "../notiflogic/main";
import { CurrentState } from "../state/main";
import { UserName } from "../userlogic/interfaces";
import { getUnreadMessages } from "./get";
import { messageUpdateTrigger } from "./updates";

let interval;

const pollBlockList = [];

export function startMessageCheckInterval() {
  interval = setInterval(tick, 1000 * 60); // every 60 sec

  tick();
}

async function tick() {
  if (!get(UserName) || CurrentState.name != "Desktop")
    return stopMessageCheckInterval();

  messageUpdateTrigger();

  const unreads = (await getUnreadMessages()).sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  if (!unreads.length) return;

  const message = unreads[0];

  if (!message || pollBlockList.includes(message.id)) return;

  pollBlockList.push(message.id);

  requestUserAttention("MessagingApp");

  makeNotification({
    title: `New message from ${message.sender}`,
    message: `${message.partialBody}`,
    image: await getUserPfp(message.sender),
    buttons: [
      {
        caption: "Open Messages",
        action: () => {
          messageUpdateTrigger();
          openWindow("MessagingApp");
        },
      },
    ],
  });
}

export function stopMessageCheckInterval() {
  clearInterval(interval);
}
