import * as React from "react";
import * as ReactDOM from "react-dom";
import "./../scss/index.scss";
import { App } from "./components/App";
import { fromFEN, toFEN } from "./utils/FEN";

const gameState = fromFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e8 0 1", true);

// tslint:disable-next-line: no-console
console.log(toFEN(gameState));

ReactDOM.render(
    <App
        gameState={gameState}
    />,
    document.getElementById("react-root"),
);
