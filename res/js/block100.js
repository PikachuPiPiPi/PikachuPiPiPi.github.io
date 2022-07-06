"use strict";

/* PIXI API */
const Application = PIXI.Application,
      Graphics = PIXI.Graphics,
      Sprite = PIXI.Sprite,
      Container = PIXI.Container,
      Label = PIXI.Text,
      TextStyle = PIXI.TextStyle;

/* 创建应用 */
const app = new Application(540,840);
app.renderer.backgroundColor = 0xE7EFD4;
document.body.appendChild(app.view);

/* 类定义 */
//方块类 继承 Graphics
class Block extends Graphics {
    /* static() */
    static randColor() {
        let colorArr = [
            0xFF0000, //红色
            0x0000FF, //蓝色
            0xFFA500, //橙色
            0x008000, //绿色
            0xFF1493, //粉色
            0x800080, //紫色
        ];
        return colorArr[Math.floor(Math.random() * colorArr.length)];
    }
    
    /* 构造函数(横坐标，纵坐标，宽度，高度，颜色) */
    constructor(x,y,width,height,color) {
        super();
        this.beginFill(0xFFFFFF);
        this.drawRect(0,0,40,40);
        this.endFill();
        this.tint = color;
        this.position.set(x - width / 2,y - height / 2);
    }
    
    /* get() */
    getGlobal() {
        if(this.parent === null) {
            return [this.x,this.y];
        }
        return [this.parent.x + this.x,this.parent.y + this.y];
    }
    
    /* anchor() */
    remove() {
        this.parent.removeChild(this);
    }
}

