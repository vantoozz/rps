import {Weapon} from "./Weapon";
import {Result} from "./Result";

export class Fight {
    constructor(private readonly one: Weapon, private readonly two: Weapon) {

    }

    public result(): Result {
        if (this.one === this.two) {
            return Result.Draw;
        }
        if (
            (Weapon.Rock === this.one && Weapon.Scissor === this.two)
            ||
            (Weapon.Scissor === this.one && Weapon.Paper === this.two)
            ||
            (Weapon.Paper === this.one && Weapon.Rock === this.two)
        ) {
            return Result.Win;
        }
        return Result.Lose;
    }
}
