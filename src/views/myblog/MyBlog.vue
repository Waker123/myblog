<template>
  <div class="myBlog">
    <div class=".nav">
      <BlogNav></BlogNav>
    </div>
    <div class="main">
      <el-card class="box-card"><router-view></router-view></el-card>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyBlog",
});
</script>

<style lang='less' scoped>
.myBlog {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/BG/13.jpg") no-repeat 0px -100px;
  background-size: 100%;

  .nav {
    height: 20%;
  }
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 600px;
    .box-card {
      width: 100%;
      height: 100%;
      opacity: 0.8;
      border-radius: 30px;
    }
  }
}
</style>