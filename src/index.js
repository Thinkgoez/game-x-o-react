import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Congratulation from './components/congratulation/congratulation';
// import { ReactComponent } from '*.svg';

//TODO: 
//add img to squares:  with class(css) or <img> //  +done
//add 2 mods: for gachi and another people  // +done
//add end of game like "draw" // +done, but it works with 9th step game, and with it coud be problems =_=
//winner should be congratulated! //+done, but ot works so strange


//--------------------------------------------------------------------------\\

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            <div className = {props.value}></div>
        </button>
    );//{ props.value } istead of div
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />; //передача propsa
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isXNext: true,
            stepNumber: 0,
            isToggleOn: false, //true for gachi-mod, false for normal
        }
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
        })
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]){
            return; //если есть победитель или squares[i] не пустой тогда return
        }
        
        if( this.state.isToggleOn === true){
            squares[i] = this.state.isXNext ? 'r' : 's'; //here change props.value/class
        } else {
            squares[i] = this.state.isXNext ? 'x' : 'o';
        }
        this.setState({
            history : history.concat([{
                squares : squares,
            }]),
            stepNumber: history.length,
            isXNext : !this.state.isXNext,
        });
    }

    handleSwitch() {

        this.setState(state => ({
            isToggleOn: !state.isToggleOn,
            stepNumber: 0,
            history: [{
                squares: Array(9).fill(null),
            }],
            isXNext: true,
        }));
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            'ПЕРЕЙТИ К ХОДУ #' + move :
            'НАЧАЛО ИГРЫ';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        let status;
         if (winner === 'r'){
            status = 'Выиграл Ricardo';
        } else if(winner === 's'){
            status = 'Выиграл Posos';
        } else if(winner === 'x'){
            status = 'Выиграл X';
        } else if(winner === 'o'){
            status = 'Выиграл O';
        } else if(winner === 'd'){
            status = 'Ничья!';
        } else if (this.state.stepNumber === 9){
            status = 'Ничья!';
        } else {status = 'Следующий ход: ' + (this.state.isXNext ? 'X' : 'O');
        }
        return (
            <>
                <div className="game">
                    <div className="game-board">
                        <Board 
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <h1>{status}</h1>
                        <div className="mods">
                            <p>Gachi mod</p>
                            <input 
                                type="checkbox"
                                id="toggle"
                                onClick={this.handleSwitch}
                                className="checkbox"
                            />  
                            <label htmlFor="toggle" className="switch"></label>
                        </div>
                        <ol>{moves}</ol>
                    </div>
                    
                </div>
                <Congratulation winner={winner} status={status}/>
            </>
        );
    }
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      } else if ((squares.filter(item => item === null)) === ''){
          return "d"; //чет это не пашет =_=, хотя должна была узнавать draw или нет
      }
    }
    return null;
}