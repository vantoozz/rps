import * as React from 'react';
import BoardView from "./Board/Board";
import {Board} from "../Board/Board";
import {Weapon} from "../Units/Weapon";
import {Unit} from "../Units/Unit";

const board = new Board(5);
board.add(new Unit(Weapon.Paper), {x: 0, y: 0});
board.add(new Unit(Weapon.Scissor), {x: 1, y: 0});
board.add(new Unit(Weapon.Rock), {x: 2, y: 0});
board.add(new Unit(Weapon.Scissor), {x: 3, y: 0});
board.add(new Unit(Weapon.Paper), {x: 4, y: 0});
board.add(new Unit(Weapon.Rock), {x: 0, y: 1});
board.add(new Unit(Weapon.Rock), {x: 1, y: 1});
board.add(new Unit(Weapon.Paper), {x: 2, y: 1});
board.add(new Unit(Weapon.Rock), {x: 3, y: 1});
board.add(new Unit(Weapon.Scissor), {x: 4, y: 1});
board.add(new Unit(Weapon.Paper), {x: 0, y: 3});
board.add(new Unit(Weapon.Scissor), {x: 1, y: 3});
board.add(new Unit(Weapon.Rock), {x: 2, y: 3});
board.add(new Unit(Weapon.Scissor), {x: 3, y: 3});
board.add(new Unit(Weapon.Paper), {x: 4, y: 3});
board.add(new Unit(Weapon.Rock), {x: 0, y: 4});
board.add(new Unit(Weapon.Rock), {x: 1, y: 4});
board.add(new Unit(Weapon.Paper), {x: 2, y: 4});
board.add(new Unit(Weapon.Rock), {x: 3, y: 4});
board.add(new Unit(Weapon.Scissor), {x: 4, y: 4});


export default (): React.ReactElement =>
    <BoardView board={board}/>
