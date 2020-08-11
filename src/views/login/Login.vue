<template>
  <div class="login">
    <el-tabs class="Tavs" tab-position="left" type="border-card" text-align="center">
      <!-- 登入模块 -->
      <el-tab-pane label="登录">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="50px"
          class="demo-loginForm"
        >
          <el-form-item prop="LoginPhone">
            <el-input
              class="el_text"
              placeholder="请输入手机号码"
              prefix-icon="el-icon-mobile-phone"
              v-model="loginForm.LoginPhone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <el-input
              class="el_text"
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.Password"
            ></el-input>
          </el-form-item>
          <el-button type="text">忘记密码？</el-button>
          <el-form-item>
            <el-button type="primary" round @click="submitForm">登入</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册">
        <el-form label-width="80px">
          <div class="Radiodiv">
            <el-radio label="个人注册"></el-radio>
            <el-radio label="企业注册"></el-radio>
          </div>
          <el-form-item>
            <el-input class="Linput" type="text" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="Linput" type="text" placeholder="请输入短信验证码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="Linput" type="password" placeholder="请设置6-20位数字和字母组合的密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="Linput" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="Linput" type="text" placeholder="请输入图形验证码"></el-input>
            <sidentify :identifyCode="identifyCode"></sidentify>
          </el-form-item>
          <div class="Radiodiz">
            <el-radio class="radioA" label="我已阅读并同意"></el-radio>
            <a href>用户服务协议</a>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import sidentify from "../../components/identify";
import { WebSreverLogins } from "../../network/login";
import md5 from 'js-md5'
export default {
  components: {
    sidentify,
  },
  data() {
    // 登入手机号判断纯数字
    const isNum = (rule, value, callback) => {
      const age = /^[0-9]*$/;
      if (!age.test(value)) {
        callback(new Error(""));
      } else {
        callback();
      }
    };

    // 登入密码判断6-20位字母和数字组成
    const isPwd = (rule, value, callback) => {
      const age = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!age.test(value)) {
        callback(new Error(""));
      } else {
        callback();
      }
    };
    return {
      //  登入数据
      loginForm: {
        LoginPhone: "",
        Password: "",
      },
      identifyCode: "",
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",

      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        //  登入账号验证
        LoginPhone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
          {
            message: "手机号格式错误",
            trigger: "blur",
            validator: isNum,
          },
        ],

        //  登入密码验证
        Password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码必须是6-20位数字和字母的组合",
            trigger: "blur",
            validator: isPwd,
          },
        ],
      },
      verifyCode: null,
    };
  },

  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    // 登入
    submitForm() {
      // 验证
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return;

        // 调用接口验证是否登录成功
        const { data: res } = await WebSreverLogins(this.loginForm);

        if (res.Code !== 200) return this.$message("登录失败");

        // 登录成功！
        this.$message({ message: "登录成功！", type: "success" });

         // //将token值存入缓存中
         window.sessionStorage.setItem("token", res.Data.token);

        // 页面跳转
        this.$router.replace("/welcome");
      });
    },
  },
};
</script>
 
 
<style>
.login {
  width: 700px;
  margin: 100px auto;
}

/* Cars卡片样式 */
.Tavs {
  height: 500px;
}

/* 登入界面样式 */
.demo-loginForm {
  margin: 100px auto;
}

/* 登入按钮  */
.demo-loginForm button {
  width: 400px;
  height: 40px;
}

/* 登入文本框间隔 */
.demo-loginForm .el_text {
  margin-left: -20px;
}

.Linput {
  width: 60%;
  left: auto;
}
.radioA {
  font-size: 10px;
}
.el-input {
  font-size: 14px;
  display: block;
}
#s-canvas {
  float: left;
  margin-left: 350px;
}
</style>
