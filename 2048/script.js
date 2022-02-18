document.addEventListener('DOMContentLoaded', () => {

    let gameData = [],
        score = null,
        isGameEnd = false,
        isGameProcess = true,
        currGameStatus = true;
    

    
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
    }


})