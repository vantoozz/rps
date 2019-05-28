import {BoardDump} from "../Board/BoardDump";
import {Square} from "../Board/Square";
import {Unit} from "../Units/Unit";
import Team from "../Team/Team";

export const BoardClient = Symbol.for('BoardClientInterface');

export default interface BoardClientInterface{

    /**
     *
     */
    size: number;

    /**
     *
     */
    add(unit: Unit, square: Square, team: Team): void;

    /**
     *
     */
    dumpUnits(): BoardDump;

    /**
     * @param from
     * @param to
     */
    mayBeAttacked(from: Square, to: Square): boolean;

    /**
     * @param from
     * @param to
     */
    attack(from: Square, to: Square): void;

    /**
     * @param from
     * @param to
     */
    move(from: Square, to: Square): void;
}
