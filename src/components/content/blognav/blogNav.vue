<template>
  <Menu
    mode="horizontal"
    theme="dark"
    :active-name="data.activeIndex"
    @on-select="switchTab"
    ref="menuRef"
    class="nav"
  >
    <div class="menu-nav">
      <MenuItem name="/myBlog/vue2Record" class="itemStyle">
        <Icon type="md-bonfire" />
        vue2记录
      </MenuItem>
      <MenuItem name="/myBlog/vue3Record" class="itemStyle">
        <Icon type="md-bonfire" />
        vue3记录
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
</script>
<style lang='less' scoped>
.nav {
  &.ivu-menu {
    display: flex;
    justify-content: center;
    font-family: "yuan";
    background-color: transparent;
    .menu-nav {
      overflow: hidden;
      .itemStyle {
        color: rgba(0, 0, 0, 0.7);
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}
</style>