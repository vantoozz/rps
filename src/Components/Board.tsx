import * as React from 'react';
import {Board} from "../Board/Board";
import {BoardDump} from "../Board/BoardDump";
import {Weapon} from "../Units/Weapon";

export default (props: { board: Board }): React.ReactElement =>
    <table>
        {drawTable(props.board)}
    </table>

/**
 * @param board
 */
const drawTable = (board: Board): React.ReactElement => {
    const rows: React.ReactElement[] = [];
    const units: BoardDump = board.dumpUnits();

    for (let x = 0; x < board.size; x++) {
        let squares = [];
        for (let y = 0; y < board.size; y++) {
            let square: string = '□';
            if (Array.isArray(units[x]) && units[x][y] !== undefined) {
                square = drawWeapon(units[x][y]);
            }
            squares.push(<td key={y}>{square}</td>);
        }
        rows.push(<tr key={x}>{squares}</tr>);
    }
    return <tbody>{rows}</tbody>;
};

/**
 * @param weapon
 */
const drawWeapon = (weapon: Weapon): string => {
    switch (weapon) {
        case Weapon.Rock:
            return '✊';
        case Weapon.Paper:
            return '✋';
        case Weapon.Scissor:
            return '✌';
    }
    throw 'Unknown weapon';
};