//形状类
class Shape {
    /* static() */
    //[Obeject]获取形状(索引)
    static getShape(index = -1) {
        class Data {
            constructor(x,y) {
                this.x = x;
                this.y = y;
            }
        }
        
        let dataArr = [
            /* 0
            - - - - -
            - - - - -
            - - * - -
            - - - - -
            - - - - -
            */
            [
                -1,
                new Data(104,104)
            ],
            /* 1
            - - - - -
            - - - - -
            - * * - -
            - - - - -
            - - - - -
            */
            [
                2,
                new Data(83,104),
                new Data(125,104)
            ],
            /* 2
            - - - - -
            - - * - -
            - - * - -
            - - - - -
            - - - - -
            */
            [
                1,
                new Data(104,83),
                new Data(104,125)
            ],
            /* 3
            - - - - -
            - - - - -
            - * * * -
            - - - - -
            - - - - -
            */
            [
                4,
                new Data(62,104),
                new Data(104,104),
                new Data(146,104)
            ],
            /* 4
            - - - - -
            - - * - -
            - - * - -
            - - * - -
            - - - - -
            */
            [
                3,
                new Data(104,62),
                new Data(104,104),
                new Data(104,146)
            ],
            /* 5
            - - - - -
            - - - - -
            * * * * -
            - - - - -
            - - - - -
            */
            [
                6,
                new Data(41,104),
                new Data(83,104),
                new Data(125,104),
                new Data(167,104)
            ],
            /* 6
            - - * - -
            - - * - -
            - - * - -
            - - * - -
            - - - - -
            */
            [
                5,
                new Data(104,41),
                new Data(104,83),
                new Data(104,125),
                new Data(104,167)
            ],
            /* 7
            - - - - -
            - - - - -
            * * * * *
            - - - - -
            - - - - -
            */
            [
                8,
                new Data(20,104),
                new Data(62,104),
                new Data(104,104),
                new Data(146,104),
                new Data(188,104)
            ],
            /* 8
            - - * - -
            - - * - -
            - - * - -
            - - * - -
            - - * - -
            */
            [
                7,
                new Data(104,20),
                new Data(104,62),
                new Data(104,104),
                new Data(104,146),
                new Data(104,188)
            ],
            /* 9
            - - - - -
            - - * - -
            - - * * -
            - - - - -
            - - - - -
            */
            [
                10,
                new Data(83,83),
                new Data(83,125),
                new Data(125,125)
            ],
            /* 10
            - - - - -
            - - * * -
            - - * - -
            - - - - -
            - - - - -
            */
            [
                11,
                new Data(83,83),
                new Data(83,125),
                new Data(125,83)
            ],
            /* 11
            - - - - -
            - - * * -
            - - - * -
            - - - - -
            - - - - -
            */
            [
                12,
                new Data(83,83),
                new Data(125,83),
                new Data(125,125)
            ],
            /* 12
            - - - - -
            - - - * -
            - - * * -
            - - - - -
            - - - - -
            */
            [
                9,
                new Data(83,125),
                new Data(125,83),
                new Data(125,125)
            ],
            /* 13
            - - - - -
            - - * * -
            - - * * -
            - - - - -
            - - - - -
            */
            [
                -1,
                new Data(83,83),
                new Data(83,125),
                new Data(125,83),
                new Data(125,125)
            ],
            /* 14
            - - - - -
            - * - - -
            - * * * -
            - - - - -
            - - - - -
            */
            [
                20,
                new Data(62,83),
                new Data(62,125),
                new Data(104,125),
                new Data(146,125)
            ],
            /* 15
            - - - - -
            - - * - -
            - * * * -
            - - - - -
            - - - - -
            */
            [
                21,
                new Data(104,83),
                new Data(62,125),
                new Data(104,125),
                new Data(146,125)
            ],
            /* 16
            - - - - -
            - - - * -
            - * * * -
            - - - - -
            - - - - -
            */
            [
                22,
                new Data(146,83),
                new Data(62,125),
                new Data(104,125),
                new Data(146,125)
            ],
            /* 17
            - - - - -
            - - - - -
            - * * * -
            - * - - -
            - - - - -
            */
            [
                23,
                new Data(62,83),
                new Data(104,83),
                new Data(146,83),
                new Data(62,125)
            ],
            /* 18
            - - - - -
            - - - - -
            - * * * -
            - - * - -
            - - - - -
            */
            [
                24,
                new Data(62,83),
                new Data(104,83),
                new Data(146,83),
                new Data(104,125)
            ],
            /* 19
            - - - - -
            - - - - -
            - * * * -
            - - - * -
            - - - - -
            */
            [
                25,
                new Data(62,83),
                new Data(104,83),
                new Data(146,83),
                new Data(146,125)
            ],
            /* 20
            - - - - -
            - - * * -
            - - * - -
            - - * - -
            - - - - -
            */
            [
                19,
                new Data(83,62),
                new Data(83,104),
                new Data(83,146),
                new Data(125,62)
            ],
            /* 21
            - - - - -
            - - * - -
            - - * * -
            - - * - -
            - - - - -
            */
            [
                18,
                new Data(83,62),
                new Data(83,104),
                new Data(83,146),
                new Data(125,104)
            ],
            /* 22
            - - - - -
            - - * - -
            - - * - -
            - - * * -
            - - - - -
            */
            [
                17,
                new Data(83,62),
                new Data(83,104),
                new Data(83,146),
                new Data(125,146)
            ],
            /* 23
            - - - - -
            - - * * -
            - - - * -
            - - - * -
            - - - - -
            */
            [
                16,
                new Data(83,62),
                new Data(125,62),
                new Data(125,104),
                new Data(125,146)
            ],
            /* 24
            - - - - -
            - - - * -
            - - * * -
            - - - * -
            - - - - -
            */
            [
                15,
                new Data(83,104),
                new Data(125,62),
                new Data(125,104),
                new Data(125,146)
            ],
            /* 25
            - - - - -
            - - - * -
            - - - * -
            - - * * -
            - - - - -
            */
            [
                14,
                new Data(83,146),
                new Data(125,62),
                new Data(125,104),
                new Data(125,146)
            ],
            /* 26
            - - - - -
            - - - - -
            - * * - -
            - - * * -
            - - - - -
            */
            [
                29,
                new Data(62,83),
                new Data(104,83),
                new Data(104,125),
                new Data(146,125)
            ],
            /* 27
            - - - - -
            - - - - -
            - - * * -
            - * * - -
            - - - - -
            */
            [
                28,
                new Data(104,83),
                new Data(146,83),
                new Data(62,125),
                new Data(104,125)
            ],
            /* 28
            - - - - -
            - * - - -
            - * * - -
            - - * - -
            - - - - -
            */
            [
                27,
                new Data(83,62),
                new Data(83,104),
                new Data(125,104),
                new Data(125,146)
            ],
            /* 29
            - - - - -
            - - - * -
            - - * * -
            - - * - -
            - - - - -
            */
            [
                26,
                new Data(83,104),
                new Data(83,146),
                new Data(125,62),
                new Data(125,104)
            ],
            /* 30
            - - - - -
            - - * * -
            - - * - -
            - - * * -
            - - - - -
            */
            [
                33,
                new Data(83,62),
                new Data(83,104),
                new Data(83,146),
                new Data(125,62),
                new Data(125,146)
            ],
            /* 31
            - - - - -
            - * * - -
            - - * - -
            - * * - -
            - - - - -
            */
            [
                32,
                new Data(83,62),
                new Data(83,146),
                new Data(125,62),
                new Data(125,104),
                new Data(125,146)
            ],
            /* 32
            - - - - -
            - - - - -
            - * - * -
            - * * * -
            - - - - -
            */
            [
                30,
                new Data(62,83),
                new Data(146,83),
                new Data(62,125),
                new Data(104,125),
                new Data(146,125)
            ],
            /* 33
            - - - - -
            - - - - -
            - * * * -
            - * - * -
            - - - - -
            */
            [
                31,
                new Data(62,83),
                new Data(104,83),
                new Data(146,83),
                new Data(62,125),
                new Data(146,125)
            ],
            /* 34
            - - - - -
            - - * - -
            - * * * -
            - - * - -
            - - - - -
            */
            [
                -1,
                new Data(104,62),
                new Data(62,104),
                new Data(104,104),
                new Data(146,104),
                new Data(104,146)
            ],
            /* 35
            - - - - -
            - * * * -
            - * * * -
            - * * * -
            - - - - -
            */
            [
                -1,
                new Data(62,62),
                new Data(104,62),
                new Data(146,62),
                new Data(62,104),
                new Data(104,104),
                new Data(146,104),
                new Data(62,146),
                new Data(104,146),
                new Data(146,146)
            ],
        ];
        
        if(index == -1) {
            return dataArr[Math.floor(Math.random() * dataArr.length)];
        }
        return dataArr[index];
    }
    
    /* 构造函数(宽度，高度，颜色，形状数据) */
    constructor(width,height,color,shapeData) {
        this.color = color;
        this.blockArr = [];
        this.nextIndex;
        
        for(let i=0;i<shapeData.length;i++) {
            let data = shapeData[i];
            if(i !== 0) {
                this.blockArr.push(new Block(data.x,data.y,width,height,color));
            } else {
                this.nextIndex = data;
            }
        }
    }
    
