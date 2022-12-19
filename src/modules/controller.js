export default class Controller{
    
    constructor(game, view){

        this.view = view;
        this.game = game;

        this.intervalId = null;

    }

    startGame(){

        this.view.render.displayStart();
        document.addEventListener('keydown', this.keydownHandler.bind(this));
    }

    keydownHandler({keyCode}){
        const {LEFT, RIGHT, DOWN, ROTATE} = this.game.controls;

        switch(keyCode){
            case 37:// left
                this.controlHandler(LEFT)
                break;
            case 39:// right
                this.controlHandler(RIGHT)
                break;
            case 40:// down
                this.controlHandler(DOWN)
                break;
            case 38:// up
                this.controlHandler(ROTATE)
                break;
            case 13://enter-start:pause
                this.actionHandler();
                break;
        }
    }

    controlHandler(control){
        if (!this.game.state.isGameOver){
            this.game[control]();
            this.view.render.displayGame(this.game.state);
        }
    }

    actionHandler(){

        if(this.game.state.isGameOver)
            this.game.init();

        this.intervalId ?
        this.stopInterval('pause') :
        this.startInterval();
    }

    startInterval(){
        const speed = 1000 - this.game.level*100;
        const level = this.game.level;

        this.view.render.displayGame(this.game.state);

        this.intervalId = setInterval(() => {

            if(this.game.state.isGameOver){
                this.stopInterval('gameOver');
            } else {
                this.controlHandler('down');
                this.view.render.displayGame(this.game.state);
                if (this.game.level !== level){
                    this.stopInterval('update');
                }   
            }
                
        },speed > 0 ? speed : 100);
    }

    stopInterval(reason){

        clearInterval(this.intervalId);
        this.intervalId = null;

        switch(reason){
            case 'pause':
                this.view.render.displayPause();
                break;
            case 'gameOver':
                this.view.render.displayGameOver(this.game.state.score);
                break;
            case 'update':
                this.startInterval();
                break;
        };
        
    }
}