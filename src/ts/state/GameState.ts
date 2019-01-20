import { Board } from "./Board";
import { ICastlingState } from "./Castling";
import { Color } from "./Color";
import { Square } from "./Square";

export class GameState {

    public board: Board;

    public activeColor: Color;

    public castling: ICastlingState;

    public enPassantSquare: Square | null;

    public halfMovesCountSinceLastCapture: number;

    public fullMoveNumber: number;

    constructor(
        board: Board,
        activeColor: Color,
        castling: ICastlingState,
        enPassant: Square | null,
        halfMovesCountSinceLastCapture: number,
        fullMoveNumber: number,
    ) {
        this.board = board;
        this.activeColor = activeColor;
        this.castling = castling;
        this.enPassantSquare = enPassant;
        this.halfMovesCountSinceLastCapture = halfMovesCountSinceLastCapture;
        this.fullMoveNumber = fullMoveNumber;
    }

}
