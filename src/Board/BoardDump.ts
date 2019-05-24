import {Weapon} from "../Units/Weapon";
import {Colour} from "../Team/Colour";

export interface BoardDump {
    [x: number]: {
        [y: number]: {
            weapon: Weapon;
            colour: Colour;
        };
    };
}
