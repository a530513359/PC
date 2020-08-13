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
          <el-form-item>
            <el-button type="text">忘记密码？</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="submitForm">登入</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!--注册模块-->
      <el-tab-pane label="注册" status-icon text-align="center">
        <!--按钮切换-->
        <div class="Radiodiv">
          <el-radio v-model="register.Utype" label="个人用户" ></el-radio>
          <el-radio v-model="register.Utype" label="企业用户" ></el-radio>
        </div>

        <!--注册-->
        <el-form
          :model="register"
          status-icon
          :rules="ruleses"
          ref="register"
          label-width="80px"
          v-show="isshows"
        >
          <el-form-item prop="LoginPhone">
            <el-input
              class="Linput"
              v-model="register.LoginPhone"
              type="text"
              placeholder="请输入手机号"
              v-on:input="Domjudge"
              @blur="verify()"
              prefix-icon="el-icon-mobile-phone"
            ></el-input>
          </el-form-item>

          <el-form-item prop="sidentify">
            <el-input
              class="imgput"
              v-model="register.sidentify"
              type="text"
              placeholder="请输入图形验证码"
              v-on:input="Domjudge"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="submitForm('register')"
            ></el-input>
            <a @click="refreshCode()">
              <sidentify :identifyCode="identifyCode"></sidentify>
            </a>
          </el-form-item>

          <el-form-item prop="messages">
            <el-input
              class="Linput"
              v-model="register.messages"
              type="password"
              placeholder="请输入短信验证码"
              v-on:input="Domjudge"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>

          <el-form-item prop="Password">
            <el-input
              class="Linput"
              v-model="register.Password"
              type="password"
              placeholder="请设置6-20位数字和字母组合的密码"
              v-on:input="Domjudge"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwdagain">
            <el-input
              class="Linput"
              v-model="register.pwdagain"
              type="password"
              placeholder="请再次输入密码"
              prefix-icon="el-icon-lock"
              v-on:input="Domjudge"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitregister" :disabled="disabled" round>注册</el-button>
          </el-form-item>
        </el-form>

        <div class="Radiodiz">
          <a href>《用户服务协议》</a>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      text-align="center"
    >
      <span style="color:#67C23A">注册成功！</span>
      <br />
      <span>为保障资金安全,请开通资金存管账户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refresh" round>稍后开通</el-button>
        <el-button type="warning" round @click="refresh">立即开通</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import sidentify from "../../components/identify";

