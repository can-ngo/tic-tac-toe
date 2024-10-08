const game = (function() {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    
    let isXturn = false;

    const clear = () => {
        board.forEach ( row => row.fill(null))
        console.log(board);
    }

    const place = (i, j) => {
            if (!board[i][j]) {
                if ( isXturn ) {
                    board[i][j] = 'x';
                    isXturn = !isXturn;
                    console.log(board);
                } else {
                    board[i][j] = 'o'
                    isXturn = !isXturn;
                    console.log(board);
                }
    
            } else {
                alert('Not correct position')
            }         
    }
    
    const checkWin = () => {
        let whoWin;
        let capture = [];
        
        let row0 = board[0][0] + board[0][1] + board[0][2]
        let row1 = board[1][0] + board[1][1] + board[1][2]
        let row2 = board[2][0] + board[2][1] + board[2][2]
        let col0 = board[0][0] + board[1][0] + board[2][0]
        let col1 = board[0][1] + board[1][1] + board[2][1]
        let col2 = board[0][2] + board[1][2] + board[2][2]
        let dia1 = board[0][0] + board[1][1] + board[2][2]
        let dia2 = board[0][2] + board[1][1] + board[2][0]

        capture = [row0, row1, row2, col0, col1, col2, dia1, dia2]
        if (capture.includes('xxx') || capture.includes('ooo')){
            whoWin = capture.includes('xxx') ? 'x' : 'o';
            
        }
        return whoWin;
    }

    return {board, place, clear, isXturn, checkWin}
})();

const displayController = (function () {
    const boardDiv = document.querySelector('.board-div');
    const h2 = document.querySelector('h2');
    game.board.forEach( (rows, i) => {
        rows.forEach( (cell, j) => {
            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'cell');
            newDiv.setAttribute('id', `${i}-${j}`);
            boardDiv.appendChild(newDiv);
        })
    })
    
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Reset Game"

    const cells = Array.from(document.querySelectorAll('.cell'));

    cells.forEach( cell => {
        cell.addEventListener('click', e => {
            if (!game.checkWin()) {
                let [x , y] = cell.id.split('-').map(Number);
                game.place(x, y);
                cell.textContent = game.board[x][y];
                console.log(game.checkWin())
                h2.textContent = game.checkWin() ? `${game.checkWin().toUpperCase()} is the winner! `:'';
                h2.style.animation = game.checkWin() ? 'flash .5s infinite linear' : '';
            } else {
                h2.appendChild(resetBtn);
            }
        })
    })

    resetBtn.addEventListener('click', () => {
        game.clear();
        game.checkWin();
        cells.forEach( cell => {
            cell.textContent = '';
        })
        h2.textContent = '';
        h2.style.animation = '';
    })

})();