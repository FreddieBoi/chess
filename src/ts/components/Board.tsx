import * as React from "react";
import { toBoardLabelColor } from "../utils/Props";
import "./../../scss/components/board.scss";
import { BoardLabel } from "./BoardLabel";
import { IRankProps, Rank } from "./Rank";

export interface IBoardProps {
    ranks: IRankProps[];
}

export class Board extends React.Component<IBoardProps> {

    public render(): JSX.Element {
        const rankLabels = this.props.ranks.map((rank, index) => {
            return (
                <BoardLabel
                    key={`board-label-file-${rank.index}`}
                    color={toBoardLabelColor(rank.squares[0].file, rank.name)}
                    text={rank.name}
                />
            );
        });
        const fileLabels = this.props.ranks[0].squares.map((square) => {
            return (
                <BoardLabel
                    key={`board-label-file-${square.index}`}
                    color={toBoardLabelColor(square.file, this.props.ranks[0].name)}
                    text={square.file}
                />
            );
        });
        const ranks = this.props.ranks.map((rank) => {
            return (
                <Rank
                    key={`rank-${rank.index}`}
                    {...rank}
                />
            );
        });
        return (
            <div
                className="board"
            >
                <div className="board-top">
                    {fileLabels}
                </div>
                <div className="board-left">
                    {rankLabels}
                </div>
                <div className="board-inner">
                    {ranks}
                </div>
            </div>
        );
    }

}
