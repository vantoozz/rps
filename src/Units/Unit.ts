import {Weapon} from "./Weapon";
import {Fight} from "./Fight";
import {Result} from "./Result";

export class Unit {

    private _drawn: boolean = false;

    constructor(private readonly _weapon: Weapon) {

    }

    public get weapon(): Weapon {
        this._drawn = true;
        return this._weapon;
    }

    public get drawn(): boolean {
        return this._drawn;
    }


    public fight(unit: Unit): Result {
        return new Fight(this.weapon, unit.weapon).result();
    }
}
