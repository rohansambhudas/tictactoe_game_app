import React, { Component } from 'react';
import './TicTacToe.css';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'X',
      board: Array(9).fill(''),
      winner: '',
    };
  }

  handleClick = (index) => {
    const { currentPlayer, board, winner } = this.state;

    if (board[index] === '' && winner === '') {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      this.setState(
        {
          board: newBoard,
          currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
        },
        () => {
          this.checkWinner();
        }
      );
    }
  };

  checkWinner = () => {
    const { board } = this.state;
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({ winner: board[a] });
        break;
      }
    }
  };

  resetGame = () => {
    this.setState({
      currentPlayer: 'X',
      board: Array(9).fill(''),
      winner: '',
    });
  };

  render() {
    const { currentPlayer, board, winner } = this.state;

    return (
      <div className="tic-tac-toe">
        <h1>Tic Tac Toe</h1>
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell}`}
              onClick={() => this.handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <p className="message">
          {winner ? `Player ${winner} wins!` : `Player ${currentPlayer}'s turn`}
        </p>
        {winner && (
          <button className="reset-button" onClick={this.resetGame}>
            Reset Game
          </button>
        )}
      </div>
    );
  }
}

export default TicTacToe;
