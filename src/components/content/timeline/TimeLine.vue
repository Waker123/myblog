<template>
  <div class="timeline">
    <div class="title" :style="{ color: mainStore.timelineColor }">
      打卡日历
    </div>
    <button class="dailyWork" @click="dailyWorkComplete">打卡</button>
    <el-timeline>
      <!-- placement时间戳位置 
           timestamp时间戳
       -->
      <el-timeline-item
        v-for="item in timeList"
        :key="item.id"
        :timestamp="item.timestamp"
        placement="top"
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.commitInfo }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
  <div class="circle">
    <h3>本月打卡进度</h3>
    <Circle :percent="countPercent" size="250">
      <span class="demo-Circle-inner" style="font-size: 24px"
        >{{ countPercent }}%</span
      >
    </Circle>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, Ref, ref, watch } from "vue";
import { useMainStore } from "../../../store";
import useLocalStorage from "../../../utils/useLocalStorage";
interface TimeListType {
  id: number;
  timestamp: string;
  title: string;
  commitInfo: string;
}
const mainStore = useMainStore();
const getMonth: number = new Date().getMonth() + 1; //需要加一才是当前月份
const getYear: number = new Date().getFullYear();
const getDay: number = new Date().getDate();
const day31: Array<number> = [1, 3, 5, 7, 8, 10, 12];
const timeStore = useLocalStorage();
let countPercent: Ref<number> = ref(0);
const timeList: Ref<TimeListType[]> = ref([]);

// 打卡
const dailyWorkComplete = () => {
  if (timeList.value[getDay - 1].commitInfo === "未完成😢😢😢") {
    timeList.value[getDay - 1].commitInfo = "已完成🦆🦆🦆";
    ElMessage.success("打卡成功！");
  } else {
    ElMessage.warning("今天已经打过卡了~~~");
  }
};

// 如果timeList有变化，就将变化后的再存入localstorage
watch(timeList.value, () => {
  let storeList = {};
  let count: number = 0;
  timeList.value.forEach((item) => {
    let index = timeList.value.indexOf(item) + 1;
    storeList[index] = item;
    if (item.commitInfo === "已完成🦆🦆🦆") count++; //统计完成了多少
  });
  countPercent.value = count * 3.33;
  timeStore.setItem("TIMELIST", storeList);
});

// 用来装载storeage
const onLoadStorage = () => {
  if (day31.includes(getMonth)) {
    let storeList = {}; //用来临时存储store数据的对象
    for (let i = 1; i <= 31; i++) {
      //属性为i，属性值是一个对象
      storeList[i] = {
        id: i,
        timestamp: `${getYear}-${getMonth}-${i}`,
        title: "今日打卡",
        commitInfo: "未完成😢😢😢",
      };
    }
    timeStore.setItem("TIMELIST", storeList);
  } else {
    let storeList = {}; //用来临时存储store数据的对象
    for (let i = 1; i <= 30; i++) {
      //属性为i，属性值是一个对象
      storeList[i] = {
        id: i,
        timestamp: `${getYear}-${getMonth}-${i}`,
        title: "今日打卡",
        commitInfo: "未完成😢😢😢",
      };
    }
    timeStore.setItem("TIMELIST", storeList);
  }
};

onMounted(() => {
  // 往localStroage中填充数据
  if (timeStore.getItem("TIMELIST") === null) {
    onLoadStorage();
  } else {
    // 处理当localStroage内的月份和目前月份不符合时的情况
    let sList = timeStore.getItem("TIMELIST");
    let month = sList[1]["timestamp"].split("-")[1];
    if (month !== getMonth + "") {
      onLoadStorage();
    }
  }

  //如果localStorage中有数据了，那么提取出她的属性值赋给timeList
  let storeList = timeStore.getItem("TIMELIST");
  console.log(timeList.value);
  Object.keys(storeList).forEach((item) => {
    timeList.value.push(storeList[item]);
  });
});
</script>



<style lang="less" scoped>
.timeline {
  position: relative;
  width: 300px;
  padding: 8px;
  margin-top: 79px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin: 0 auto;

  .title {
    font-family: "ye";
    margin-bottom: 10px;
  }
  .dailyWork {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 80px;
    height: 40px;
    background-color: skyblue;
    border: 2px solid #fff;
    border-radius: 13px;
    font-family: "yuan";
    font-weight: 700;
    font-size: 20px;
    opacity: 0.6;
    cursor: pointer;
  }

  .el-timeline {
    height: 400px;
    padding: 18px;
    overflow-y: auto;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;

    /* IE 10+ */
    &::-webkit-scrollbar {
      // chrome safari
      display: none;
    }
  }
}
.circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-family: "yuan";
  color: #fff;
}
</style>