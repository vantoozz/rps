import {Unit} from "../Units/Unit";
import {Square} from "./Square";
import {BoardDump} from "./BoardDump";

export class Board {

    private readonly units: Map<Unit, Square> = new Map<Unit, Square>();

    public constructor(private readonly _size: number) {
    }

    /**
     * @param unit
     * @param square
     */
    public add(unit: Unit, square: Square): void {
        if (!this.isSquareFits(square)) {
            throw 'Square is out the board';
        }
        if (!this.isSquareFree(square)) {
            throw 'There already is an unit here';
        }
        if (this.isUnitOnBoard(unit)) {
            throw 'The unit is already there';
        }

        this.units.set(unit, square);

        this.dumpMap();
    }

    /**
     * @param unit
     */
    public remove(unit: Unit): void {
        this.units.delete(unit);
        this.dumpMap();
    }

    /**
     * @param unit
     */
    public* availableTurns(unit: Unit): Iterable<Square> {
        const current = this.findUnit(unit);
        let possible: Square;
        for (let offsetX of [-1, 0, 1]) {
            for (let offsetY of [-1, 0, 1]) {
                possible = {x: current.x + offsetX, y: current.y + offsetY};
                if (!this.isSquareFits(possible) || !this.isSquareFree(possible)) {
                    continue;
                }
                if (possible.x !== current.x && possible.y !== current.y) {
                    continue;
                }
                yield Object.assign({}, possible);
            }
        }
    }

    /**
     *
     */
    public get size(): number {
        return this._size;
    }

    public dumpUnits(): BoardDump {
        let data: BoardDump = [];
        this.units.forEach((square: Square, unit: Unit) => {
            if (!Array.isArray(data[square.x])) {
                data[square.x] = [];
            }
            data[square.x][square.y] = unit.weapon;
        });
        return data;
    }

    /**
     * @param unit
     */
    private findUnit(unit: Unit): Square {
        if (!this.units.has(unit)) {
            throw 'No such unit on the board';
        }
        return <Square>this.units.get(unit);
    }

    /**
     * @param square
     */
    private unitAt(square: Square): Unit {
        for (let [unit, unitSquare] of this.units) {
            if (unitSquare.x === square.x && unitSquare.y === square.y) {
                return unit;
            }
        }
        throw 'No unit on the square';
    }

    /**
     * @param unit
     */
    private isUnitOnBoard(unit: Unit): boolean {
        try {
            this.findUnit(unit);
        } catch {
            return false;
        }
        return true;
    }

    /**
     * @param square
     */
    private isSquareFree(square: Square): boolean {
        try {
            this.unitAt(square);
        } catch {
            return true;
        }
        return false;
    }

    /**
     * @param square
     */
    private isSquareFits(square: Square): boolean {
        return square.x >= 0 && square.x < this.size && square.y >= 0 && square.y < this.size;
    }

    /**
     *
     */
    private dumpMap() {
        console.log(this.units);
    }

}
