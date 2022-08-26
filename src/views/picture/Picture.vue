<template>
  <div class="picture">
    <beehive></beehive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Beehive from "@/components/content/beehive/Beehive.vue";

export default defineComponent({
  name: "Picture",
  components: { Beehive },
  setup() {},
});
</script>

<style lang="less" scoped>
.picture {
  background-image: linear-gradient(
    to right,
    #e4afcb 0%,
    #b8cbb8 0%,
    #b8cbb8 0%,
    #e2c58b 30%,
    #c2ce9c 64%,
    #7edbdc 100%
  );
}
</style>