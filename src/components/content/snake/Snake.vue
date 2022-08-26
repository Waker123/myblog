<template>
  <!-- 创建游戏的主容器 -->
  <div id="main" class="main">
    <!-- 设置游戏的舞台 -->
    <div id="stage" class="stage">
      <!-- 设置蛇 -->
      <div id="snake" class="snake">
        <!-- snake内部的div 表示蛇的各部分 -->
        <div></div>
      </div>
      <!-- 设置食物 -->
      <div id="food" class="food">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <!-- 设置游戏的积分牌 -->
    <div id="score-panel">
      <div>SCORE:<span id="score"></span></div>
      <div>LEVEL:<span id="level">1</span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeUnmount } from "vue";
import GameControl from "../../../utils/snake/GameControl.ts";

onMounted(() => {
  let gc = new GameControl();
});
</script>

<style lang="less" scoped>
@bg-color: #b7d4a8; // 清除默认样式

* {
  margin: 0;
  padding: 0;
  // 改变盒子模型的计算方式
  box-sizing: border-box;
}

// 设置主窗口的样式
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 360px;
  height: 420px;
  background-color: @bg-color;
  margin: 100px auto;
  border: 10px solid black;
  border-radius: 40px;

  .stage {
    width: 304px;
    height: 304px;
    border: 2px solid black;
    // 开启相对定位
    position: relative;

    // 设置🐍的形式
    .snake {
      & ::v-deep div {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: black;
        border: 1px solid @bg-color; //让蛇看上去有一个边框
        // 开启绝对定位 让蛇可以动
      }
    }

    // 设置食物
    #food {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-content: space-between;
      position: absolute;
      left: 40px;
      top: 40px;
      width: 10px;
      height: 10px;
      background-color: yellowgreen;

      & > div {
        width: 4px;
        height: 4px;
        background-color: orangered;
        transform: rotate(45deg);
      }
    }
  }

  #score-panel {
    width: 250px;
    display: flex;
    justify-content: space-between;
  }
}
</style>