import * as React from "react";
import "./../../scss/components/square.scss";

export interface ISquareProps {
    color: string;
    file: string;
    icon: string;
    index: number;
    rank: string;
}

export class Square extends React.Component<ISquareProps> {

    public render(): JSX.Element {
        return (
            <div
                id={`square-${this.props.file.toLowerCase()}-${this.props.rank}`}
                className={`square square-${this.props.color}`}
                title={`${this.props.file.toUpperCase()} ${this.props.rank}`}
            >
                {this.props.icon}
            </div>
        );
    }

}
