import {Weapon} from "./Weapon";
import {Result} from "./Result";

export class Fight {

    private readonly one: Weapon;

    private readonly two: Weapon;

    /**
     * @param one
     * @param two
     */
    public constructor(one: Weapon, two: Weapon) {
        this.two = two;
        this.one = one;

    }

    /**
     *
     */
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
