new Vue({
	el: '#app',
	data: {
		playerHpAmount: 100,
        monsterHpAmount: 100,
        playerHpColor: '#97D984',
        monsterHpColor: '#97D984',
        logs: [],
        winner: '',
        showButtons: true,
	},
    methods: {
        getRandow(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value)
        },
        monsterAttack(){
            let monsterDamage = this.getRandow(5, 12);
            this.playerHpAmount = Math.max(this.playerHpAmount - monsterDamage, 0);
            this.registerLog('monster', 'player', monsterDamage);
        },
        attack(special) {
            const plus = special ? 5 : 0
            let playerDamage = this.getRandow(3, 8) + plus;
            this.monsterHpAmount = Math.max(this.monsterHpAmount - playerDamage, 0);
            this.registerLog('player', 'monster', playerDamage);
            this.monsterAttack()
        },
        cure() {
            let playerCure = this.getRandow(8, 12);
            this.playerHpAmount = Math.min(this.playerHpAmount + playerCure, 100);
            this.cureRegisterLog(playerCure);
            this.monsterAttack()
        },
        registerLog(dealer, target, damage) {
            const text = `${dealer} caused damage to ${target}: ${damage} hp`;
            this.logs.unshift({ text, dealer });
        },
        cureRegisterLog(amount) {
            const text = `The player used healing and recovered ${amount} hp`;
            this.logs.unshift({ text, dealer: 'cure' });
        },
        endGame() {
            if (this.playerHpAmount <= 0 && this.monsterHpAmount <= 0) {
                this.winner = 'A tie! It was a difficult battle and both were defeated.';
            } else if (this.monsterHpAmount <= 0) {
                this.monsterHpAmount = 0;
                this.winner = 'The battle was long, but you emerged victorious!';
            } else {
                this.playerHpAmount = 0;
                this.winner = 'You lost! I think this monster was too strong for you...';
            }
            this.showButtons = false;
        },
        restartGame() {
            this.playerHpAmount = 100;
            this.monsterHpAmount = 100;
            this.playerHpColor = '#97D984';
            this.monsterHpColor = '#97D984';
            this.logs = [];
            this.winner = '';
            this.showButtons = true;
            return true
        }
    },
    watch: {
        playerHpAmount(){
            if(this.playerHpAmount < 20){
                this.playerHpColor = '#F06054';
            }
            else {
                this.playerHpColor = '#97D984';
            }

            if(this.playerHpAmount < 1){
                this.endGame()
            }
        },
        monsterHpAmount(){
            if(this.monsterHpAmount < 20){
                this.monsterHpColor = '#F06054';
            }
            if(this.monsterHpAmount < 1){
                this.endGame()
            }
        }
    }
})
