import './App.css';
import { useState } from 'react';
import App from './App.js';

function Board() {
    const [square, setSquare] = useState(Array(9).fill(null));
    const [xNext, setxNext] = useState(true);
    const [showInputs, setShowInputs] = useState(false);
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    function handleClick(i) {
        const newArray = square.slice();
        if (newArray[i] || calculateWinner(newArray).winner) {
            return;
        }
        newArray[i] = xNext ? "X" : "O";
        setxNext(!xNext);
        setSquare(newArray);
    }

    function addName() {
        setShowInputs(true);
    }

    const result = calculateWinner(square);
    let winner = result.winner;
    const winningLine = result.line;
    let play1;
    let play2;
    let status;
    if (winner) {
      
        status = "Winner is: " + winner;
    } else {
       
        if(player1===null) play1 = "X"
        else play1 = player1
        if(player2===null) play2 = "O"
        else play2 = player2
        status = "Next Player: " + (xNext ?  play1 : play2);
    }

    return (
        <>
            <div className='status'>
                {status}
            </div>
            <div className="board-row">
                <Square onSquareClick={() => handleClick(0)} value={square[0]} isWinningSquare={winningLine.includes(0)} />
                <Square onSquareClick={() => handleClick(1)} value={square[1]} isWinningSquare={winningLine.includes(1)} />
                <Square onSquareClick={() => handleClick(2)} value={square[2]} isWinningSquare={winningLine.includes(2)} />
            </div>
            <div className="board-row">
                <Square onSquareClick={() => handleClick(3)} value={square[3]} isWinningSquare={winningLine.includes(3)} />
                <Square onSquareClick={() => handleClick(4)} value={square[4]} isWinningSquare={winningLine.includes(4)} />
                <Square onSquareClick={() => handleClick(5)} value={square[5]} isWinningSquare={winningLine.includes(5)} />
            </div>
            <div className="board-row">
                <Square onSquareClick={() => handleClick(6)} value={square[6]} isWinningSquare={winningLine.includes(6)} />
                <Square onSquareClick={() => handleClick(7)} value={square[7]} isWinningSquare={winningLine.includes(7)} />
                <Square onSquareClick={() => handleClick(8)} value={square[8]} isWinningSquare={winningLine.includes(8)} />
            </div>

            <div>
                <button onClick={addName}>Add Player Name</button>
                {showInputs && (
                    <div>
                        <input placeholder='Player 1' value={player1} onChange={(e) => setPlayer1(e.target.value)} /><br />
                        <input placeholder='Player 2' value={player2} onChange={(e) => setPlayer2(e.target.value)} />
                    </div>
                )}
            </div>
        </>
    );
}

function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button className={`square ${isWinningSquare ? 'winning-square' : ''}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return { winner: null, line: [] };
}

export default Board;
