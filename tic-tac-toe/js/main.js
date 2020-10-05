document.addEventListener('DOMContentLoaded', event => {
    'use strict';

    const game = {
        players: [],
        mode: '',
        currTurn: false, // false = 'x', true = 'o'
        area: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        endGame: false,
        rules: [
            [ [0, 0], [1, 1], [2, 2] ],
            [ [0, 2], [1, 1], [2, 0] ],

            [ [0, 0], [0, 1], [0, 2] ],
            [ [1, 0], [1, 1], [1, 2] ],
            [ [2, 0], [2, 1], [2, 2] ],

            [ [0, 0], [1, 0], [2, 0] ],
            [ [0, 1], [1, 1], [2, 1] ],
            [ [0, 2], [1, 2], [2, 2] ],
        ],
        
        setOptions: function() {
            this.mode = document.querySelector('.game-mode__input:checked').value;
            this.players[0] = document.querySelector('#player1').value;
            this.players[1] = document.querySelector('#player2').value;
        },

        switchMode: function(mode) {
            const wrap = document.querySelector('.players-name');
            const player2 = document.querySelector('#player2');
            
            if (mode == 'singleplayer') {
                wrap.classList.add('players-name_single');
                player2.value = 'Игорь Игоревич';
            } else {
                wrap.classList.remove('players-name_single');
                player2.value = '';
            }
        },

        setStep: function(n) {
            const appWrap = document.querySelector('.app-wrap');
            appWrap.dataset.step = n;
        },

        startGame: function() {
            this.setOptions();

            if (this.validation()) {
                this.setStep(2);
                this.setTurnHintText(true);
            };
        },

        validation: function() {
            const player1 = document.querySelector('#player1');
            const player2 = document.querySelector('#player2');

            if (!player1.value && !player2.value) alert('Игроки, введите свои имена!');
            else if (!player1.value) alert('Игрок 1, введите свое имя!');
            else if (!player2.value) alert('Игрок 2, введите свое имя!');
            else if (player1.value.length < 3) alert('Игрок 1, имя должно быть не менее 3х символов!');
            else if (player2.value.length < 3) alert('Игрок 2, имя должно быть не менее 3х символов!');
            else if (player1.value == player2.value) alert('Имена игроков не должны совпадать!');
            else return true;
        },

        setTurnHintText: function(force) {
            const title = document.querySelector('#currentTurn');
            const userName = document.querySelector('#currTurnNickname');
            const turn = +this.currTurn;

            if (force) {
                title.classList.remove('current-turn-hint_turn_tac');
                title.classList.add('current-turn-hint_turn_tic');
            } else {
                title.classList.toggle('current-turn-hint_turn_tac');
                title.classList.toggle('current-turn-hint_turn_tic');
            }

            userName.innerText = this.players[turn];
        },

        getPosition: function(cell) {
            const parent = cell.parentNode;
            const children = parent.children;

            const cellIndex = [...children].indexOf(cell);
            const rowIndex = [...parent.parentNode.children].indexOf(parent);
            
            return [rowIndex, cellIndex];
        },

        fillCell: function (item) {
            const pos = this.getPosition(item);
            const tic = '<i class="game-board__item fas fa-times"></i>';
            const tac = '<i class="game-board__item far fa-circle"></i>';

            item.insertAdjacentHTML('beforeend', this.currTurn ? tac : tic );
            this.area[pos[0]][pos[1]] = this.currTurn ? 'o' : 'x' ;
        },

        makeTurn: function(cell) {
            const pos = this.getPosition(cell);
            const checkSymbol = this.area[pos[0]][pos[1]];

            if (checkSymbol || this.endGame) return;

            this.fillCell(cell);

            const check = this.checkCombination();

            if (check) {
                this.endGame = true;
                this.setStep(3);
                this.showWinner();
            }

            this.currTurn = !this.currTurn;
            this.setTurnHintText();

            if (this.mode == 'singleplayer' && this.currTurn) this.makeAITurn();
        },

        getVacantCells: function(area) {
            if(!area) area = this.area;
            const coords = [];
            area.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (!cell) coords.push([i, j]);
                });
            });
            
            return coords;
        },

        getCellByCoords: function(coords) {
            const board = document.querySelector('.game-board');
            return board.children[coords[0]].children[coords[1]]
        },

        makeAITurn: function() {
            let bestScore = -Infinity;
            let moveCell;
            for(const cell of this.getVacantCells(this.area)) {
                this.area[cell[0]][cell[1]] = 'o';
                const score = this.minimax(this.area, false);
                this.area[cell[0]][cell[1]] = null;
                if (score > bestScore) {
                    bestScore = score;
                    moveCell = cell;
                }
            }
            this.makeTurn(this.getCellByCoords(moveCell));
        },

        minimax: function(area, isMaximizing) {
            const result = this.checkCombination(area);
            if(result == 'o') {
                return 10;
            } else if(!result && this.getVacantCells().length == 0) {
                return 0;
            } else if(result == 'x') {
                return -10;
            }
            if(isMaximizing) {
                let bestScore = -Infinity;
                for(const cell of this.getVacantCells(area)) {
                    area[cell[0]][cell[1]] = 'o';
                    const score = this.minimax(area, false);
                    area[cell[0]][cell[1]] = null;
                    bestScore = Math.max(score, bestScore);
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for(const cell of this.getVacantCells(area)) {
                    area[cell[0]][cell[1]] = 'x';
                    const score = this.minimax(area, true);
                    area[cell[0]][cell[1]] = null;
                    bestScore = Math.min(score, bestScore);
                }
                return bestScore;
            }
        },

        checkCombination: function(area = this.area) {
            let result;

            this.rules.forEach(rule => {
                const cond = rule.every( pos => area[pos[0]][pos[1]] == 'x' );
                if (cond) result = 'x';
            });
            this.rules.forEach(rule => {
                const cond = rule.every( pos => area[pos[0]][pos[1]] == 'o' );
                if (cond) result = 'o';
            });

            return result;
        },
        showWinner: function() {
            const winnerWrap = document.querySelector('#winnerNickname');

            winnerWrap.innerText = this.players[+this.currTurn];
        },

        init: function() {
            const gameModeWrap = document.querySelector('.game-mode');
            gameModeWrap.addEventListener('input', event => this.switchMode(event.target.value));

            const startGame = document.querySelector('.start-game');
            startGame.addEventListener('click', event => this.startGame());

            const gameBoard = document.querySelector('.game-board');
            gameBoard.addEventListener('click', event => {
                const target = event.target.closest('.game-board__cell');
                if (target) this.makeTurn(target);
            });

            const againBtn = document.querySelector('.restart-game');
            againBtn.addEventListener('click', event => {
                this.reset();
                this.setStep(1);
            });
        },

        reset: function() {
            this.players = [];
            this.mode = '';
            this.currTurn = false;
            this.area = this.area.map(row => row.map(c => null));
            this.endGame = false;

            this.clearArea();
        },

        clearArea: function() {
            const cells = document.querySelectorAll('.game-board__cell');
            cells.forEach(el => el.innerHTML = '');

            const players = document.querySelectorAll('.players-name__input');
            players.forEach(el => el.value = '');

            const modes = document.querySelectorAll('.game-mode__input');
            modes.forEach((el, i) => {
                el.checked = i ? false : true;

                if (!i) this.switchMode(el.value);
            });
        }
    };

    game.init();
    game.startGame();

    console.log(game);
});