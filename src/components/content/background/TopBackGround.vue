<template>
  <div class="top-background">welcome to coderlin's blog</div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.top-background {
  position: absolute;
  top: -460px; //content中margin-top :400px 所以这边得设置为-460px才能显示得出来
  left: 0;
  right: 0;
  font-family: "yuan";
  font-weight: 600;
  background: url("../../../assets/img/bg/9.png") no-repeat;
  // background-size: cover;
  background-position: 0 90%; //调整大图的位置，显示哪一部分
  line-height: 460px;
  text-align: center;
  color: #fff;
  font-size: 50px;
}
</style>