    /* set() */
    //[undefined]设置颜色(颜色)
    setColor(color) {
        for(let i=0;i<this.blockArr.length;i++) {
            this.blockArr[i].tint = color;
        }
    }
    
    /* anchor() */
    //[undefined]移除()
    remove() {
        for(let i=0;i<this.blockArr.length;i++) {
            this.blockArr[i].remove();
        }
    }
}

//形状面板类
class ShapePanel {
    /* 构造函数(横坐标，纵坐标，索引) */
    constructor(x,y) {
        this.shape;
        
        let self = this;
        let isDown = false;
        let downX;
        let downY;
        let blockIndexArr = [];
        let removeIndexArr = [];
        
        //视图
        let view = new Graphics();
        this.view = view;
        view.beginFill(0xF60FBC,0.08);
        view.drawRoundedRect(0,0,208,208,50);
        view.endFill();
        view.scale.set(0.5,0.5);
        view.position.set(x - 52,y - 52);
        view.interactive = true;
        view.buttonMode = true;
        view.on('pointerdown',function(event) {
            if(shapeCon.x != x - 52 && shapeCon.y != y - 52) {
                return;
            }
            
            isDown = true;
            let block = self.shape.blockArr[Math.floor(Math.random() * self.shape.blockArr.length)];
            downX = block.x + 20;
            downY = block.y + 20;
            
            let pos = event.data.getLocalPosition(gameCon);
            shapeCon.scale.set(1,1);
            shapeCon.position.set(pos.x - downX,pos.y - downY);
            
            gameCon.setChildIndex(shapeCon,maxFloor);
        });
        
        //容器
        let shapeCon = new Container();
        this.shapeCon = shapeCon;
        shapeCon.scale.set(0.5,0.5);
        shapeCon.position.set(x - 52,y - 52);
        shapeCon.interactive = true;
        shapeCon.buttonMode = true;
        shapeCon.on('pointerdown',function(event) {
            if(shapeCon.x != x - 52 && shapeCon.y != y - 52) {
                return;
            }
            
            let pos = event.data.getLocalPosition(gameCon);
            isDown = true;
            downX = (pos.x - shapeCon.x) * 2;
            downY = (pos.y - shapeCon.y) * 2;
            
            shapeCon.scale.set(1,1);
            shapeCon.position.set(pos.x - downX,pos.y - downY);
            
            gameCon.setChildIndex(shapeCon,maxFloor);
        });
        shapeCon.on('pointermove',function(event) {
            if(!isDown) {
                return;
            }
            let pos = event.data.getLocalPosition(gameCon);
            shapeCon.position.set(pos.x - downX,pos.y - downY);
            
            if(blockPanel.isPlace(blockIndexArr)) {
                blockPanel.resetBlock(blockIndexArr);
                blockPanel.resetColor(removeIndexArr);
                blockPanel.setAlpha(removeIndexArr,1);
            }
            
            blockIndexArr.length = 0;
            removeIndexArr.length = 0;
            
            let shape = self.shape;
            
            for(let i=0;i<shape.blockArr.length;i++) {
                let pos = shapeCon.toGlobal(shape.blockArr[i].position);
                blockIndexArr.push(blockPanel.getBlockIndex(pos.x + 20,pos.y + 20));
            }
            
            if(blockPanel.isPlace(blockIndexArr)) {
                blockPanel.setAlpha(blockIndexArr,0.5);
                blockPanel.setColor(blockIndexArr,shape.color);
                
                blockPanel.setPlace(blockIndexArr,false);
                
                for(let i=0;i<blockIndexArr.length;i++) {
                    let lineArr = [];
                    let columnArr = [];
                    let l_index = blockIndexArr[i] - blockIndexArr[i] % 10;
                    let c_index = blockIndexArr[i] % 10;
                    for(let j=0;j<10;j++) {
                        lineArr.push(l_index + j);
                        columnArr.push(c_index + j * 10);
                    }
                    if(blockPanel.isRemove(lineArr)) {
                        arrSetPush(removeIndexArr,lineArr);
                    }
                    if(blockPanel.isRemove(columnArr)) {
                        arrSetPush(removeIndexArr,columnArr);
                    }
                }
                if(removeIndexArr.length > 0) {
                    blockPanel.setAlpha(removeIndexArr,0.5);
                    blockPanel.setTempColor(removeIndexArr,shape.color);
                }
                
                blockPanel.setPlace(blockIndexArr,true);
            }
        });
        shapeCon.on('pointerup',function() {
            isDown = false;
            shapeCon.scale.set(0.5,0.5);
            shapeCon.position.set(x - 52,y - 52);
            
            let shape = self.shape;
            
            if(blockPanel.isPlace(blockIndexArr)) {
                blockPanel.setAlpha(blockIndexArr,1);
                blockPanel.setColor(blockIndexArr,shape.color);
                blockPanel.setPlace(blockIndexArr,false);
                
                changeScore(shape.blockArr.length * 10);
                
                shape.remove();
                self.addShape(nextPanel.shape);
                nextPanel.createShape();
            }
            
            let removeArr = [];
            for(let i=0;i<10;i++) {
                let lineArr = [];
                let columnArr = [];
                for(let j=0;j<10;j++) {
                    lineArr.push(i * 10 + j);
                    columnArr.push(j * 10 + i);
                }
                if(blockPanel.isRemove(lineArr)) {
                    changeScore(100);
                    arrSetPush(removeArr,lineArr);
                }
                if(blockPanel.isRemove(columnArr)) {
                    changeScore(100);
                    arrSetPush(removeArr,columnArr);
                }
            }
            if(removeArr.length > 0) {
                blockPanel.removeBlock(removeArr);
            }
            
            blockPanel.checkOver();
        });
        
        //旋转按钮
        let rotateBtn = new Sprite.fromImage("res/img/rotateBtn.png");
        this.rotateBtn = rotateBtn;
        rotateBtn.scale.set(0.4,0.4);
        rotateBtn.anchor.set(0.5,0.5);
        rotateBtn.position.set(x,y + 80);
        rotateBtn.interactive = true;
        rotateBtn.buttonMode = true;
        rotateBtn.on('pointertap',function() {
            if(self.shape.nextIndex != -1) {
                self.shape.remove();
                self.addShape(new Shape(40,40,self.shape.color,Shape.getShape(self.shape.nextIndex)));
                if(blockPanel.isPlacePanel(self.shape)) {
                    self.setInteractive(true);
                } else {
                    self.setInteractive(false);
                }
            }
        });
        
        gameCon.addChild(view);
        gameCon.addChild(rotateBtn);
        gameCon.addChild(shapeCon);
    }
    
