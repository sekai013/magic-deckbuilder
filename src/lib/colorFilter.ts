import type { Colorless, Multicolor, SingleColor } from "./colors";

export type SingleColorCondition = Colorless | SingleColor;

export type MulticolorCondition = Multicolor;

export type ColorFilter = {
    conditions: SingleColorCondition[] | MulticolorCondition;
}
