<template>
  <div class="week-todo" :style="{ color: mainStore.weektodoColor }">
    <div class="title">今天星期{{ dayToChiComputed }}</div>
    <div class="todo-wrapper">
      <div
        class="todo-item"
        v-for="(item, index) in todoList[curDay - 1]"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <button class="planButton" @click="dialogVisible = true">
      重新制定本周计划
    </button>
  </div>
  <div class="dialogPlan">
    <el-dialog v-model="dialogVisible" title="本周计划" width="50%">
      <span>请使用","隔开</span>
      <div class="listPlan" v-for="(item, index) in todoList" :key="index">
        <label>周{{ DAY_TO_CHINESE[index + 1] }}:</label
        ><input type="text" v-model="todoList[index]" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="storePlan">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  DAY_TO_CHINESE,
  DAY_TO_CHINESE_INTERFACE,
} from "../../../utils/constant";
import { computed, ref, Ref, onMounted, watch } from "vue";
import { useMainStore } from "../../../store";
import useLocalStorage from "../../../utils/useLocalStorage";
import { Split } from "view-ui-plus";
const curDay: number = new Date().getDay(); // 0-6
let todoList: Ref<Array<Array<string>>> = ref([]);
const mainStore = useMainStore();
const weekStore = useLocalStorage();
let dialogVisible = ref(false);

const dayToChiComputed = computed(
  () => DAY_TO_CHINESE[curDay as unknown as keyof DAY_TO_CHINESE_INTERFACE]
);

//解决input中修改item后，item会变为字符串的情况
watch(todoList.value, () => {
  todoList.value.forEach((item) => {
    let index = todoList.value.indexOf(item);
    if (typeof item === "string") {
      todoList.value[index] = item.split(",");
    }
  });
});

const storePlan = () => {
  dialogVisible.value = false;
  let storeList = {};
  todoList.value.forEach((item) => {
    let index = todoList.value.indexOf(item); //对象的属性(索引号)
    storeList[index] = item;
  });
  console.log(storeList);
  weekStore.setItem("WEEKTODO", storeList);
};

onMounted(() => {
  // 如果localStore中没有存储，则新增数据
  if (weekStore.getItem("WEEKTODO") === null) {
    weekStore.setItem("WEEKTODO", {
      0: ["一道leetcode", "一集Vue3 + ts", "周一总结"],
      1: ["一道leetcode", "一集Vue3 + ts", "周二总结"],
      2: ["一道leetcode", "一集Vue3 + ts", "周三总结"],
      3: ["一道leetcode", "一集Vue3 + ts", "周四总结"],
      4: ["一道leetcode", "一集Vue3 + ts", "周五总结"],
      5: ["一道leetcode", "一集Vue3 + ts", "周六放假"],
      6: ["一道leetcode", "一集Vue3 + ts", "周日放假"],
    });
  }
  let storeList = weekStore.getItem("WEEKTODO");
  Object.keys(storeList).forEach((item) => {
    todoList.value.push(storeList[item]); //给todoList赋初值
  });
});
</script>

<style lang="less" scoped>
.week-todo {
  position: relative;
  margin: 40px auto;
  width: 400px;
  padding: 20px;

  .title {
    padding: 0 10px 20px;
    text-align: center;
    font-size: 24px;
    font-family: "yuan";
  }
  .todo-wrapper {
    padding: 0 60px 20px;
    .todo-item {
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid rgb(236, 236, 236);
    }
  }
  .planButton {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
    padding: 7px;
    background-color: transparent;
    border-radius: 5px;
    border: 2px #ccc solid;
    color: #ccc;
    cursor: pointer;
    box-sizing: content-box;
  }
}
.dialogPlan {
  font-family: "yuan";
  .listPlan {
    margin: 20px 0;
    label {
      font-size: 20px;
      margin-right: 30px;
    }
    input {
      width: 80%;
      font-size: 16px;
      outline: none;
      border-radius: 8px;
      padding-left: 10px;
    }
  }
}
</style>