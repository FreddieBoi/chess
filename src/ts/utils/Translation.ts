import { ICastlingState } from "../state/Castling";
import { Color } from "../state/Color";
import { Piece } from "../state/Piece";
import { Square } from "../state/Square";
import { ISquareState } from "../state/SquareState";

export function toColorName(color: Color): string {
    switch (color) {
        case Color.White:
            return "\u2654";
        case Color.Black:
            return "\u265A";
    }
    return "-";
}

export function toSquareName(square: Square | null): string {
    return square || square === 0
        ? Square[square]
            .split("")
            .join(" ")
            .toUpperCase()
        : "-";
}

export function toFileName(file: number): string {
    return "abcdefgh"[file].toUpperCase();
}

export function toCastlingIcons(castling: ICastlingState): string {
    if (!castling.isWhiteKingsidePossible &&
        !castling.isWhiteQueensidePossible &&
        !castling.isBlackKingsidePossible &&
        !castling.isBlackQueensidePossible) {
        return "-";
    }
    const result: string[] = [];
    if (castling.isWhiteKingsidePossible) {
        result.push("\u2654");
    }
    if (castling.isWhiteQueensidePossible) {
        result.push("\u2655");
    }
    if (castling.isBlackKingsidePossible) {
        result.push("\u265A");
    }
    if (castling.isBlackQueensidePossible) {
        result.push("\u265B");
    }
    return result.join(" ");
}

export function toIcon(squareState: ISquareState | null): string {
    if (!squareState) {
        return "";
    }
    switch (squareState.color) {
        case Color.Black:
            switch (squareState.piece) {
                case Piece.Pawn:
                    return "\u265F";
                case Piece.Knight:
                    return "\u265E";
                case Piece.Bishop:
                    return "\u265D";
                case Piece.Rook:
                    return "\u265C";
                case Piece.Queen:
                    return "\u265B";
                case Piece.King:
                    return "\u265A";
            }
        case Color.White:
            switch (squareState.piece) {
                case Piece.Pawn:
                    return "\u2659";
                case Piece.Knight:
                    return "\u2658";
                case Piece.Bishop:
                    return "\u2657";
                case Piece.Rook:
                    return "\u2656";
                case Piece.Queen:
                    return "\u2655";
                case Piece.King:
                    return "\u2654";
            }
    }
    return "";
}
