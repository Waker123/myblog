// 定义食物类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;//加！表示这个元素不会为空
    }
    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }
    // 修改食物位置的方法
    change() {
        // 生成一个随机的问题
        // 食物的位置最小是0，最大是290，得是10的倍数
        const localX = Math.round((Math.random() * 29)) * 10;//Math.round是取整的意思
        const localY = Math.round((Math.random() * 29)) * 10;

        this.element.style.left = localX + "px";
        this.element.style.top = localY + 'px';
    }

}
export default Food;