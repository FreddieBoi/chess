import * as React from "react";
import "./../../scss/components/board.scss";
import { IRankProps, Rank } from "./Rank";

export interface IBoardProps {
    ranks: IRankProps[];
}

export class Board extends React.Component<IBoardProps> {

    public render(): JSX.Element {
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
                {ranks}
            </div>
        );
    }

}
