import {Colour} from "./Colour";

export default class Team {

    private readonly _colour: Colour;

    public constructor(colour: Colour) {
        this._colour = colour;
    }

    public get colour(): Colour {
        return this._colour;
    }
}
