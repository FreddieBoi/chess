import { Board } from "./Board";
import { Color } from "./Color";
import { GameState } from "./GameState";

const gameState = new GameState(
    new Board(),
    Color.White,
    {
        isBlackKingsidePossible: false,
        isBlackQueensidePossible: false,
        isWhiteKingsidePossible: false,
        isWhiteQueensidePossible: false,
    },
    null,
    0,
    1,
);
// tslint:disable-next-line: no-console
console.log(gameState);