    /* set() */
    //[undefined]设置交互(交互)
    setInteractive(interactive) {
        this.view.interactive = interactive;
        this.shapeCon.interactive = interactive;
        if(interactive) {
            this.shape.setColor(this.shape.color);
        } else {
            this.shape.setColor(0xC0C0C0);
        }
    }
    
    /* anchor() */
    //[undefined]添加形状(形状对象)
    addShape(shape) {
        this.shape = shape;
        for(let i=0;i<shape.blockArr.length;i++) {
            this.shapeCon.addChild(shape.blockArr[i]);
        }
    }
    
    //[undefined]创建形状()
    createShape() {
        this.addShape(new Shape(40,40,Block.randColor(),Shape.getShape()));
    }
}

//下个面板类
class NextPanel extends ShapePanel {
    /* 构造函数(横坐标，纵坐标) */
    constructor(x,y) {
        super(x,y);
        
        gameCon.removeChild(this.rotateBtn);
        delete this.rotateBtn;
        
        this.view.scale.set(0.45,0.45);
        this.view.interactive = false;
        this.view.buttonMode = false;
        this.view.removeListener('pointerdown');
        
        this.shapeCon.scale.set(0.45,0.45);
        this.shapeCon.interactive = false;
        this.shapeCon.buttonMode = false;
        this.shapeCon.removeListener('pointerdown');
        this.shapeCon.removeListener('pointermove');
        this.shapeCon.removeListener('pointerup');
        
        this.text = new Label("N\nE\nX\nT",new TextStyle({
            fontSize: 18,
            fontWeight: "bold",
            fill: "#FFDEAD",
            stroke: "#4A1850",
            strokeThickness: 5,
            dropShadow: true
        }));
        this.text.anchor.set(0.5,0.5);
        this.text.position.set(x - 70,y);
        uiCon.addChild(this.text);
    }
}

//方块面板类
class BlockPanel {
    /* 构造函数() */
    constructor() {
        this.blockArr = [];
        
        for(let i=0;i<100;i++) {
            let block = new Block(80 + i % 10 * 42,160 + Math.floor(i / 10) * 42,40,40,0xC0C0C0);
            block.color = 0xC0C0C0;
            block.place = true;
            this.blockArr.push(block);
            gameCon.addChild(block);
        }
    }
    
    
    
    /* set() */
    //[undefined]设置透明度(索引数组，透明度)
    setAlpha(indexArr,alpha) {
        for(let i=0;i<indexArr.length;i++) {
            this.blockArr[indexArr[i]].alpha = alpha;
        }
    }
    
    //[undefined]设置颜色(索引数组，颜色)
    setColor(indexArr,color) {
        for(let i=0;i<indexArr.length;i++) {
            this.blockArr[indexArr[i]].tint = color;
            this.blockArr[indexArr[i]].color = color;
        }
    }
    
    //[undefined]设置临时颜色(索引数组，颜色)
    setTempColor(indexArr,color) {
        for(let i=0;i<indexArr.length;i++) {
            this.blockArr[indexArr[i]].tint = color;
        }
    }
    
    //[undefined]设置是否可放置(索引数组，是否可放置)
    setPlace(indexArr,place) {
        for(let i=0;i<indexArr.length;i++) {
            this.blockArr[indexArr[i]].place = place;
        }
    }
    
    /* get() */
    //[undefined]获取方块索引(横坐标，纵坐标)
    getBlockIndex(x,y) {
        if(x > 59 && x < 479 && y > 139 && y < 559) {
            return Math.floor((x - 59) / 42) + Math.floor((y - 139) / 42) * 10;
        } else {
            return -1;
        }
    }
    
    /* anchor() */
    //[undefined]重置方块(索引数组)
    resetBlock(indexArr) {
        this.setAlpha(indexArr,1);
        this.setColor(indexArr,0xC0C0C0);
        this.setPlace(indexArr,true);
    }
    
