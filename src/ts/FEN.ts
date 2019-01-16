import { Board } from "./Board";
import { ICastlingState } from "./Castling";
import { Color } from "./Color";
import { GameState } from "./GameState";
import { Piece } from "./Piece";
import { Square } from "./Square";
import { ISquareState } from "./SquareState";

export function toColorFEN(color: Color): string {
    switch (color) {
        case Color.White:
            return "w";
        case Color.Black:
            return "b";
    }
    return "-";
}

export function fromColorFEN(colorFen: string): Color | null {
    switch ((colorFen || "").trim().toLowerCase()) {
        case "w":
            return Color.White;
        case "b":
            return Color.Black;
    }
    return null;
}

export function toPieceFEN(squareState: ISquareState | null): string {
    if (!squareState) {
        return "-";
    }
    switch (squareState.color) {
        case Color.Black:
            switch (squareState.piece) {
                case Piece.Pawn:
                    return "p";
                case Piece.Knight:
                    return "n";
                case Piece.Bishop:
                    return "b";
                case Piece.Rook:
                    return "r";
                case Piece.Queen:
                    return "q";
                case Piece.King:
                    return "k";
            }
        case Color.White:
            switch (squareState.piece) {
                case Piece.Pawn:
                    return "P";
                case Piece.Knight:
                    return "N";
                case Piece.Bishop:
                    return "B";
                case Piece.Rook:
                    return "R";
                case Piece.Queen:
                    return "Q";
                case Piece.King:
                    return "K";
            }
    }
    return "-";
}

export function fromPieceFEN(pieceFen: string): ISquareState | null {
    switch ((pieceFen || "").trim()) {
        case "p":
            return {
                color: Color.Black,
                piece: Piece.Pawn,
            };
        case "P":
            return {
                color: Color.White,
                piece: Piece.Pawn,
            };
        case "n":
            return {
                color: Color.Black,
                piece: Piece.Knight,
            };
        case "N":
            return {
                color: Color.White,
                piece: Piece.Knight,
            };
        case "b":
            return {
                color: Color.Black,
                piece: Piece.Bishop,
            };
        case "B":
            return {
                color: Color.White,
                piece: Piece.Bishop,
            };
        case "r":
            return {
                color: Color.Black,
                piece: Piece.Rook,
            };
        case "R":
            return {
                color: Color.White,
                piece: Piece.Rook,
            };
        case "q":
            return {
                color: Color.Black,
                piece: Piece.Queen,
            };
        case "Q":
            return {
                color: Color.White,
                piece: Piece.Queen,
            };
        case "k":
            return {
                color: Color.Black,
                piece: Piece.King,
            };
        case "K":
            return {
                color: Color.White,
                piece: Piece.King,
            };
    }
    return null;
}

export function fromBoardFEN(boardFen: string): Board {
    const ranks = (boardFen || "").trim().split("/");
    const squares: { [square: number]: ISquareState | null } = {};
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
        const simpleRank = toSimpleRankFEN(ranks[rankIndex]);
        const simpleRankSquares = simpleRank.split("");
        for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
            const squareState = fromPieceFEN(simpleRankSquares[squareIndex]);
            squares[rankIndex * 8 + squareIndex] = squareState
                ? {
                    color: squareState.color,
                    piece: squareState.piece,
                }
                : null;
        }
    }
    const board = new Board(squares);
    return board;
}

export function toBoardFEN(board: Board): string {
    if (!board) {
        return "-";
    }
    let result = "";
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
        for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
            result += toPieceFEN(board.squares[rankIndex * 8 + squareIndex]);
        }
        result += "/";
    }
    return result;
}

/**
 * From castling availability FEN.
 * "-" neither side can castle
 * "K" white can castle kingside
 * "Q" white can castle queenside
 * "k" black can castle kingside
 * "q" black can castle queenside
 * @param castlingFen the FEN describing castling availability
 */
export function fromCastleFEN(castlingFen: string): ICastlingState | null {
    const input = (castlingFen || "").trim();
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(input)) {
        return null;
    }
    const castling: ICastlingState = {
        isBlackKingsidePossible: false,
        isBlackQueensidePossible: false,
        isWhiteKingsidePossible: false,
        isWhiteQueensidePossible: false,
    };
    if (castlingFen.indexOf("K") !== -1) {
        castling.isWhiteKingsidePossible = true;
    }
    if (castlingFen.indexOf("Q") !== -1) {
        castling.isWhiteQueensidePossible = true;
    }
    if (castlingFen.indexOf("k") !== -1) {
        castling.isBlackKingsidePossible = true;
    }
    if (castlingFen.indexOf("q") !== -1) {
        castling.isBlackQueensidePossible = true;
    }
    return castling;
}

/**
 * Castling availability as FEN.
 * "-" neither side can castle
 * "K" white can castle kingside
 * "Q" white can castle queenside
 * "k" black can castle kingside
 * "q" black can castle queenside
 * @param castling the castling availability state
 */
export function toCastleFEN(castling: ICastlingState): string {
    if (!castling.isWhiteKingsidePossible &&
        !castling.isWhiteQueensidePossible &&
        !castling.isBlackKingsidePossible &&
        !castling.isBlackQueensidePossible) {
        return "-";
    }
    let result = "";
    if (castling.isWhiteKingsidePossible) {
        result += "K";
    }
    if (castling.isWhiteQueensidePossible) {
        result += "Q";
    }
    if (castling.isBlackKingsidePossible) {
        result += "k";
    }
    if (castling.isBlackQueensidePossible) {
        result += "q";
    }
    return result;
}

export function isValidSquareFEN(squareFen: string): boolean {
    if (!squareFen) {
        return false;
    }
    if (squareFen === "-") {
        return true;
    }
    const square = fromSquareFEN(squareFen);
    return !!square || square === 0;
}