import {
  WebSreverLogins,
  WebSreverRegisters,
  WebSreverVerifys,
} from "../../network/login";
import md5 from "js-md5";
export default {
  components: {
    sidentify,
  },
  inject: ["reload"],
  data() {
    //登录验证
    // 登入手机号判断纯数字
    const isNum = (rule, value, callback) => {
      const age = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!age.test(value)) {
        callback(new Error(""));
      } else {
        callback();
      }
    };

    // 登入密码判断6-20位字母和数字组成
    const isPwd = (rule, value, callback) => {
      const age = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (!age.test(value)) {
        callback(new Error("密码6-20位字母和数字组成!"));
      } else {
        callback();
      }
    };
    //注册验证
    //注册手机号验证
    const istel = (rule, value, callback) => {
      const age = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!age.test(value)) {
        callback(new Error("手机号码格式错误"));
      } else if (value.length < 11) {
        callback(new Error("请输入11位数手机号"));
      }
    };
    //注册密码验证
    const pwdCheck = async (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (value.length < 6) {
        return callback(new Error("密码不能少于6位！"));
      } else if (value.length > 20) {
        return callback(new Error("密码最长不能超过20位！"));
      } else if (!reg.test(value)) {
        return callback(new Error("密码输入有误，请检查格式是否正确！"));
      } else {
        callback();
      }
    };
    // 重复密码验证
    const pwdAgainCheck = async (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error("密码不能少于6位！"));
      } else if (value.length < 1) {
        return callback(new Error("重复密码不能为空！"));
      } else if (this.register.Password != this.register.pwdagain) {
        return callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };

    //判断图形验证码是否输入正确
    const imgidntify = (rule, value, callback) => {
      if (value.length < 1) {
        return callback(new Error("请输入图形验证码"));
      } else if (this.register.sidentify != this.identifyCode) {
        return callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      //弹出层
      dialogVisible: false,
      // 个人/企业
      isshow: false,
      isshows: true,
      //  登入数据
      loginForm: {
        LoginPhone: "",
        Password: "",
      },
      identifyCode: "",
      identifyCodes: "123456789abcdefghjkmnpqrstuvwxyz",

      //按钮禁用
      disabled: true,
      //单选框默认 个人注册
      //个人注册表单
      register: {
        Utype: "个人用户",
        LoginPhone: "",
        messages: "",
        Password: "",
        pwdagain: "",
        sidentify: "",
      },
      //登入验证
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
      ruleses: {
        //验证注册电话号码
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
        //验证密码
        Password: [{ required: true, validator: pwdCheck, trigger: "blur" }],
        // 重复密码
        pwdagain: [
          { required: true, validator: pwdAgainCheck, trigger: "blur" },
        ],
        //图形验证码
        sidentify: [{ required: true, validator: imgidntify, trigger: "blur" }],
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
      console.log(this.identifyCode);
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
      this.$refs.loginForm.validate(async (valid) => {
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

    // 注册按钮能否使用
    Domjudge() {
      this.disabled = true;
      if (
        this.register.tel != "" &&
        this.register.telV != "" &&
        this.register.pwd != "" &&
        this.register.pwdagain != "" &&
        this.register.imgV != "" &&
        this.register.messages != ""
      ) {
        this.disabled = false;
      }
    },
    //注册
    submitregister() {
      // 调用接口验证是否注册成功
      console.log(this.register);
      this.$refs.register.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await WebSreverRegisters(this.register);

        console.log(res);
        if (res !== 1) return this.$message("注册失败");

        this.dialogVisible = true;
        // 注册成功！
       
        
      });
    },

    async verify() {
      const { data: res } = await WebSreverVerifys(this.register.LoginPhone);
      if (res !== 0) {
        this.register.LoginPhone = "";
        return this.$message({ message: "手机号已被注册", type: "success" });
      }
    },
    //注册成功弹出
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
         
          this.reload();
        })
        .catch((_) => {});
    },
    refresh(){
      this.dialogVisible=false;
      this.reload();
    }
   
  },
};
</script>
 
 
<style>
body {
  background-color: #409eff;
}
.login {
  width: 700px;
  margin: 100px auto;
}

/* Cars卡片样式 */
.Tavs {
  height: 450px;
  margin-top: 80px;
}

/* 登入界面样式 */
.demo-loginForm {
  margin: 100px auto;
}

/* 登入按钮  */
.demo-loginForm button {
  width: 200px;
  height: 40px;
}

/* 登入文本框间隔 */
.demo-loginForm .el_text {
  margin-left: -20px;
}

.el-form-item__content {
  line-height: 0px;
  position: relative;
  font-size: 15px;
}
.login {
  width: 500px;
  margin: 0 auto;
}
.Radiodiv {
  margin-left: -120px;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 20px;
}
.Linput {
  margin-left: -80px;
  width: 100%;
  left: auto;
}
.loginput {
  width: 60%;
}
.el-input__inner {
  font-size: x-small;
  height: 35px;
  padding: 0;
}
.el-input {
  font-size: 14px;
  display: block;
}
#s-canvas {
  float: left;
  margin-top: -40px;
  margin-left: 120px;
}
a {
  color: sandybrown;
  font-size: 14px;
  text-decoration: none;
}
.reg {
  width: 200px;
  height: 36px;
}
.imgput {
  margin-left: -80px;
  width: 60%;
  left: auto;
}
.loginstyle {
  margin-left: 150px;
  color: sandybrown;
}
</style>
