import { defineSound } from "@web-kits/audio";
import { click, toggleOn, toggleOff, tabSwitch, tap } from "../../.web-kits/minimal";

export const playCtaClick = defineSound(click);
export const playPinOpen = defineSound(toggleOn);
export const playPinClose = defineSound(toggleOff);
export const playToggle = defineSound(tabSwitch);
export const playNavTap = defineSound(tap);
