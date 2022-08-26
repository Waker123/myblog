
class ScorePanel {
    // score和level用来记录分数和等级
    score = 0;
    level = 1;

    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement;
    levelELe: HTMLElement;

    // 设置一个变量限制等级
    maxLevel: number;
    // 设置一个变量表示多少分时升级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {//默认值，es6的写法
        this.scoreEle = document.getElementById("score")!;
        this.levelELe = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分的方法
    addScore() {
        // 分数增加
        this.scoreEle.innerHTML = ++this.score + "";
        // 判断分数是多少
        if (this.score % this.upScore === 0) {//每加10分升一级
            this.levelUp()
        }
    }
    // 提升等级的方法
    levelUp() {
        // 设置等级
        if (this.level < this.maxLevel) {
            this.levelELe.innerHTML = ++this.level + '';
        }
    }
}

export default ScorePanel;