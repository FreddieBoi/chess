import { IBoardProps } from "../components/Board";
import { IRankProps } from "../components/Rank";
import { Board } from "../state/Board";
import { toFileName, toIcon } from "./Translation";

export function toBoardProps(board: Board): IBoardProps {
    if (!board) {
        return {
            ranks: [],
        };
    }
    const ranks: IRankProps[] = [];
    for (let rIndex = 0; rIndex < 8; rIndex++) {
        const rankIndex = 8 - rIndex;
        const rank: IRankProps = {
            index: rIndex,
            name: rankIndex.toString(),
            squares: [],
        };
        for (let sIndex = 0; sIndex < 8; sIndex++) {
            const squareState = board.squares[rIndex * 8 + sIndex];
            const icon = toIcon(squareState);
            const file = toFileName(sIndex);
            const color = toSquareColor(file, rank.name);
            // tslint:disable-next-line: no-console
            console.log(`Square ${file} ${rank.name} (rIndex=${rIndex}, sIndex=${sIndex}) = ${icon}`);
            rank.squares.push({
                color,
                file,
                icon,
                index: sIndex,
                rank: rank.name,
            });
        }
        ranks.push(rank);
    }
    return {
        ranks,
    };
}

export function isSquareDark(file: string, rank: string): boolean {
    return parseInt(`${file.toLowerCase()}${rank}`, 35) % 2 !== 0;
}

export function toSquareColor(file: string, rank: string): string {
    return isSquareDark(file, rank)
        ? "dark"
        : "light";
}

export function toBoardLabelColor(file: string, rank: string): string {
    return isSquareDark(file, rank)
        ? "light"
        : "dark";
}