export function fromSquareFEN(squareFen: string): Square | null {
    return squareFen
        ? Square[squareFen.toUpperCase() as any] as any
        : null;
}

export function toSquareFEN(square: Square | null): string {
    return square || square === 0
        ? Square[square].toLowerCase()
        : "-";
}

/**
 * Check if specified rank Forsyth–Edwards Notation (FEN) notation is valid
 * @param rankFen the FEN describing the rank
 */
export function isValidRankFEN(rankFen: string): boolean {
    if (!rankFen) {
        return false;
    }
    let sum = 0;
    for (const part of rankFen.trim()) {
        const piece = fromPieceFEN(part);
        if (piece || piece === 0) {
            continue;
        }
        const emptyCount = parseInt(part, 10);
        if (isNaN(emptyCount)) {
            return false;
        }
        sum += emptyCount;
    }
    if (sum < 0 || sum > 8) {
        return false;
    }
    return true;
}

/**
 * Generate simplified Forsyth–Edwards Notation (FEN) notation describing a rank
 * @param rankFen the FEN describing the rank
 */
export function toSimpleRankFEN(rankFen: string): string {
    let result = "";
    for (const square of rankFen.trim()) {
        const squareState = fromPieceFEN(square);
        if (squareState) {
            result += square;
            continue;
        }
        const emptyCount = parseInt(square, 10);
        for (let i = 0; i < emptyCount; i++) {
            result += "1";
        }
    }
    return result;
}

/**
 * Generate Forsyth–Edwards Notation (FEN) notation describing the game state
 * @param state the game state
 */
export function toFEN(state: GameState | null): string {
    if (!state) {
        return "-";
    }
    const positions = toBoardFEN(state.board);
    const activeColor = toColorFEN(state.activeColor);
    const castling = toCastleFEN(state.castling);
    const enPassant = toSquareFEN(state.enPassant);
    const halfMoveCount = state.halfMovesCountSinceLastCapture;
    const fullMoveNumber = state.fullMoveNumber;
    return `${positions} ${activeColor} ${castling} ${enPassant} ${halfMoveCount} ${fullMoveNumber}`;
}

/**
 * Check if specified Forsyth–Edwards Notation (FEN) is valid
 * @param fen the FEN describing the game state
 * @param log if to log errors to console or not
 */
export function isFENValid(fen: string, log: boolean): boolean {
    if (!fen) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("FEN is empty!");
        }
        return false;
    }
    const fenParts = fen.trim().split(" ");
    if (!fenParts || fenParts.length !== 6) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Incorrect amount of parts in FEN!");
        }
        return false;
    }

    // Validate ranks and files (e.g. rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR)
    const rankAndFiles = fenParts[0];
    if (!rankAndFiles || rankAndFiles.length <= 0) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("No ranks and files in FEN!");
        }
        return false;
    }
    const ranks = rankAndFiles.split("/");
    if (!ranks || ranks.length !== 8) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Incorrect amount of ranks in FEN!");
        }
        return false;
    }
    // Validate ranks (e.g. rnbqkbnr)
    for (const rank of ranks) {
        if (!isValidRankFEN(rank)) {
            if (log) {
                // tslint:disable-next-line: no-console
                console.error("Invalid rank in FEN!");
            }
            return false;
        }
        const simpleRank = toSimpleRankFEN(rank);
        if (!simpleRank || simpleRank.length !== 8) {
            if (log) {
                // tslint:disable-next-line: no-console
                console.error("Invalid simple rank in FEN!");
            }
            return false;
        }
    }

    // Validate active color
    const activeColor = fromColorFEN(fenParts[1]);
    if (!activeColor && activeColor !== 0) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Invalid active color in FEN!");
        }
        return false;
    }

    // Validate castling
    const castling = fromCastleFEN(fenParts[2]);
    if (!castling) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Invalid castling availability in FEN!");
        }
        return false;
    }

    // Validate en passant
    if (!isValidSquareFEN(fenParts[3])) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Invalid en passant square in FEN!");
        }
        return false;
    }

    // Validate half-moves since last capture
    const halfMovesCountSinceLastCapture = parseInt(fenParts[4], 10);
    if (isNaN(halfMovesCountSinceLastCapture) ||
        halfMovesCountSinceLastCapture < 0) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Invalid half-moves since last capture in FEN!");
        }
        return false;
    }

    // Validate full move number
    const fullMoveNumber = parseInt(fenParts[5], 10);
    if (isNaN(fullMoveNumber) ||
        fullMoveNumber < 1) {
        if (log) {
            // tslint:disable-next-line: no-console
            console.error("Invalid full move number in FEN!");
        }
        return false;
    }

    return true;
}

/**
 * Generate position from Forsyth–Edwards Notation (FEN) notation
 * @param fen the FEN describing the game state
 * @param log if to log errors to console or not
 */
export function fromFEN(fen: string, log: boolean = false): GameState | null {
    if (!isFENValid(fen, log)) {
        return null;
    }
    const fenParts = fen.trim().split(" ");
    const board = fromBoardFEN(fenParts[0]);
    const activeColor = fromColorFEN(fenParts[1]) || Color.White;
    const castling = fromCastleFEN(fenParts[2]) || {
        isBlackKingsidePossible: false,
        isBlackQueensidePossible: false,
        isWhiteKingsidePossible: false,
        isWhiteQueensidePossible: false,
    };
    const enPassant = fromSquareFEN(fenParts[3]);
    const halfMovesCountSinceLastCapture = parseInt(fenParts[4], 10);
    const fullMoveNumber = parseInt(fenParts[5], 10);
    return new GameState(board, activeColor, castling, enPassant, halfMovesCountSinceLastCapture, fullMoveNumber);
}
