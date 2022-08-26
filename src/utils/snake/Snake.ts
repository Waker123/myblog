class Snake {
    // 表示🐍头的元素
    head: HTMLElement;
    // 蛇的身体(包括蛇头)
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.head = document.querySelector("#snake>div")!;//取蛇头,第一个div
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake') as HTMLElement;//相当于!
    }

    // 获取蛇的坐标(蛇头坐标)
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value: number) {
        if (this.X === value) {
            return
        }
        // X的值的合法范围0-290
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error("Game Over")
        }
        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左(右)移动时，不能向右(左)掉头
        // 在第二节存在时，蛇头的坐标不能等于第二节的坐标
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向发生了调头')
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该让蛇继续向左走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }

        }


        this.moveBody();
        this.head.style.left = value + 'px';
    }
    set Y(value: number) {
        if (this.Y === value) {
            return
        }

        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error("Game Over")
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.Y) {
                // 如果新值value大于旧值Y，则说明蛇在向下走，此时发生掉头，应该让蛇继续向上走
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }

        }
        this.moveBody();
        this.head.style.top = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody();//必须放到设置value后面
    }

    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        let div = document.createElement('div');
        this.element.appendChild(div);
    }

    // 增加一个蛇身体移动的方法
    moveBody() {
        /* 
            将后边的身体设置为前边身体的位置
                举例子
                    第四节 = 第三节的位置
                    第三节 = 第二节的位置
                    第二节 = 蛇头的位置
        */
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }


    }

    // 检查蛇头是否撞到自己了
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了!')
            }
        }
    }

}

export default Snake;