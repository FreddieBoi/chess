import * as React from "react";
import "./../../scss/components/game-details.scss";

export interface IGameDetailsProps {
    activeColor: string;
    enPassantSquare: string;
    halfMovesCountSinceLastCapture: string;
    fullMoveNumber: string;
}

export class GameDetails extends React.Component<IGameDetailsProps> {

    public render(): JSX.Element {
        return (
            <div
                className="game-details"
            >
                <dl>
                    <dt>Active color</dt>
                    <dd>{this.props.activeColor}</dd>
                    <dt>En passant square</dt>
                    <dd>{this.props.enPassantSquare}</dd>
                    <dt>Half-moves since last capture</dt>
                    <dd>{this.props.halfMovesCountSinceLastCapture}</dd>
                    <dt>Full-move number</dt>
                    <dd>{this.props.fullMoveNumber}</dd>
                </dl>
            </div>
        );
    }

}
