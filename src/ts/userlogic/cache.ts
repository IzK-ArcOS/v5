import { Cache } from "../cache";
import type { AllUsers } from "./interfaces";

export const UserCache = new Cache<AllUsers>("UserCache", {});
