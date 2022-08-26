
// 引入其他的类
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


// 游戏控制器， 控制其它的所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向(也就是按键的方向)
    direction: string = '';

    // 创建一个属性用来记录游戏是否结束
    isLive: boolean = true;


    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5);
        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按下的事件
        document.addEventListener("keydown", this.keyDownHandler.bind(this));//这样，这里的this代表的就是GameControl了，而不是document
        // 调用run方法，使蛇移动
        this.run();
    }

    /* 
        ArrowUp     Up
        ArrowDown   Down
        ArrowLeft   Left
        ArrowRight  Right
    */

    // 创建一个键盘按下的响应函数
    keyDownHandler(event: KeyboardEvent) {
        // 在赋值前检查event.key的值是否合法（用户是否按了正确的按键）
        // 修改direction属性
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run() {
        /* 
            根据方向（this.direction）来使蛇的位置改变
                向上    top     减少
                向下    top     增加
                向左    left    减少
                向右    left    增加
        */

        // 获取蛇现在的坐标(调用snake的get方法)
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up"://为了兼容ie
            case "w":
            case "W":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
            case "s":
            case "S":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
            case "a":
            case "A":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
            case "d":
            case "D":
                X += 10;
                break;
        }
        // 检查蛇是否吃了食物
        this.checkEat(X, Y)

        try {
            // 修改蛇的X与Y的值(调用snake的set方法)
            this.snake.X = X;
            this.snake.Y = Y;

        } catch (e: any) {
            // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
            alert(e.message);
            // 将isLive设置为false
            this.isLive = false;
        }

        // (蛇是true的时候)开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), (300 - (this.scorePanel.level - 1) * 30));//递归调用,时间来控制蛇的移动速度
    }
    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }


}

export default GameControl;