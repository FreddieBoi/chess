import * as React from "react";
import "./../../scss/components/rank.scss";
import { ISquareProps, Square } from "./Square";

export interface IRankProps {
    index: number;
    name: string;
    squares: ISquareProps[];
}

export class Rank extends React.Component<IRankProps> {

    public render(): JSX.Element {
        const squares = this.props.squares.map((square) => {
            return (
                <Square
                    key={`rank-${this.props.index}-square-${square.index}`}
                    {...square}
                />
            );
        });
        return (
            <div
                id={`rank-${this.props.name}`}
                className="rank"
            >
                {squares}
            </div>
        );
    }

}
