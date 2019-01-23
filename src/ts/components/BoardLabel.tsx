import * as React from "react";
import "./../../scss/components/board-label.scss";

export interface IBoardLabelProps {
    color: string;
    text: string;
}

export class BoardLabel extends React.Component<IBoardLabelProps> {

    public render(): JSX.Element {
        return (
            <div
                className={`board-label board-label-${this.props.color}`}
            >
                {this.props.text}
            </div>
        );
    }

}
