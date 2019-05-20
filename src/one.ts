import {Unit} from "./Units/Unit";
import {Weapon} from "./Units/Weapon";
import {Result} from "./Units/Result";
import {Board} from "./Board/Board";


const unit1 = new Unit(Weapon.Rock);
const unit2 = new Unit(Weapon.Scissor);
const unit3 = new Unit(Weapon.Paper);


const board = new Board(6);
board.add(unit1, {x: 0, y: 0});
board.add(unit2, {x: 1, y: 0});
board.add(unit3, {x: 0, y: 1});

const result = unit1.fight(unit2);
if (Result.Win === result) {
    board.remove(unit2);
    console.log([...board.availableTurns(unit1)]);
    console.log('Unit1 wins');
} else if (Result.Lose === result) {
    board.remove(unit1);
    console.log('Unit2 wins');
} else {
    console.log('Draw');
}

