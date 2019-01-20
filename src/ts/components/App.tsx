import * as React from "react";
import { GameState } from "../state/GameState";
import { toBoardProps } from "../utils/Props";
import { toColorName, toSquareName } from "../utils/Translation";
import "./../../scss/components/app.scss";
import { Board } from "./Board";
import { GameDetails } from "./GameDetails";

export interface IAppProps {
    gameState: GameState | null;
}

export class App extends React.Component<IAppProps> {

    public render(): JSX.Element {
        return (
            <div
                className="app"
            >
                <h1>chess</h1>
                {this.props.gameState
                    ? <Board
                        {...toBoardProps(this.props.gameState.board)}
                    />
                    : null}
                {this.props.gameState
                    ? <GameDetails
                        activeColor={toColorName(this.props.gameState.activeColor)}
                        enPassantSquare={toSquareName(this.props.gameState.enPassantSquare)}
                        halfMovesCountSinceLastCapture={this.props.gameState.halfMovesCountSinceLastCapture.toString()}
                        fullMoveNumber={`# ${this.props.gameState.fullMoveNumber}`}
                    />
                    : null}
            </div>
        );
    }

}
