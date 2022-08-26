<template>
  <!-- 这里的Menu组件是view-ui-plus中的组件 -->
  <!-- 注意下面的样式中，用到了class的对象写法,true表示开启这个属性 -->
  <!-- 当前页面是/home时才显示transparent activeIndex的初值为"/"-->
  <!-- active-name 	激活菜单的 name 值 -->
  <!-- active-name的值对应下面MenuItem中的name，选中哪个Item，active-name的值就等于item的name的值 -->
  <Menu
    mode="horizontal"
    theme="dark"
    :active-name="data.activeIndex"
    @on-select="switchTab"
    :class="{
      nav: true,
      transparent: data.activeIndex === '/home',
      pictureColor: data.activeIndex === '/picture',
      gameColor: data.activeIndex === '/game',
      blogColor:
        data.activeIndex === '/myBlog' ||
        data.activeIndex === '/myBlog/vue2Record' ||
        data.activeIndex === '/myBlog/vue3Record',
    }"
    ref="menuRef"
  >
    <div class="menu-nav">
      <!-- name 	菜单项的唯一标识，必填 -->
      <MenuItem name="/home">
        <!-- Icon选取不同的type获取不同的字体图标 -->
        <Icon type="ios-paper" />
        主页
      </MenuItem>
      <MenuItem name="/game">
        <Icon type="ios-game-controller-b" />
        小游戏
      </MenuItem>
      <MenuItem name="/picture">
        <Icon type="ios-people" />
        目录
      </MenuItem>
      <MenuItem name="/myBlog">
        <Icon type="md-book" />
        MyBlog
      </MenuItem>
    </div>
  </Menu>
</template>

<script lang="ts" setup>
import { reactive, watch, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const data = reactive({
  activeIndex: "/",
});
const switchTab = (path: string) => {
  router.push(path);
};
const menuRef: any = ref(null);
watch(
  () => route.path, //watch中这边得写成函数返回属性才能监视
  (cur, pre) => {
    data.activeIndex = cur; //让activeIndex的值一直为watch监视的新的path的值
  }
);
</script>

<style lang="less" scoped>
.nav {
  background: url("../../../assets/img/bg/9.png");
  &.ivu-menu {
    display: flex;
    justify-content: center;
    .menu-nav {
      overflow: hidden;
    }
  }
  /* 
    内层选择器的前面没有 & 符号，则它被解析为父选择器的后代；
    如果有 & 符号，它就被解析为父元素自身或父元素的伪类。
  */
  //   下面这个就相等于
  &.transparent {
    background: transparent;
  }
  &.pictureColor {
    background-image: linear-gradient(
      to right,
      #e4afcb 0%,
      #b8cbb8 0%,
      #b8cbb8 0%,
      #e2c58b 30%,
      #c2ce9c 64%,
      #7edbdc 100%
    );
    border-bottom: 1px solid #fff;
    opacity: 0.6;
  }
  &.gameColor {
    background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
    opacity: 0.6;
  }
  &.blogColor {
    background: url("../../../assets/img/BG/13.jpg") no-repeat 0 -40px;
    background-size: 100%;
    opacity: 0.9;
  }
}
</style>