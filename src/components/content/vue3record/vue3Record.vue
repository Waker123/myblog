<template>
  <div class="main">
    <div class="scoll">
      <h1>目录</h1>
      <el-scrollbar height="300px">
        <a
          :href="'#' + item.id"
          v-for="item in vue3Data"
          :key="item.id"
          class="scrollbar-demo-item"
        >
          {{ item.title }}
        </a>
      </el-scrollbar>
    </div>
    <div class="content">
      <el-scrollbar>
        <p v-for="item in vue3Data" :key="item.id" class="scrollbar-demo-item">
          <el-card class="box-card" shadow="hover">
            <h3 :id="item.id">{{ item.title }}</h3>
            {{ item.content }}
          </el-card>
        </p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang='ts'>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { BlogData } from "../../../utils/type";
import getVue3Summary from "../../../api/vue3Summary";

export default {
  setup() {
    let vue3Data: BlogData[] = ref([]);
    // 使用async把异步变为同步
    const getData = async () => {
      await getVue3Summary().then((res) => {
        vue3Data.value = res.data;
      });
    };
    onMounted(() => {
      getData();
    });
    return {
      vue3Data,
    };
  },
};
</script>

<style lang='less' scoped>
.main {
  display: flex;
  align-items: center;
  padding: 50px;
  width: 100%;
  height: 100%;
  .scoll {
    position: relative;
    flex: 2;
    h1 {
      position: absolute;
      top: -20%;
      left: 30%;
      font-family: "yuan";
      font-size: 40px;
      color: rgba(0, 0, 0, 0.5);
    }
    .scrollbar-demo-item {
      height: 40px;
      width: 200px;
      margin: 20px;
      text-align: center;
      line-height: 40px;
      border-radius: 4px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      background: var(--el-color-primary-light-12);
      color: salmon;
      font-size: 16px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //（行数）
      -webkit-box-orient: vertical;
    }
  }
  .content {
    flex: 8;
    height: 100%;
    // background-color: pink;
    margin-left: 20px;
    padding: 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    .box-card {
      width: 100%;
      margin: 20px 0;
      background-color: #fff;
      padding: 10px;
      font-size: 20px;
      h3 {
        font-size: 26px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>