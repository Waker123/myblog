<template>
  <!-- 像这中nav-bar组件已经在components.d.ts文件中声明过了，可以直接拿来用，不需要在下面声明组件 -->
  <nav-bar></nav-bar>
  <div class="view">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { defineComponent } from "vue";

//用了defineComponent之后:1. 显示 Vue Options 提示。2. 给予正确的参数类型推断。3. 可返回一个合成类型的构造函数。
export default defineComponent({
  name: "App",
  setup() {
    const data = reactive({});

    onBeforeMount(() => {
      // console.log('2.组件挂载页面之前执行----onBeforeMount')
    });
    onMounted(() => {
      // console.log('3.-组件挂载到页面之后执行-------onMounted')
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="less" scoped>
.view {
  height: calc(100% - 60px);
}
</style>