    //[undefined]重置所有方块(索引数组)
    resetAllBlock() {
        let indexArr = [];
        for(let i=0;i<100;i++) {
            indexArr.push(i);
        }
        this.resetBlock(indexArr);
    }
    
    //[undefined]重置颜色(索引数组)
    resetColor(indexArr) {
        for(let i=0;i<indexArr.length;i++) {
            this.blockArr[indexArr[i]].tint = this.blockArr[indexArr[i]].color;
        }
    }
    
    //[undefined]是否可放置(索引数组)
    isPlace(indexArr) {
        if(indexArr.length < 1) {
            return false;
        }
        for(let i=0;i<indexArr.length;i++) {
            if(indexArr[i] == -1 || !this.blockArr[indexArr[i]].place) {
                return false;
            }
        }
        return true;
    }
    
    //[undefined]是否可放置在面板上(形状对象)
    isPlacePanel(shape) {
        let blockX = [];
        let blockY = [];
        for(let i=0;i<shape.blockArr.length;i++) {
            let pos = shape.blockArr[i].getGlobal();
            blockX.push(pos[0]);
            blockY.push(pos[1]);
        }
        
        let numX = 60 - blockX[0];
        let numY = 140 - blockY[0];
        for(let i=0;i<blockX.length;i++) {
            blockX[i] += numX;
            blockY[i] += numY;
        }
        
        while(true) {
            let indexArr = [];
            for(let i=0;i<blockX.length;i++) {
                indexArr.push(this.getBlockIndex(blockX[i],blockY[i]));
                blockX[i] += 42;
            }
            
            if(this.isPlace(indexArr)) {
                return true;
            }
            
            if(blockX[0] > 478 && blockY[0] > 558) {
                return false;
            } else if(blockX[0] > 478) {
                let temp = 60 - blockX[0];
                for(let i=0;i<blockX.length;i++) {
                    blockX[i] += temp;
                    blockY[i] += 42;
                }
            }
        }
    }
    
    //[undefined]是否是面板方块(索引数组)
    isBlock(indexArr) {
        if(indexArr.length < 1) {
            return false;
        }
        for(let i=0;i<indexArr.length;i++) {
            if(indexArr[i] < 0 || indexArr[i] > 99) {
                return false;
            }
        }
        return true;
    }
    
    //[Boolean]是否可移除(索引数组)
    isRemove(indexArr) {
        for(let i=0;i<indexArr.length;i++) {
            if(this.blockArr[indexArr[i]].place) {
                return false;
            }
        }
        return true;
    }
    
    //[undefined]移除方块(索引数组)
    removeBlock(indexArr) {
        let blockArr = [];
        for(let i=0;i<this.blockArr.length;i++) {
            let block = this.blockArr[i];
            let clone = block.clone();
            clone.x = block.x;
            clone.y = block.y;
            gameCon.addChild(clone);
            blockArr.push(clone);
        }
        
        this.resetBlock(indexArr);
        
        let scale = 1;
        let timer = setInterval(function() {
            scale -= 0.1;
            let temp = scale.toFixed(1);
            for(let i=0;i<blockArr.length;i++) {
                blockArr[i].scale.set(temp,temp);
                blockArr[i].x += 2;
                blockArr[i].y += 2;
            }
            if(scale <= 0.1) {
                clearInterval(timer);
                for(let i=0;i<blockArr.length;i++) {
                    gameCon.removeChild(blockArr[i]);
                }
            }
        },15);
    }
    
    //[undefined]检测结束()
    checkOver() {
        let place = 0;
        for(let i=0;i<3;i++) {
            if(blockPanel.isPlacePanel(shapePanelArr[i].shape)) {
                place ++;
                shapePanelArr[i].setInteractive(true);
            } else {
                shapePanelArr[i].setInteractive(false);
                
                let index = shapePanelArr[i].shape.nextIndex;
                if(index == -1) {
                    continue;
                }
                for(let i=0;i<3;i++) {
                    let shape = new Shape(40,40,0xC0C0C0,Shape.getShape(index));
                    index = shape.nextIndex;
                    if(blockPanel.isPlacePanel(shape)) {
                        place ++;
                        break;
                    }
                }
            }
        }
        
        let prop = true;
        for(let i=0;i<propArr.length;i++) {
            if(propArr[i].number > 0) {
                prop = false;
            }
        }
        
        if(place === 0 && prop) {
            for(let i=0;i<shapePanelArr.length;i++) {
                shapePanelArr[i].rotateBtn.interactive = false;
            }
            for(let i=0;i<propArr.length;i++) {
                propArr[i].view.interactive = false;
            }
            shakeScreen();
            endPanel.visible = true;
            endScore.text = "得分：" + gameScore;
            if(gameScore > bestScore) {
                endScore.y = 0;
                endRecord.visible = true;
                localStorage.bestScore = gameScore;
            }
        }
    }
}

