import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  cursor: "pointer"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const gameoverStyleOn = {
  visibility: "visible",
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "2rem",
  color: "red",
  lineHight: "2rem",
  height: "2rem"
};

const gameoverStyleOff = {
  visibility: "hidden",
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "2rem",
  lineHight: "2rem",
  height: "2rem"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px"
};

// Tic Tac Toe each Square
const Square = (props) => {
  return (
    <div {...props} className="square" style={squareStyle}>
      {props.children}
    </div>
  );
};

const Board = () => {
  const [gameOver, setGameOver] = useState(null);
  const [nextPalyer, setNextPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleReset = () => {
    setGameOver(null);
    setNextPlayer("X");
    setSquares(Array(9).fill(null));
  };

  const handlePlay = (i) => {
    if (squares[i] || gameOver) return;
    setSquares((prev) => {
      prev[i] = nextPalyer;
      return prev;
    });
    setNextPlayer(nextPalyer === "X" ? "O" : "X");
  };

  const checkWinner = (player) => {
    let result = null;
    //Possibles occurrences to win
    const occurrences = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    occurrences.forEach((occurrence) => {
      if (occurrence.every((field) => squares[field] === player)) {
        result = result ? result : player;
      }
    });
    return result;
  };

  useEffect(() => {
    setGameOver(checkWinner(nextPalyer === "X" ? "O" : "X"));
  }, [nextPalyer]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div style={gameOver ? gameoverStyleOn : gameoverStyleOff}>Game Over</div>
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{gameOver ? null : nextPalyer}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{gameOver || "none"}</span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square onClick={() => handlePlay(0)}>{squares[0]}</Square>
          <Square onClick={() => handlePlay(1)}>{squares[1]}</Square>
          <Square onClick={() => handlePlay(2)}>{squares[2]}</Square>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={() => handlePlay(3)}>{squares[3]}</Square>
          <Square onClick={() => handlePlay(4)}>{squares[4]}</Square>
          <Square onClick={() => handlePlay(5)}>{squares[5]}</Square>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={() => handlePlay(6)}>{squares[6]}</Square>
          <Square onClick={() => handlePlay(7)}>{squares[7]}</Square>
          <Square onClick={() => handlePlay(8)}>{squares[8]}</Square>
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
