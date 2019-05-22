import * as React from 'react';
import {Board} from "../../Board/Board";
import {BoardDump} from "../../Board/BoardDump";
import {Weapon} from "../../Units/Weapon";
import {Square} from "../../Board/Square";
import classNames from "classnames";

interface BoardViewProps {
    board: Board;
}

interface BoardViewState {
    selectedUnit: Square;
}

export default class extends React.PureComponent<BoardViewProps, BoardViewState> {

    /**
     *
     */
    public render(): React.ReactElement {
        return (
            <table>
                {this.drawTable(this.props.board)}
            </table>
        )
    }

    private handleUnitClick(square: Square): void {
        console.log(square);
        this.setState({selectedUnit: square});
    }


    /**
     * @param board
     */
    private drawTable = (board: Board): React.ReactElement => {
        const rows: React.ReactElement[] = [];
        const units: BoardDump = board.dumpUnits();

        for (let x = 0; x < board.size; x++) {
            let squares = [];
            for (let y = 0; y < board.size; y++) {
                let squareElement = this.drawSquare(units, {x, y});
                squares.push(<td key={y}>{squareElement}</td>);
            }
            rows.push(<tr key={x}>{squares}</tr>);
        }
        return <tbody>{rows}</tbody>;
    };

    /**
     * @param units
     * @param square
     */
    private drawSquare(units: BoardDump, square: Square): React.ReactElement {
        const {x, y} = square;
        if (!Array.isArray(units[x]) || units[x][y] === undefined) {
            return <>□</>;
        }

        const elementClasses = classNames({
            'unit': true,
            selected: this.state && this.state.selectedUnit && this.state.selectedUnit.x === x && this.state.selectedUnit.y === y
        });

        return (
            <span
                className={elementClasses}
                onClick={(): void => this.handleUnitClick(square)}
            >
                {this.drawWeapon(units[x][y])}
            </span>
        );
    }


    /**
     * @param weapon
     */
    private drawWeapon = (weapon: Weapon): string => {
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
}
