import {Unit} from "../Units/Unit";
import {Square} from "./Square";
import {BoardDump} from "./BoardDump";
import {Result} from "../Units/Result";
import IncorrectTurnException from "../Exceptions/IncorrectTurnException";
import BoardException from "../Exceptions/BoardException";

export class Board {
    private readonly units: Map<Unit, Square> = new Map<Unit, Square>();

    private readonly _size: number;

    /**
     * @param _size
     */
    public constructor(_size: number) {
        this._size = _size;
    }

    /**
     * @param unit
     * @param square
     * @throws BoardException
     */
    public add(unit: Unit, square: Square): void {
        if (!this.isSquareFits(square)) {
            throw new BoardException('Square is out the board');
        }
        if (!this.isSquareFree(square)) {
            throw new BoardException('There already is an unit here');
        }
        if (this.isUnitOnBoard(unit)) {
            throw new BoardException('The unit is already there');
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
     * @throws BoardException
     */
    public* availableMove(unit: Unit): Iterable<Square> {
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
    public mayBeAttacked(from: Square, square: Square): boolean {
        if(this.isSquareFree(from)){
            return false;
        }
        if (this.isSquareFree(square)) {
            return false;
        }
        const offsetX: number = Math.abs(from.x - square.x);
        const offsetY: number = Math.abs(from.y - square.y);

        return (1 === offsetX && 0 === offsetY) || (0 === offsetX && 1 === offsetY);
    }

    /**
     *
     * @param from
     * @param to
     * @throws IncorrectTurnException
     * @throws BoardException
     */
    public move(from: Square, to: Square): void {
        const unit: Unit = this.unitAt(from);
        if (!this.isMoveAvailable(unit, to)) {
            throw new IncorrectTurnException('Unavailable move');
        }
        this.units.set(unit, to);
        this.dumpMap();
    }

    /**
     *
     * @param from
     * @param to
     * @throws IncorrectTurnException
     * @throws BoardException
     */
    public attack(from: Square, to: Square): Result {
        if (!this.mayBeAttacked(from, to)) {
            throw new IncorrectTurnException('Unavailable attack');
        }
        const unit1: Unit = this.unitAt(from);
        let unit2 = this.unitAt(to);
        const result = unit1.fight(unit2);
        if (Result.Win === result) {
            this.remove(unit2);
        } else if (Result.Lose === result) {
            this.remove(unit1);
        }
        this.dumpMap();
        return result;
    }

    /**
     *
     */
    public get size(): number {
        return this._size;
    }

    /**
     *
     */
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
     * @param square
     */
    private isMoveAvailable(unit: Unit, square: Square): boolean {
        for (const turn of this.availableMove(unit)) {
            if (turn.x === square.x && turn.y === square.y) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param unit
     * @throws BoardException
     */
    private findUnit(unit: Unit): Square {
        if (!this.units.has(unit)) {
            throw new BoardException('No such unit on the board');
        }
        return this.units.get(unit) as Square;
    }

    /**
     * @param square
     * @throws BoardException
     */
    private unitAt(square: Square): Unit {
        for (let [unit, unitSquare] of this.units) {
            if (unitSquare.x === square.x && unitSquare.y === square.y) {
                return unit;
            }
        }
        throw new BoardException('No unit on the square');
    }

    /**
     * @param unit
     */
    private isUnitOnBoard(unit: Unit): boolean {
        try {
            this.findUnit(unit);
        } catch (e) {
            if (e instanceof BoardException) {
                return false;
            }
            throw e;
        }
        return true;
    }

    /**
     * @param square
     */
    private isSquareFree(square: Square): boolean {
        try {
            this.unitAt(square);
        } catch (e) {
            if (e instanceof BoardException) {
                return true;
            }
            throw e;
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
