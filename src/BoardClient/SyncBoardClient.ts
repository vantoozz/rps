import BoardClientInterface from "./BoardClientInterface";
import {Square} from "../Board/Square";
import {BoardDump} from "../Board/BoardDump";
import {Board} from "../Board/Board";
import 'reflect-metadata';
import {injectable} from 'inversify';
import {Unit} from "../Units/Unit";
import Team from "../Team/Team";

@injectable()
export default class SyncBoardClient implements BoardClientInterface {

    private readonly board: Board;

    /**
     * @param board
     */
    public constructor(board: Board) {
        this.board = board;
    }

    public add(unit: Unit, square: Square, team: Team): void {
        this.board.add(unit, square, team);
    }

    /**
     *
     */
    public get size(): number {
        return this.board.size;
    }

    /**
     * @param from
     * @param to
     */
    public attack(from: Square, to: Square): void {
        this.board.attack(from, to);
    }

    /**
     *
     */
    public dumpUnits(): BoardDump {
        return this.board.dumpUnits();
    }

    /**
     * @param from
     * @param to
     */
    public mayBeAttacked(from: Square, to: Square): boolean {
        return this.board.mayBeAttacked(from, to);
    }

    /**
     * @param from
     * @param to
     */
    public move(from: Square, to: Square): void {
        this.board.move(from, to);
    }

}
