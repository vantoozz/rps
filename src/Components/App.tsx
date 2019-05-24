import * as React from 'react';
import BoardView from "./Board/Board";
import {Board} from "../Board/Board";
import {Weapon} from "../Units/Weapon";
import {Unit} from "../Units/Unit";
import {Colour} from "../Team/Colour";
import Team from "../Team/Team";


const reds = new Team(Colour.Red);
const whites = new Team(Colour.White);
const greens = new Team(Colour.Green);

const board = new Board(7);

board.add(new Unit(Weapon.Paper), {x: 0, y: 0}, reds);
board.add(new Unit(Weapon.Scissor), {x: 1, y: 0}, reds);
board.add(new Unit(Weapon.Rock), {x: 2, y: 0}, reds);
board.add(new Unit(Weapon.Scissor), {x: 3, y: 0}, reds);
board.add(new Unit(Weapon.Paper), {x: 4, y: 0}, reds);
board.add(new Unit(Weapon.Rock), {x: 0, y: 1}, reds);
board.add(new Unit(Weapon.Rock), {x: 1, y: 1}, reds);
board.add(new Unit(Weapon.Paper), {x: 2, y: 1}, reds);
board.add(new Unit(Weapon.Rock), {x: 3, y: 1}, reds);
board.add(new Unit(Weapon.Scissor), {x: 4, y: 1}, reds);
board.add(new Unit(Weapon.Paper), {x: 0, y: 3}, whites);
board.add(new Unit(Weapon.Scissor), {x: 1, y: 3}, whites);
board.add(new Unit(Weapon.Rock), {x: 2, y: 3}, whites);
board.add(new Unit(Weapon.Scissor), {x: 3, y: 3}, whites);
board.add(new Unit(Weapon.Paper), {x: 4, y: 3}, whites);
board.add(new Unit(Weapon.Rock), {x: 0, y: 4}, whites);
board.add(new Unit(Weapon.Rock), {x: 1, y: 4}, whites);
board.add(new Unit(Weapon.Paper), {x: 2, y: 4}, whites);
board.add(new Unit(Weapon.Rock), {x: 3, y: 4}, whites);
board.add(new Unit(Weapon.Scissor), {x: 4, y: 4}, whites);
board.add(new Unit(Weapon.Paper), {x: 6, y: 6}, greens);
board.add(new Unit(Weapon.Rock), {x: 6, y: 5}, greens);
board.add(new Unit(Weapon.Scissor), {x: 6, y: 4}, greens);


export default (): React.ReactElement =>
    <BoardView board={board}/>