//道具类
class Prop {
    /* 构造函数(横坐标，纵坐标) */
    constructor(x,y,index) {
        this.number = 3;
        
        let self = this;
        let isClick = false;
        let removeArr = [];
        
        let name;
        switch(index) {
            case 0:
                name = "换";
                break;
            case 1:
                name = "单";
                break;
            case 2:
                name = "行";
                break;
            case 3:
                name = "列";
                break;
            case 4:
                name = "矩";
                break;
            case 5:
                name = "十";
                break;
        }
        
        //视图
        let view = new Graphics();
        this.view = view;
        view.beginFill(0xF60FBC,0.1);
        view.drawRoundedRect(0,0,60,60,20);
        view.endFill();
        view.position.set(x,y);
        view.interactive = true;
        view.buttonMode = true;
        view.on('pointertap',function(event) {
            if(self.number === 0) { return; }
            
            if(index === 0) {
                numText.text = --self.number + " / 3";
                for(let i=0;i<3;i++) {
                    shapePanelArr[i].shape.remove();
                    shapePanelArr[i].createShape();
                }
                blockPanel.checkOver();
                if(self.number === 0) {
                    text.visible = false;
                    numText.visible = false;
                    cancel.text = "已用完";
                    cancel.visible = true;
                }
                return;
            }
            
            text.visible = false;
            numText.visible = false;
            cancel.visible = true;
            let pos = event.data.getLocalPosition(app.stage);
            prop.position.set(pos.x - 20,pos.y - 20);
            prop.tint = Block.randColor();
            prop.visible = true;
        });
        gameCon.addChild(view);
        
        //文本
        let text = new Label(name,new TextStyle({
            fontFamily: "微软雅黑",
            fontSize: 20,
            fontWeight: "bold",
            fill: "#FFDEAD",
            stroke: "#000000",
            strokeThickness: 5
        }));
        this.text = text;
        text.anchor.set(0.5,0.5);
        text.position.set(30,20);
        view.addChild(text);
        
        let numText = new Label("3 / 3",new TextStyle({
            fontFamily: "微软雅黑",
            fontSize: 15,
            fontWeight: "bold",
            fill: "#FFDEAD",
            stroke: "#000000",
            strokeThickness: 4
        }));
        this.numText = numText;
        numText.anchor.set(0.5,0.5);
        numText.position.set(30,45);
        view.addChild(numText);
        
        let cancel = new Label("取消",new TextStyle({
            fontFamily: "微软雅黑",
            fontSize: 20,
            fontWeight: "bold",
            fill: "#C0C0C0",
            stroke: "#000000",
            strokeThickness: 5
        }));
        this.cancel = cancel;
        cancel.visible = false;
        cancel.anchor.set(0.5,0.5);
        cancel.position.set(30,30);
        view.addChild(cancel);
        
        let prop = new Block(0,0,40,40,0xC0C0C0);
        prop.visible = false;
        prop.interactive = true;
        prop.buttonMode = true;
        prop.on('pointertap',function() {
            prop.visible = false;
            text.visible = true;
            numText.visible = true;
            cancel.visible = false;
            
            if(blockPanel.isBlock(removeArr)) {
                blockPanel.removeBlock(removeArr);
                numText.text = --self.number + " / 3";
                blockPanel.checkOver();
                if(self.number === 0) {
                    text.visible = false;
                    numText.visible = false;
                    cancel.text = "已用完";
                    cancel.visible = true;
                }
            }
        });
        prop.on('pointermove',function(event) {
            let pos = event.data.getLocalPosition(app.stage);
            prop.position.set(pos.x - 20,pos.y - 20);
            
            if(blockPanel.isBlock(removeArr)) {
                blockPanel.resetColor(removeArr);
                blockPanel.setAlpha(removeArr,1);
            }
            
            removeArr.length = 0;
            
            let blockIndex = blockPanel.getBlockIndex(prop.x + 20,prop.y + 20);
            
            if(!blockPanel.isBlock([blockIndex])) { return; }
            
            switch(index) {
                case 1:
                    removeArr.push(blockIndex);
                    break;
                case 2:
                    let l_index = blockIndex - blockIndex % 10;
                    for(let i=0;i<10;i++) {
                        removeArr.push(l_index + i);
                    }
                    break;
                case 3:
                    let c_index = blockIndex % 10;
                    for(let i=0;i<10;i++) {
                        removeArr.push(c_index + i * 10);
                    }
                    break;
                case 4:
                    let h_index = blockIndex - 11;
                    for(let i=0;i<9;i++) {
                        let temp = h_index + Math.floor(i / 3) * 10 + i % 3;
                        if(temp >= 0 && temp <= 99 && (h_index % 10 != 9 && h_index % 10 != -1 && i % 3 === 0 || (h_index + 2) % 10 !== 0 && i % 3 == 2 || i % 3 == 1)) {
                            removeArr.push(temp);
                        }
                    }
                    break;
                case 5:
                    let l = blockIndex - blockIndex % 10;
                    let c = blockIndex % 10;
                    let lineArr = [];
                    let columnArr = [];
                    for(let i=0;i<10;i++) {
                        lineArr.push(l + i);
                        columnArr.push(c + i * 10);
                    }
                    arrSetPush(removeArr,lineArr);
                    arrSetPush(removeArr,columnArr);
                    break;
            }
            
            blockPanel.setAlpha(removeArr,0.5);
            blockPanel.setTempColor(removeArr,prop.tint);
        });
        app.stage.addChild(prop);
    }
    
    /* anchor() */
    resetProp() {
        this.number = 3;
        this.text.visible = true;
        this.numText.text = "3 / 3";
        this.numText.visible = true;
        this.cancel.visible = false;
        this.cancel.text = "取消";
        this.view.interactive = true;
    }
}

/* 初始化 */
let gameScore = 0; //游戏得分
let tempScore = 0; //临时得分
let bestScore = 0; //最高得分
let maxFloor;

