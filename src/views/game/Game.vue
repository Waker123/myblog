<template>
  <div class="game">
    <h1 class="title">贪吃蛇🐍</h1>
    <h1>(按下方向键开始游戏)</h1>
    <div class="snake">
      <Snake />
    </div>
    <h1>🦆🦆今天吃什么</h1>
    <div class="turntable"><Turntable /></div>
  </div>
</template>

<script lang ='ts'>
import { defineComponent, ref, onMounted } from "vue";
import getVue2Summary from "../../api/vue2Summary";
export default defineComponent({});
</script>

<style lang='less' scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1350px;
  font-family: "yuan";
  background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
  .title {
    margin-top: 50px;
  }
  .snake {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    margin-bottom: 50px;
    border: 8px dashed #fff;
    border-radius: 8%;
  }
  .turntable {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    margin-bottom: 50px;
    border: 8px dashed #fff;
    border-radius: 50%;
  }
}
.large {
  width: 500px;
  height: 500px;
  background-color: yellow;
}
</style>