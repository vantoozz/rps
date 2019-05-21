import {Weapon} from "./Weapon";
import {Fight} from "./Fight";
import {Result} from "./Result";

export class Unit {

    private _drawn: boolean = false;

    private readonly _weapon: Weapon;

    /**
     * @param _weapon
     */
    public constructor(_weapon: Weapon) {
        this._weapon = _weapon;
    }

    /**
     *
     */
    public get weapon(): Weapon {
        this._drawn = true;
        return this._weapon;
    }

    /**
     *
     */
    public get drawn(): boolean {
        return this._drawn;
    }


    /**
     * @param unit
     */
    public fight(unit: Unit): Result {
        return new Fight(this.weapon, unit.weapon).result();
    }
}
