<template>
  <Particles></Particles>
  <el-card class="box-card" shadow="hover">
    <h3>登录</h3>
    <div class="username">
      <label for="username">账号：</label
      ><input
        type="text"
        id="username"
        placeholder="username"
        v-model="username"
      />
    </div>
    <div class="password">
      <label for="password">密码：</label
      ><input
        type="password"
        id="password"
        placeholder="password"
        v-model="password"
      />
    </div>
    <div class="btn">
      <button class="btn1" @click="userLogin">登录</button>
      <button class="btn2" text @click="dialogVisible = true">注册</button>
    </div>
  </el-card>

  <el-dialog v-model="dialogVisible" title="注册" width="30%" class="loginBox">
    <span>请输入账号密码</span>
    <template #footer>
      <span class="dialog-footer">
        <div class="loginUser">
          <label for="username">账号：</label
          ><input type="text" placeholder="username" v-model="registerName" />
        </div>
        <div class="loginWord">
          <label for="password">密码：</label
          ><input
            type="password"
            placeholder="password"
            v-model="registerPass"
          />
        </div>
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="register">确定注册</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import Particles from "../../components/content/particles/Particles.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { loginLocalStorage } from "../../utils/useLocalStorage.ts";
import { number } from "echarts/core";
import { encrypt } from "../../utils/cryptots.ts"; //加密
import { on } from "events";
import router from "../../router";

export default defineComponent({
  name: "Login",
  components: { Particles },

  setup() {
    const dialogVisible: Ref<Boolean> = ref(false);
    const userStorage = loginLocalStorage;
    // 登录绑定的账号密码
    const username: Ref<string> = ref("");
    const password: Ref<string> = ref("");

    // 注册时的账号密码
    const registerName: Ref<string> = ref("");
    const registerPass: Ref<string> = ref("");

    // 登录
    const userLogin = () => {
      let userData = userStorage().getItem("USERSDATA");
      let flag: boolean = false;
      if (username.value.length < 6 || username.value.length > 18) {
        ElMessage.error("用户名的有效长度为：6-18");
      } else if (password.value.length < 6 || password.value.length > 18) {
        ElMessage.error("密码的有效长度为：6-18");
      } else {
        let loginName = encrypt(username.value); //获得加密后的字符串
        let loginWord = encrypt(password.value);
        if (userData !== null) {
          console.log(userData);
          Object.keys(userData).forEach((item) => {
            console.log(loginName, item);
            if (item === loginName && userData[item][0] === loginWord) {
              userStorage().setItem("USERSDATA", item, [loginWord, "true"]); //把匹配到的那条用户信息的改为true，表示正在浏览
              flag = true;
            }
          });
        }
        console.log(flag, "flag");
        if (flag) {
          ElMessage.success("登录成功");
          router.push("home");
        } else {
          ElMessage.error("登录失败");
        }
      }
    };

    // 注册
    const register = () => {
      if (registerName.value.length < 6 || registerName.value.length > 18) {
        ElMessage.error("用户名的有效长度为：6-18");
      } else if (
        registerPass.value.length < 6 ||
        registerPass.value.length > 18
      ) {
        ElMessage.error("密码的有效长度为：6-18");
      } else {
        let userName: string = encrypt(registerName.value); //加密后的用户名
        let passWord: string = encrypt(registerPass.value); //加密后的密码
        // 查看是否重复注册
        let userData = userStorage().getItem("USERSDATA");
        let flag: boolean = true; //用于判断用户名是否重复
        if (userData !== null) {
          //如果userData不为空
          console.log(userName);
          console.log(Object.keys(userData));
          Object.keys(userData).forEach((item) => {
            if (item === userName) {
              flag = false;
              ElMessage.error("该用户名已被注册");
            }
          });
        }
        if (flag) {
          userStorage().setItem("USERSDATA", userName, [passWord, "false"]);
          ElMessage.success("注册成功");
          dialogVisible.value = false;
        }
      }
    };

    onMounted(() => {
      // 开始登录前把所有用户的浏览状态改为false
      let userData = userStorage().getItem("USERSDATA");
      if (userData !== null) {
        Object.keys(userData).forEach((item) => {
          userStorage().setItem("USERSDATA", item, [
            userData[item][0],
            "false",
          ]);
        });
      }
    });

    return {
      dialogVisible,
      username,
      password,
      registerName,
      registerPass,
      register,
      userLogin,
    };
  },
});
</script>

<style scoped lang='less'>
input {
  outline: none;
  height: 35px;
  width: 260px;
  padding-left: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 16px;
}
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 300px;
  z-index: 2;
  opacity: 0.6;
  border-radius: 30px;
  h3 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    font-family: "yuan";
  }

  .username,
  .password {
    display: flex;
    justify-content: space-around;
    margin: 30px;
    label {
      line-height: 35px;
      font-size: 18px;
      font-family: "yuan";
    }
  }
  .btn {
    position: relative;
    padding-top: 10px;
    button {
      position: absolute;
      top: 0px;
      width: 60px;
      height: 40px;
      background-color: skyblue;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
      font-family: "yuan";
    }
    .btn1 {
      left: 25%;
    }
    .btn2 {
      left: 60%;
    }
  }
}
.loginBox {
  position: absolute;
  height: 40%;
  z-index: 3;
}
.loginUser,
.loginWord {
  display: flex;
  justify-content: space-around;
  margin: 30px;
  label {
    line-height: 35px;
    font-size: 18px;
    font-family: "yuan";
  }
}
.loginUser {
  margin-top: -20px;
}
</style>