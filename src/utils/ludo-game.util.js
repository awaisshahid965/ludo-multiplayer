class LudoGame {
    LudoGame() {
        this.rollingDiceScore = 0;
        this.totalScore = 0;
        this.isWon = false;
    }

    getGameValues() {
        console.log({
            rollingDiceScore: this.rollingDiceScore,
            totalScore: this.totalScore,
            isWon: this.isWon,
        })
        return {
            rollingDiceScore: this.rollingDiceScore,
            totalScore: this.totalScore,
            isWon: this.isWon,
        }
    }

    updateRollingDiceScore(val) {
        this.rollingDiceScore += val
    }

    getRollingDiceScore = () => this.rollingDiceScore

    updateTotalScore(val) {
        this.totalScore += val
    }

    getTotalScore = () => this.totalScore

    isUserWon = () => this.isWon

    updateIsUserWon(boolVal) {
        this.isWon = boolVal
    }

    getGameData() {
        return {
            rollingDiceScore: this.rollingDiceScore,
            totalScore: this.totalScore,
            isWon: this.isWon,
        }
    }
}

module.exports = LudoGame