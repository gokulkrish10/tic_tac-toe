
import Board from "./Board.js"

export default function Game(){
    return (
        <>
        <div className="game">
            <div className="game-board">
             <Board/>
            </div>
        <div className="game-info">

            <ol></ol>
        </div>
          
        </div>
        
        </>
    )
}

