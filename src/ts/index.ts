import { fromFEN, toFEN } from "./FEN";

const gameState = fromFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e8 0 1", true);

// tslint:disable-next-line: no-console
console.log(toFEN(gameState));
