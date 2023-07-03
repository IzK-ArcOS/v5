import { get } from "svelte/store";
import pfp1 from "../../assets/pfp/1.png";
import pfp10 from "../../assets/pfp/10.png";
import pfp11 from "../../assets/pfp/11.png";
import pfp12 from "../../assets/pfp/12.png";
import pfp13 from "../../assets/pfp/13.png";
import pfp14 from "../../assets/pfp/14.png";
import pfp15 from "../../assets/pfp/15.png";
import pfp16 from "../../assets/pfp/16.png";
import pfp17 from "../../assets/pfp/17.png";
import pfp18 from "../../assets/pfp/18.png";
import pfp19 from "../../assets/pfp/19.png";
import pfp2 from "../../assets/pfp/2.png";
import pfp20 from "../../assets/pfp/20.png";
import pfp21 from "../../assets/pfp/21.png";
import pfp22 from "../../assets/pfp/22.png";
import pfp23 from "../../assets/pfp/23.png";
import pfp24 from "../../assets/pfp/24.png";
import pfp25 from "../../assets/pfp/25.png";
import pfp26 from "../../assets/pfp/26.png";
import pfp27 from "../../assets/pfp/27.png";
import pfp28 from "../../assets/pfp/28.png";
import pfp29 from "../../assets/pfp/29.png";
import pfp3 from "../../assets/pfp/3.png";
import pfp4 from "../../assets/pfp/4.png";
import pfp5 from "../../assets/pfp/5.png";
import pfp6 from "../../assets/pfp/6.png";
import pfp7 from "../../assets/pfp/7.png";
import pfp8 from "../../assets/pfp/8.png";
import pfp9 from "../../assets/pfp/9.png";
import def from "../../assets/pfp/null.png";
import { UserData } from "./interfaces";

export const ProfilePictures: { [key: string]: string } = {
  pfp1,
  pfp2,
  pfp3,
  pfp4,
  pfp5,
  pfp6,
  pfp7,
  pfp8,
  pfp9,
  pfp10,
  pfp11,
  pfp12,
  pfp13,
  pfp14,
  pfp15,
  pfp16,
  pfp17,
  pfp18,
  pfp19,
  pfp20,
  pfp21,
  pfp22,
  pfp23,
  pfp24,
  pfp25,
  pfp26,
  pfp27,
  pfp28,
  pfp29,
  def,
};

export function getProfilePicture(id: number | string) {
  /*   Log({
    msg: `Getting profile picture "${id}"`,
    source: "userlogic/pfp.ts: getProfilePicture",
    level: LogLevel.info,
  }); */

  if (typeof id == "number") return ProfilePictures[`pfp${id}`] || def;

  return id.toString();
}

export async function applyCustomPfp(url: string) {
  const udata = get(UserData);

  udata.acc.profilePicture = url;

  UserData.set(udata);
}
