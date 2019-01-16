import { Square } from "./Square";
import { ISquareState } from "./SquareState";

export class Board {

    public squares: { [square: number]: ISquareState | null };

    constructor(squares: { [square: number]: ISquareState | null } = {}) {
        this.squares = {
            ...squares,
        };
    }

    public get(square: Square): ISquareState | null {
        return this.squares[square];
    }

    public set(square: Square, state: ISquareState | null) {
        this.squares[square] = state;
    }

}
