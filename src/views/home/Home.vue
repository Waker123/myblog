<template>
  <div class="home">
    <!-- transition动画 -->
    <transition name="fadein">
      <!-- 没点击时展示。点击后慢慢淡出 -->
      <!-- 点击后，h2和h3透明度缓缓变为0 -->
      <div class="title" @click="showContent" v-show="!isShow">
        <h2 class="animate__animated animate__backInDown">欢迎进入</h2>
        <!--  见下面挂载，如果myname的value不为空，那么class为："name_desc animate__animated animate__fadeInUp"; -->
        <h3 ref="myname" class="name_desc hide">Waker的blog</h3>
      </div>
    </transition>
    <transition name="fadein">
      <div class="content" v-show="isShow">
        <transition name="fadein">
          <!--showBackground.value = window.scrollY >= 460; -->
          <TopBackground v-show="!showBackground" />
        </transition>
        <div class="top">
          <div class="left">
            <TimeLine />
          </div>
          <div class="center">
            <ToDoList />
            <WeekTodo />
            <LineChart />
          </div>
          <div class="right">
            <CircleChart />
            <Progress />
            <Calendar />
          </div>
        </div>
        <div class="bottom"></div>
        <transition name="fadein">
          <ContentBackground v-show="showBackground" />
        </transition>
      </div>
    </transition>
    <Cube />
    <Windmill />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, Ref, ref } from "vue";
import { useMainStore } from "../../store";
import Cube from "../../components/content/animation/Cube.vue";
import Windmill from "../../components/content/animation/Windmill.vue";
import ToDoList from "../../components/content/todolist/ToDoList.vue";
import TimeLine from "../../components/content/timeline/TimeLine.vue";
import TopBackground from "../../components/content/background/TopBackground.vue";
import WeekTodo from "../../components/content/weektodo/WeekTodo.vue";
import ContentBackground from "../../components/content/background/ContentBackground.vue";
import Progress from "../../components/content/progress/Progress.vue";
import CircleChart from "../../components/content/circlechart/CircleChart.vue";
import LineChart from "../../components/content/linechart/LineChart.vue";
import Calendar from "../../components/content/calendar/Calendar.vue";
// 因为home组件没有在xxx.d.ts文件中声明，所以还是需要抛出的
export default defineComponent({
  name: "Home",
  components: {
    Cube,
    Windmill,
    ToDoList,
    TimeLine,
    TopBackground,
    WeekTodo,
    ContentBackground,
    Progress,
    CircleChart,
    LineChart,
    Calendar,
  },
  setup() {
    const myname: Ref<HTMLElement | null> = ref(null);
    const isShow: Ref<Boolean> = ref(false);
    const showBackground: Ref<Boolean> = ref(false);
    const mainStore = useMainStore();
    const titleDefaultColor = mainStore.todolistColor;

    // 内容区
    const showContent = () => {
      isShow.value = true;
    };
    // 滚动监听
    const setScrollEvent = () => {
      window.addEventListener("scroll", () => {
        showBackground.value = window.scrollY >= 460;
        mainStore.setTitle(window.scrollY >= 460 ? "#fff" : titleDefaultColor);
      });
    };

    onMounted(() => {
      if (myname.value) {
        myname.value.className =
          "name_desc animate__animated animate__fadeInUp";
      }
      setScrollEvent();
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", () => {});
    });

    return {
      myname,
      isShow,
      showBackground,
      mainStore,
      showContent,
    };
  },
});
</script>


<style lang="less" scoped>
.home {
  height: 100%;
  > .title {
    position: absolute;
    top: 40vh;
    left: 0;
    right: 0;
    text-align: center;
    font-family: "yuan";
    cursor: pointer;

    h2 {
      font-size: 70px;
      margin-bottom: 20px;
    }

    .hide {
      display: none;
    }
  }

  .content {
    margin-top: 400px;
    padding: 100px 20px 20px;
    border: none;
    position: relative;
    .top {
      display: flex;
      .left,
      .right {
        flex: 1;
        padding-top: 79px;
      }
      .center {
        flex: 2;
      }
      .right {
        .el-calendar {
          width: 400px;
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%),
            0 25px 50px 0 rgb(0 0 0 / 10%);
          border-radius: 8px;
          ::v-deep .el-calendar-table .el-calendar-day {
            // width: 40px;
            height: 38px;
          }
        }
      }
    }
    .bottom {
      display: flex;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  //
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  // enter enter-active enter-to leave leave-active leave-to
  .fadein-enter-active,
  .fadein-leave-active {
    transition: opacity 1s;
  }
  // 进入的起点和离开的终点
  .fadein-enter-from,
  .fadein-leave-to {
    opacity: 0;
  }
  //   离开的起点
  .fadein-leave-from {
    opacity: 1;
  }
}
</style>