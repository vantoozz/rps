import {Weapon} from "../Units/Weapon";

export interface BoardDump {
    [x: number]: {
        [y: number]: Weapon;
    };
}
