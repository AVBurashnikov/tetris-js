export default class View{
    constructor(){

        this.scoreW = 160;
        this.canvasW = 488;
        this.canvasH = 648;
        this.gameW = 328;
        this.gameH = this.canvasH;
        this.backgroundColor = 'black'
        
        this.strokeW = 4;
        this.blockW = 32;
        this.blockH = 32;
        this.nextBlockW = 16;
        this.nextBlockH = 16;
        
        this.color = {
            white: 'white',
            black: 'black',
            blackOp06: 'rgba(0, 0, 0, 0.6)',
            1: 'red', 
            2: 'orange', 
            3: 'yellow', 
            4: 'green', 
            5: 'cyan', 
            6: 'blue', 
            7: 'purple',
        };

        this.fontFamily = 'Press Start 2P';
        
        this.render = {
            displayStart: this.displayStart.bind(this),
            displayPause: this.displayPause.bind(this),
            displayGame: this.displayGame.bind(this),
            displayGameOver: this.displayGameOver.bind(this),
        }

        this.ctx = this.getCanvasContext();
    }

    getCanvasContext(){
        const root = document.getElementById("root");
        const canvas = document.createElement('canvas');
        
        canvas.width = this.canvasW;
        canvas.height = this.canvasH;
        root.appendChild(canvas);
        return canvas.getContext('2d');
    }

    displayStart(){

        this.clearDisplay();
        this.drawText(
            `Press ENTER to start...`, 
            (this.canvasW/2)-130, 
            this.canvasH / 2,
            12
        );
    }

    displayPause(){

        this.drawRectangle(0, 0, this.canvasW, this.canvasH, this.color.blackOp06);
        this.drawText(
            'Press ENTER to continue...', 
            (this.canvasW/2)-140, 
            this.canvasH / 2,
        );
    }

    displayGame({playfield, block, nextBlock, score, lines, level}){
        
        this.renderGameArea(playfield, block);
        this.renderScoreArea(score, lines, level, nextBlock);
    }

    displayGameOver(score){

        this.clearDisplay();
        this.drawText('GAME OVER', 200, this.canvasH / 3);
        this.drawText(`Score:${score}`, 180, 30 + this.canvasH / 2);
    }

    renderGameArea(playfield, block){

        this.clearDisplay();
        this.drawRectangle(
            0, 0, this.gameW, this.gameH, this.color.black, this.strokeW, this.color.white);
        this.renderCurrentBlock(block);
        this.renderPlayField(playfield);
    }

    renderCurrentBlock({x, y, figure}){
        for (let i = y; i < y + figure.length; i++) {
            for (let j = x; j < x + figure.length; j++) {
                let value = figure[i-y][j-x];
                if (value)
                    this.drawRectangle(
                        j * this.blockW + this.strokeW,
                        i * this.blockH + this.strokeW,
                        this.blockW, 
                        this.blockH,
                        this.color[value],
                        this.strokeW,
                        this.color.black);
            }
        }
    }

    renderPlayField(playfield){

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                let value = playfield[i][j];
                if (value)
                    this.drawRectangle(
                        j * this.blockW + this.strokeW,
                        i * this.blockH + this.strokeW,
                        this.blockW, 
                        this.blockH,
                        this.color[value],
                        this.strokeW,
                        this.color.black);
            }
        }
    }

    renderScoreArea(score, level, lines, nextBlock){

        this.drawText(`Score:${score}`, 340, 30);
        this.drawText(`Level:${level}`, 340, 60);
        this.drawText(`Lines:${lines}`, 340, 90);
        this.drawText(`Next:`, 340, 140);

        this.renderNextBlock(nextBlock);
    }

    renderNextBlock(block){
        const length = block.figure.length

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let value = block.figure[i][j];
                if (value){
                    this.drawRectangle(
                        360 + j * this.nextBlockW,
                        150 + i * this.nextBlockH,
                        this.nextBlockW, 
                        this.nextBlockH,
                        this.color[value],
                        2,
                        this.color.black
                    );
                }
            }
        }
    }

    clearDisplay(){

        this.drawRectangle(
            0, 
            0, 
            this.canvasW, 
            this.canvasH, 
            this.color.black
        );
    }

    drawRectangle(
        x, 
        y, 
        width, 
        height, 
        bgColor, 
        strokeW = 0, 
        strokeColor = this.color.black){
        
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.lineWidth = strokeW;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.strokeRect(x, y, width, height);
    }

    drawText(
        text, 
        x, 
        y,
        fontSize=12,
        color=this.color.white, 
        fontFamily=this.fontFamily, 
        letterSpacing=1){
        
        this.ctx.font = `${fontSize}px '${fontFamily}'`;
        this.ctx.letterSpacing = `${letterSpacing}px`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }
}