const shapePanelArr = [];
const propArr = [];

if(window.localStorage) {
    if(isNaN(localStorage.bestScore)) {
        localStorage.bestScore = "0";
    } else {
        bestScore = localStorage.bestScore;
    }
} else {
    alert("检测到浏览器不支持localStorage，游戏将无法存储最高得分，请尝试更换浏览器以获得完整游戏体验！");
}

//容器
const gameCon = new Container();
const uiCon = new Container();
gameCon.visible = false;
uiCon.visible = false;
app.stage.addChild(gameCon);
app.stage.addChild(uiCon);

/* 游戏提示 */
const tips1 = new Label("Tips:当形状无法放置到方块面板时，将会被禁用哦！");
tips1.scale.set(0.5,0.5);
tips1.anchor.x = 0.5;
tips1.position.set(270,565);
gameCon.addChild(tips1);

const tips2 = new Label("Tips:通过单击即可使用道具！");
tips2.scale.set(0.5,0.5);
tips2.anchor.x = 0.5;
tips2.position.set(270,825);
gameCon.addChild(tips2);

//实例化道具
for(let i=0;i<6;i++) {
    propArr.push(new Prop(40 + i * 80,760,i));
}

//实例方块面板
let blockPanel = new BlockPanel();

//实例化下个面板
const nextPanel = new NextPanel(445,75);
nextPanel.createShape();

//实例化形状面板
for(let i=0;i<3;i++) {
    let shapePanel = new ShapePanel(103 + i * 165,640,i);
    shapePanel.createShape();
    shapePanelArr.push(shapePanel);
}
maxFloor = gameCon.getChildIndex(shapePanelArr[2].shapeCon);

//得分字体
const scoreStyle = new TextStyle({
    fontFamily: "微软雅黑",
    fontSize: 30,
    fontWeight: "bold",
    fill: "#FFDEAD",
    stroke: "#4A1850",
    strokeThickness: 5,
    dropShadow: true
});

//最高得分标签
const bestText = new Label("best：" + bestScore,scoreStyle);
bestText.position.set(45,30);
uiCon.addChild(bestText);

//游戏得分标签
const scoreText = new Label("score：0",scoreStyle);
scoreText.position.set(45,80);
uiCon.addChild(scoreText);

/* 开始面板 */
const startPanel = new Sprite.fromImage("res/img/panel.png");
startPanel.anchor.set(0.5,0.5);
startPanel.position.set(270,450);
app.stage.addChild(startPanel);

const startLogo = new Sprite.fromImage("res/img/logo.png");
startLogo.anchor.set(0.5,0.5);
startLogo.y = -300;
startPanel.addChild(startLogo);

const startTitle = new Label("铺满整个行或列，将方块消除\n\n\n游戏功能：\n\n    最高得分\n    形状旋转\n    下一个形状提示\n    预放置与预消除\n    六种道具");
startTitle.anchor.set(0.5,0.5);
startTitle.y = -50;
startPanel.addChild(startTitle);

const startBtn = new Sprite.fromImage("res/img/startBtn.png");
startBtn.anchor.set(0.5,0.5);
startBtn.y = 175;
startBtn.interactive = true;
startBtn.buttonMode = true;
startBtn.on('pointertap',function() {
    startPanel.visible = false;
    gameCon.visible = true;
    uiCon.visible = true;
});
startPanel.addChild(startBtn);

/* 结束面板 */
//结束字体
const endStyle = new TextStyle({
    fontFamily: "微软雅黑",
    fontSize: 50,
    fontWeight: "bold",
    fill: "#4A2F34"
});

const endPanel = new Sprite.fromImage("res/img/panel.png");
endPanel.visible = false;
endPanel.alpha = 0.85;
endPanel.anchor.set(0.5,0.5);
endPanel.position.set(270,420);
app.stage.addChild(endPanel);

const endTitle = new Label("游戏结束",new TextStyle({
    fontFamily: "微软雅黑",
    fontSize: 60,
    fontWeight: "bold",
    fill: "#4A2F34"
}));
endTitle.anchor.set(0.5,0.5);
endTitle.y = -175;
endPanel.addChild(endTitle);

const endRecord = new Label("新纪录!",endStyle);
endRecord.visible = false;
endRecord.anchor.set(0.5,0.5);
endRecord.y = -75;
endPanel.addChild(endRecord);

const endScore = new Label("得分：0",endStyle);
endScore.anchor.set(0.5,0.5);
endScore.y = -50;
endPanel.addChild(endScore);

const endBtn = new Sprite.fromImage("res/img/restartBtn.png");
endBtn.anchor.set(0.5,0.5);
endBtn.y = 135;
endBtn.interactive = true;
endBtn.buttonMode = true;
endBtn.on('pointertap',function() {
    resetGame(true);
});
endPanel.addChild(endBtn);

//重新开始
const restartBtn = new Graphics();
restartBtn.beginFill(0xF60FBC,0.08);
restartBtn.drawRoundedRect(0,0,35,35,8);
restartBtn.endFill();
restartBtn.position.set(500,5);
restartBtn.interactive = true;
restartBtn.buttonMode = true;
restartBtn.on('pointertap',function() {
    restartPanel.visible = true;
    restartBtn.interactive = false;
    for(let i=0;i<shapePanelArr.length;i++) {
        shapePanelArr[i].view.interactive = false;
        shapePanelArr[i].shapeCon.interactive = false;
        shapePanelArr[i].rotateBtn.interactive = false;
    }
    for(let i=0;i<propArr.length;i++) {
        propArr[i].view.interactive = false;
    }
});
uiCon.addChild(restartBtn);

