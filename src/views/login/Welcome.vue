<template>
  <div id="Welcomme">
    <div class="nav">
      <!-- 顶部 -->
      <div class="demo">
        <div class="inner">
          <span>客服专线：0772-2832090 服务时间：工作日8：00-18:00</span>
          <span>
            <router-link to="/Information">登入</router-link>
            <router-link to="/Information">注册</router-link>
          </span>
        </div>
      </div>

      <!-- 导航上部 -->
      <div class="demo">
        <div class="inner">
          <el-row>
            <el-col :span="10">
              <img src="../../assets/img/163304605.png" style="margin:5px" />
            </el-col>
            <el-col :span="14">
              <!-- mode属性可以使导航菜单变更为水平模式 -->
              <!-- active-text-color当前激活菜单的文字颜色 -->
              <!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
              <el-menu
                default-active="/home"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                active-text-color="red"
                router
              >
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/Information">信息披露</el-menu-item>
                <el-menu-item index="/invest">我要投资</el-menu-item>
                <el-menu-item index="/Borrowing">我要借贷</el-menu-item>
                <el-menu-item index="/account">我的账户</el-menu-item>
                <el-menu-item index="/about">关于我们</el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="line">
        <router-view />
      </div>

      <!-- Backtop 回到顶部 -->
      <!-- 计算机 -->
      <template>
        <el-backtop target=".nav" :bottom="150">
          <el-tooltip class="item" effect="dark" content="计算机" placement="left-start">
            <div
              @click="ClickComputer()"
              style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                    }"
            >
              <i class="el-icon-edit-outline"></i>
            </div>
          </el-tooltip>
        </el-backtop>

        <!-- 回到顶部 -->
        <el-backtop target=".nav" :bottom="100">
          <el-tooltip class="item" effect="dark" content="回到顶部" placement="left-start">
            <div
              style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                    }"
            >UP</div>
          </el-tooltip>
        </el-backtop>
      </template>
      <!-- 点击计算机弹出层 -->
      <el-dialog
        class="dialogMoney"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="收益计算机">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item prop="investMoney">
                <el-input placeholder="请输入投资金额" v-model="ruleForm.investMoney"></el-input>
                <span>万元</span>
              </el-form-item>
              <el-form-item prop="annualised">
                <el-input placeholder="请输入预期年化收益率" v-model="ruleForm.annualised"></el-input>
                <span>%</span>
              </el-form-item>
              <el-form-item prop="investing">
                <el-input placeholder="请输入投资期限" v-model="ruleForm.investing"></el-input>
                <span>天</span>
              </el-form-item>
              <el-button class="btn_expected" type="danger" @click="submitForm('ruleForm')">计算预期收益</el-button>
              <p>
                预期收益:
                <span>{{(ruleForm.expected).toFixed(2)}}</span> 元
              </p>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="借款计算机">
            <el-form :model="costForm" :rules="costrules" ref="costForm" class="demo-costForm">
              <el-form-item prop="borrowMoney">
                <el-input placeholder="请输入借款金额" v-model="costForm.borrowMoney"></el-input>
                <span>万元</span>
              </el-form-item>
              <el-form-item prop="lendingRate">
                <el-input placeholder="请输入借款利率" v-model="costForm.lendingRate"></el-input>
                <span>%</span>
              </el-form-item>
              <el-form-item prop="lifeOfLoan">
                <el-input placeholder="请输入借款期限" v-model="costForm.lifeOfLoan"></el-input>
                <span>天</span>
              </el-form-item>
              <el-button class="btn_expected" type="danger" @click="countForm('costForm')">计算借款利息</el-button>
              <p>
                借款利息:
                <span>{{(costForm.interest).toFixed(2)}}</span> 元
              </p>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 判断投资金额纯数字
    const isNum = (rule, value, callback) => {
      const age = /^[0-9]*$/;
      if (!age.test(value)) {
        callback(new Error(""));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      tabPosition: "left",
      // 收益计算机值
      ruleForm: {
        investMoney: "", //  投资金额
        annualised: "", //  预期年化收益率
        investing: "", //  投资期限
        expected: 0.0, //  预期收益
      },
      //  借款计算机
      costForm: {
        borrowMoney: "", //  借款金额
        lendingRate: "", //  借款利率
        lifeOfLoan: "", //  借款期限
        interest: 0.0, //  借款利息
      },
      // 收益计算机判断
      rules: {
        //  投资金额判断正确
        investMoney: [
          {
            required: true,
            message: "请输入投资金额",
            trigger: "blur",
          },
          {
            message: "投资金额需为数字",
            trigger: "blur",
            validator: isNum,
          },
        ],
        //  预期年化收益率判断正确
        annualised: [
          {
            required: true,
            message: "请输入预期年化收益率",
            trigger: "blur",
          },
          {
            message: "预期年化收益率需为数字",
            trigger: "blur",
            validator: isNum,
          },
        ],
        //  投资期限判断正确
        investing: [
          {
            required: true,
            message: "请输入投资期限",
            trigger: "blur",
          },
          {
            message: "投资期限需为数字",
            trigger: "blur",
            validator: isNum,
          },
        ],
      },
    };
  },
  methods: {
    ClickComputer() {
      this.dialogVisible = true;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //  计算预期收益
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //预期收益=投资金额*预期年化收益率*投资期限/365天
          this.ruleForm.expected =
            (this.ruleForm.investMoney *
              this.ruleForm.annualised *
              this.ruleForm.investing) /
            365;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  计算借款利息
    countForm(costForm) {
      this.$refs[costForm].validate((valid) => {
        if (valid) {
          //借款利息=借款金额*借款利率*借款期限/365天
          this.costForm.interest =
            (this.costForm.borrowMoney *
              this.costForm.lendingRate *
              this.costForm.lifeOfLoan) /
            365;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.nav {
  height: 100vh;
  overflow-x: hidden;
}
#Welcomme a {
  text-decoration: none;
}
/* 顶部样式 */
.demo:nth-of-type(1) {
  width: 100%;
  height: 40px;
  display: flex; /*设置为flex布局*/
  justify-content: center; /*水平居中*/
  align-items: center; /*垂直居中*/
  background: slategray;
  color: floralwhite;
}
.inner {
  width: 60%;
  font-size: 12px;
}
.inner:nth-of-type(1),
span:nth-of-type(2) {
  float: right;
}

/* 上部导航样式 */
.demo:nth-of-type(2) {
  width: 100%;
  display: flex; /*设置为flex布局*/
  justify-content: center; /*水平居中*/
  align-items: center; /*垂直居中*/
}

/* 计算机弹出层样式 */
.input-with-select {
  width: 300px;
  margin: 10px;
}

.dialogMoney .el-input {
  width: 400px;
}

.dialogMoney .btn_expected {
  width: 440px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(255, 255, 255);
}

.dialogMoney p {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.dialogMoney p span {
  color: brown;
}
</style>

