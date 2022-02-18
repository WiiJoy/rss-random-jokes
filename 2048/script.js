document.addEventListener('DOMContentLoaded', () => {

    let gameData = [],
        score = null,
        isGameEnd = false,
        isGameProcess = true,
        currGameStatus = true,
        isProcess = false;
    
    startNewGame()

    
    function startNewGame() {
        currGameStatus = isGameProcess
        score = 0
        gameData = []

        for (let i = 0; i < 4; i++) {
			gameData[r] = [];
			for (let j = 0; j < 4; j++) {
				gameData[r][c] = 0;
			}
		}

        getRandomCell()
        getRandomCell()
    }

    function getRandomCell() {
        isProcess = false;

        while (!isProcess) {
            let row = Math.floor(Math.random()*4)
            let cell = Math.floor(Math.random()*4)

            if (gameData[row][cell] === 0) {
                let value = Math.random() > 0.5 ? 2 : 4
                gameData[row][cell] = value
            }
        }
    }


})