import * as React from 'react';
import BoardView from "./Board";
import {Board} from "../Board/Board";
import {Weapon} from "../Units/Weapon";
import {Unit} from "../Units/Unit";

const board = new Board(6);
board.add(new Unit(Weapon.Paper), {x: 2, y: 5});
board.add(new Unit(Weapon.Scissor), {x: 1, y: 3});
board.add(new Unit(Weapon.Rock), {x: 4, y: 0});
board.add(new Unit(Weapon.Paper), {x: 4, y: 4});


export default (props: { color: string }): React.ReactElement =>
    <React.Fragment>
        <p>The color of this page is: {props.color}</p>
        <BoardView board={board}/>
    </React.Fragment>
