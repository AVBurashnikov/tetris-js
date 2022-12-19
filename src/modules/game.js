export default class Game{

    constructor(){

        this.controls = {
            LEFT: 'left',
            RIGHT: 'right',
            DOWN: 'down',
            ROTATE: 'rotate',
        }

        this.init();
    }

    init(){

        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.speed = 1;

        this.playfield = this.newPlayfield;

        this.block = this.newBlock;
        this.nextBlock = this.newBlock;

        this.firstMoveHasCollision = false;
    }

    get newBlock(){
        const block = {
            x: 4,
            y: 0,
            figure: this.getFigure()
        };

        if(this.hasCollision(block))
            this.firstMoveHasCollision = true;

        return block;
    }

    get newPlayfield(){
        const playfield = [];

        for(let j = 0; j < 20; j++){
            playfield.push(Array(10).fill(0));
        }

        return playfield;
    }

    get state(){
        return {
            playfield: this.playfield,
            block: this.block,
            nextBlock: this.nextBlock,
            score: this.score,
            lines: this.lines,
            level: this.level,
            isGameOver: this.firstMoveHasCollision
        }
    }

    left(){

        this.block.x -= 1;
        if (this.hasCollision(this.block)){
            this.block.x += 1;
        }
    }

    right(){

        this.block.x += 1;
        if (this.hasCollision(this.block)){
            this.block.x -= 1;
        }
    }

    down(){

        this.block.y += 1;
        if (this.hasCollision(this.block)){
            this.block.y -= 1;
            this.lockBlock();
            this.checkLines();

            this.block = this.nextBlock;
            this.nextBlock = this.newBlock;
        }
    }

    rotate(){
        const length = this.block.figure.length;
        const buffer = {
            x: this.block.x,
            y: this.block.y,
            figure: [],
        };

        for (let i = 0; i < length; i++)
            buffer.figure.push(Array(length).fill(0));
        
        for (let i = 0; i < length; i++)
            for(let j = 0; j < length; j++)
                buffer.figure[j][length-i-1] = this.block.figure[i][j];
        
        if (!this.hasCollision(buffer))
            this.block = buffer;
    }   

    hasCollision({x, y, figure}){
        const length = figure.length;

        for(let i = y; i < y + length; i++)
            for(let j = x; j < x + length; j++)
                if (typeof this.playfield[i] !== 'undefined'){
                    if (typeof this.playfield[i][j] === 'undefined' && 
                        figure[i-y][j-x]){
                        return true;
                    } else if (this.playfield[i][j] && figure[i-y][j-x]){
                        return true;
                    }
                } else {
                    if (figure[i-y][j-x]){
                        return true;
                    }
                }

        return false;
    }

    lockBlock(){
        const {x, y, figure} = this.block;

        for(let i = y; i < y + figure.length; i++)
            for(let j = x; j < x + figure.length; j++)
                if(typeof this.playfield[i] !== 'undefined')
                    this.playfield[i][j] += figure[i-y][j-x];
    }

    checkLines(){
        const lines = this.clearLines();
        
        if(lines)
            this.changeGameState(lines);
    }

    clearLines(){
        let points = 0;

        this.playfield.map( (line, index) => {
            if(!line.includes(0)){
                this.playfield.splice(index, 1);
                this.playfield.unshift(Array(10).fill(0));
                points += 1;
            }
        });

        return points;
    }

    changeGameState(points){
        
        this.changeScore(points)
        this.changeLines(points);
        this.changeLevel();
        this.changeSpeed();
    }

    changeScore(points){

        this.score += ([0, 100, 300, 700, 1500])[points];
    }

    changeLines(lines){

        this.lines += lines;
    }

    changeLevel(){

        this.level = 1 + Math.trunc(this.score/3000);
    }

    changeSpeed(){
        
        this.speed = 1 - this.level/10
    }

    getFigure(){

        switch(Math.floor(Math.random()*7)){
            case 0:
                return [ [0,0,0], [1,1,1], [0,1,0] ];
            case 1:
                return [ [0,0,0], [2,2,2], [0,0,2] ];
            case 2:
                return [ [0,0,0], [3,3,3], [3,0,0] ];
            case 3:
                return [ [0,0,0], [4,4,0], [0,4,4] ];
            case 4:
                return [ [0,0,0], [0,5,5], [5,5,0] ];
            case 5:
                return [ [0,0,0,0], [0,6,6,0], [0,6,6,0], [0,0,0,0] ];
            case 6:
                return [ [0,7,0,0], [0,7,0,0], [0,7,0,0], [0,7,0,0] ];
        }
    }
}