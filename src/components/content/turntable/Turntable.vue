<template>
  <LuckyWheel
    ref="myLucky"
    width="350px"
    height="350px"
    :prizes="prizes"
    :blocks="blocks"
    :buttons="buttons"
    @start="startCallback"
    @end="endCallback"
  />
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const blocks = reactive([{ padding: "13px", background: "#617df2" }]);
const prizes = reactive([
  { fonts: [{ text: "烤鸡", top: "10%" }], background: "#e9e8fe" },
  { fonts: [{ text: "烧烤", top: "10%" }], background: "#b8c5f2" },
  { fonts: [{ text: "面条", top: "10%" }], background: "#e9e8fe" },
  { fonts: [{ text: "饭", top: "10%" }], background: "#b8c5f2" },
  { fonts: [{ text: "馄饨", top: "10%" }], background: "#e9e8fe" },
  { fonts: [{ text: "饼干", top: "10%" }], background: "#b8c5f2" },
]);
const buttons = reactive([
  { radius: "50px", background: "#617df2" },
  { radius: "45px", background: "#afc8ff" },
  {
    radius: "40px",
    background: "#869cfa",
    pointer: true,
    fonts: [{ text: "开始\n抽奖", top: "-20px" }],
  },
]);
// 点击抽奖按钮会触发star回调
const startCallback = () => {
  // 调用抽奖组件的play方法开始游戏
  proxy.$refs.myLucky.play();
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = Math.floor(Math.random() * 6);
    console.log(index);
    // 调用stop停止旋转并传递中奖索引
    proxy.$refs.myLucky.stop(index);
  }, 3000);
};
// 抽奖结束会触发end回调
const endCallback = (prize) => {
  console.log(prize);
};
</script>
