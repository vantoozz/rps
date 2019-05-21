import {Weapon} from "../Units/Weapon";

export type BoardDump = {
    [x: number]: {
        [y: number]: Weapon
    }
};