const restartIcon = new Label("| |",new TextStyle({
    fontFamily: "微软雅黑",
    fontSize: 15,
    fontWeight: "bold",
    fill: "#000000",
    stroke: "#000000",
    strokeThickness: 3
}));
restartIcon.anchor.set(0.5,0.5);
restartIcon.position.set(17.5,17.5);
restartBtn.addChild(restartIcon);

const restartPanel = new Sprite.fromImage("res/img/panel.png");
restartPanel.visible = false;
restartPanel.alpha = 0.9;
restartPanel.anchor.set(0.5,0.5);
restartPanel.rotation = Math.PI / 2;
restartPanel.position.set(270,420);
uiCon.addChild(restartPanel);

const restartTitle = new Label(" 确定要重新开始游戏？\n\n这将失去当前游戏进度！");
restartTitle.rotation = -Math.PI / 2;
restartTitle.anchor.set(0.5,0.5);
restartTitle.x = -70;
restartPanel.addChild(restartTitle);

//按钮字体
const btnStyle = new TextStyle({
    fontFamily: "微软雅黑",
    fontSize: 40,
    fontWeight: "bold",
    fill: "#FFDEAD",
    stroke: "#4A1850",
    strokeThickness: 5,
    dropShadow: true
});

const rightBtn = new Label("确定",btnStyle);
rightBtn.rotation = -Math.PI / 2;
rightBtn.anchor.set(0.5,0.5);
rightBtn.position.set(70,95);
rightBtn.interactive = true;
rightBtn.buttonMode = true;
rightBtn.on('pointertap',function() {
    restartPanel.visible = false;
    resetGame();
});
restartPanel.addChild(rightBtn);

const cancelBtn = new Label("取消",btnStyle);
cancelBtn.rotation = -Math.PI / 2;
cancelBtn.anchor.set(0.5,0.5);
cancelBtn.position.set(70,-85);
cancelBtn.interactive = true;
cancelBtn.buttonMode = true;
cancelBtn.on('pointertap',function() {
    restartBtn.interactive = true;
    restartPanel.visible = false;
    for(let i=0;i<3;i++) {
        shapePanelArr[i].view.interactive = true;
        shapePanelArr[i].shapeCon.interactive = true;
        shapePanelArr[i].rotateBtn.interactive = true;
    }
    for(let i=0;i<6;i++) {
        propArr[i].view.interactive = true;
    }
});
restartPanel.addChild(cancelBtn);

/* 函数定义 */
//[undefined]改变得分(分数)
function changeScore(score) {
    addScoreLabel(score);
    gameScore += score;
    let timer = setInterval(function() {
        if(tempScore != gameScore) {
            scoreText.text = "score：" + (++tempScore);
        } else {
            clearInterval(timer);
        }
    },1);
}

//[undefined]添加得分标签(分数)
function addScoreLabel(score) {
    let label = new Label("+" + score,new TextStyle({
        fontFamily: "微软雅黑",
        fontSize: 20,
        fontWeight: "bold",
        fill: "#FFDEAD",
        stroke: "#4A1850",
        strokeThickness: 5
    }));
    label.position.set(scoreText.x + scoreText.width + Math.random() * 25 + 15,scoreText.y + 17);
    uiCon.addChild(label);
    
    let timer = setInterval(function() {
        label.alpha -= 0.05;
        label.y --;
        if(label.alpha <= 0) {
            clearInterval(timer);
            uiCon.removeChild(label);
        }
    },50);
}

//[undefined]不重复合并数组(合并的数组，被合并的数组)
function arrSetPush(arr1,arr2) {
    for(let i=0;i<arr2.length;i++) {
        let isPush = true;
        for(let j=0;j<arr1.length;j++) {
            if(arr1[j] == arr2[i]) {
                isPush = false;
                break;
            }
        }
        if(isPush) {
            arr1.push(arr2[i]);
        }
    }
}

//[undefined]震屏()
function shakeScreen() {
    let time = 10;
    let timer = setInterval(function(){
        gameCon.position.set(Math.random() * 10 - 5,Math.random() * 10 - 5);
        if(--time === 0) {
            clearInterval(timer);
            gameCon.position.set(0,0);
        }
    },20);
}

//[undefined]重置游戏(是否回到主页)
function resetGame(isMain = false) {
    if(isMain) {
        gameCon.visible = false;
        uiCon.visible = false;
        endPanel.visible = false;
        startPanel.visible = true;
    }
    
    shakeScreen();
    
    bestScore = Number(localStorage.bestScore);
    gameScore = 0;
    tempScore = 0;
    bestText.text = "best：" + bestScore;
    scoreText.text = "score：0";
    
    blockPanel.resetAllBlock();
    
    for(let i=0;i<3;i++) {
        shapePanelArr[i].shape.remove();
        shapePanelArr[i].createShape();
        shapePanelArr[i].setInteractive(true);
        shapePanelArr[i].rotateBtn.interactive = true;
    }
    
    nextPanel.shape.remove();
    nextPanel.createShape();
    
    for(let i=0;i<6;i++) {
        propArr[i].resetProp();
    }

    restartBtn.interactive = true;
}
