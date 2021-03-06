import * as React from 'react';
import {BoardDump} from "../../Board/BoardDump";
import {Weapon} from "../../Units/Weapon";
import {Square} from "../../Board/Square";
import classNames from "classnames";
import MessageLog from "./MessageLog";
import AppException from "../../Exceptions/AppException";
import BoardClientInterface from "../../BoardClient/BoardClientInterface";

interface Props {
    board: BoardClientInterface;
}

interface State {
    selectedSquare?: Square;
    log: string[];
}

export default class BoardView extends React.PureComponent<Props, State> {

    /**
     *
     * @param props
     */
    public constructor(props: Props) {
        super(props);

        this.state = {
            log: []
        }
    }


    /**
     *
     */
    public render(): React.ReactElement {
        return (
            <>
                {this.drawTable()}
                <MessageLog messages={this.state.log}/>
            </>

        )
    }

    /**
     * @param square
     */
    private handleUnitClick(square: Square): void {

        if (this.isUnderAttack(square)) {
            return this.handleAttack(square);
        }

        if (this.isSelected(square)) {
            this.setState({selectedSquare: undefined});
            return;
        }
        this.setState({selectedSquare: square});
    }

    /**
     * @param square
     */
    private handleAttack(square: Square): void {
        if (!this.state || undefined === this.state.selectedSquare) {
            return;
        }
        try {
            this.props.board.attack(this.state.selectedSquare, square);
        } catch (e) {
            this.log((e as AppException).message);
            return;
        }

        this.setState({selectedSquare: undefined});
    }

    /**
     * @param square
     */
    private handleSquareClick(square: Square): void {
        if (!this.state || undefined === this.state.selectedSquare) {
            return;
        }
        this.moveUnit(this.state.selectedSquare, square);
    }

    /**
     *
     * @param from
     * @param to
     */
    private moveUnit(from: Square, to: Square): void {
        try {
            this.props.board.move(from, to);
        } catch (e) {
            this.log((e as AppException).message);
            return;
        }

        this.setState({selectedSquare: to});
    }

    /**
     *
     */
    private drawTable = (): React.ReactElement => {
        const rows: React.ReactElement[] = [];
        const units: BoardDump = this.props.board.dumpUnits();

        for (let y = 0; y < this.props.board.size; y++) {
            let squares = [];
            for (let x = 0; x < this.props.board.size; x++) {
                let squareElement = this.drawSquare(units, {x, y});
                squares.push(<td key={x}>{squareElement}</td>);
            }
            rows.push(<tr key={y}>{squares}</tr>);
        }
        return <table>
            <tbody>{rows}</tbody>
        </table>;
    };

    /**
     * @param units
     * @param square
     */
    private drawSquare(units: BoardDump, square: Square): React.ReactElement {
        const {x, y} = square;
        if (!Array.isArray(units[x]) || units[x][y] === undefined) {
            return (
                <span
                    className='square'
                    onClick={(): void => this.handleSquareClick(square)}
                >
                    □
                </span>
            );
        }

        const elementClasses = classNames({
            selected: this.isSelected(square),
            underAttack: this.isUnderAttack(square),
        }, 'unit', `colour${units[x][y].colour}`);

        return (
            <span
                className={elementClasses}
                onClick={(): void => this.handleUnitClick(square)}
            >
                {this.drawWeapon(units[x][y].weapon)}
            </span>
        );
    }

    /**
     * @param square
     */
    private isUnderAttack(square: Square): boolean {

        if (!this.state || this.state.selectedSquare === undefined) {
            return false;
        }

        return this.props.board.mayBeAttacked(this.state.selectedSquare, square);
    }

    /**
     * @param square
     */
    private isSelected(square: Square): boolean {
        return this.state && this.state.selectedSquare !== undefined
            && this.state.selectedSquare.x === square.x && this.state.selectedSquare.y === square.y;
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

    /**
     * @param message
     */
    private log(message: string): void {
        this.setState((prevState): { log: string[] } => ({
            log: [...prevState.log, message]
        }))
    }
}
