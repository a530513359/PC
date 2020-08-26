<template>
  <div style="width:100%; height:700px;">
    <el-card class="card" style="width:1200px;height:400px;margin:50px auto">
      <el-table :data="ProjectList">
        <el-table-column>
          <template slot-scope="scope">
            <div class="one">
              <div class="divname">{{scope.row.pNmae}}</div>

              <!--年收益率-->
              <div>
                <div class="yieid">
                  <span class="spanyieid">{{scope.row.ExpectedAnnualized}}%</span>
                </div>
                <div class="spanyieidlable">预期年收益率</div>
              </div>
              <!--分割线-->
              <div class="verticalBar"></div>
              <!--期限-->
              <div class="date">
                <div>
                  <div class="datenum">{{ scope.row.pTerm }}</div>
                </div>
                <div class="dateday">期限(天)</div>
              </div>
              <!--分割线-->
              <div class="verticalBar1"></div>
              <!--金额-->
              <div class="money">
                <span class="moneynum">{{ scope.row.Loanamount }}.00元</span>

                <div class="moneylable">借款金额</div>
              </div>
              <!--起息日-->
              <div>
                <div class="begin">起息日：{{scope.row.ValueDate}}</div>
              </div>
              <!--结束日-->
              <div class="end">
                <div>到息日：{{scope.row.Duedate}}</div>
              </div>
              <!--回款方式-->
              <div class="reture">
                <div>回款方式：到期一次性还本付息</div>
              </div>
              <!--投资进度-->
              <div>
                <div class="progress">
                  <div class="progresslable">投资进度</div>
                  <div class="progresswidth">
                    <el-progress :percentage="scope.row.progres" color="#f56c6c"></el-progress>
                  </div>
                </div>
              </div>
              <!--见证机构-->
              <div class="home">
                <div>见证机构：贷款之家</div>
              </div>

              <div class="two">
                <div class="balance">剩余金额:</div>
                <div class="balancenum">{{scope.row.balance}}.00元</div>
                <div class="InAmount">投资金额：</div>
                <div class="InAmountInput">
                  <el-input placeholder="请输入投资金额" v-model="InAmount" @change="prospectivecount"></el-input>
                </div>

                <div class="remind">100元起投，100元递增</div>
                <div class="yixing">
                  <i class="el-icon-error"></i>
                  投资金额需以100元起，100元递增
                </div>

                <div class="prospectivelable">预期收益：</div>
                <div class="prospective">{{prospective}}元</div>

                <div class="UA">
                  <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
                  <a href="/" class="a">《投资协议》</a>
                </div>
                <div>
                  <el-button type="danger" class="btn" round>立即投资</el-button>
                </div>
              </div>
            </div>
            <!--分割线-->
            <div class="verticalBar2"></div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { WebGetProjectList1 } from "../../network/project";
export default {
  created() {
    this.GetProjectList1();
  },
  data() {
    return {
      checked: true,
      ProjectList: [], //数据
      percentage: 10,
      InAmount: 0,
      prospective: 0.0,
    };
  },
  methods: {
    async GetProjectList1() {
      var pId = this.$route.query.id;
      const { data: res } = await WebGetProjectList1(pId);
      this.ProjectList = res.Data;
      // 投资进度判断
      if (0 < this.ProjectList[0].progres && this.ProjectList[0].progres < 1) {
        this.ProjectList[0].progres = 1;
      }
    },
    // 预期收益
    prospectivecount() {
      this.prospective =
        (this.InAmount * this.ProjectList[0].ExpectedAnnualized) / 100;
    },
  },
};
</script>
<style>
.card {
  border-color: goldenrod;
  border-width: 5px;
  border-left: 300px;
}
.el-icon-error {
  color: red;
}
.yixing {
  color: red;
  margin-left: 38px;
}
.two {
  position: relative;
  width: 400px;
  margin-left: 750px;
  margin-top: -300px;
}
.btn {
  width: 250px;
  height: 50px;
}
.one {
  width: 950px;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: orange;
  border-color: orange;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}
.a {
  color: orange;
}
.prospective {
  font-size: 15px;
  color: red;
  margin-right: 150px;
  margin-top: -23px;
}
.prospectivelable {
  font-size: 15px;
  color: gray;
  margin-right: 323px;
  margin-top: 30px;
}
.remind {
  color: red;
  font-size: 15px;
  margin-right: 37px;
}
.InAmountInput {
  width: 200px;
  margin-left: 100px;
  margin-top: -30px;
}
.InAmount {
  color: gray;
  font-size: 15px;
  margin-right: 325px;
  margin-top: 10px;
}
.balancenum {
  margin-top: -25px;
  margin-right: 130px;
}
.balance {
  color: gray;
  font-size: 15px;
  margin-top: 60px;
  margin-right: 336px;
}
.verticalBar2 {
  width: 2px;

  background: gray;
  display: inline-block;
  margin-top: -200px;
  margin-left: 300px;
  vertical-align: top;
  height: 210px;
}
.home {
  color: gray;
  margin-left: 40px;
  margin-top: -20px;
}
.progress {
  margin-top: 40px;
}
.progresslable {
  color: gray;
  margin-right: 800px;
}
.progresswidth {
  width: 300px;
  margin-left: 120px;
  margin-top: -20px;
}
.reture {
  color: gray;
  margin-left: 110px;
  margin-top: -23px;
}
.end {
  color: gray;
  margin-right: 300px;
  margin-top: -23px;
}
.verticalBar1 {
  width: 2px;
  height: 6em;
  background: gray;
  display: inline-block;
  vertical-align: top;
  margin-top: -80px;
  margin-right: 100px;
}

.verticalBar {
  width: 2px;
  height: 6em;
  background: gray;
  display: inline-block;

  vertical-align: top;
  margin-top: -84px;
  margin-right: 500px;
}
.money {
  text-align: center;
}
.moneynum {
  color: black;
  font-size: 40px;
  display: flex;
  margin-left: 460px;
  margin-top: -79px;
}
.moneylable {
  display: flex;
  font-size: 15px;
  color: gray;
  margin-left: 550px;
  margin-top: 14px;
}
.dateday {
  font-size: 15px;
  color: gray;
  margin-top: 11px;
  margin-right: 300px;
}
.datenum {
  color: black;
  font-size: 40px;
  margin-right: 300px;
  margin-top: -82px;
}


.begin {
  color: gray;
  margin-right: 720px;
  margin-top: 20px;
}
.divname {
  width: 250px;
  font-size: 30px;
  color: black;
  margin-right: 800px;
}
.spanyieid {
  display: flex;
  font-size: 40px;

  color: red;
}
.spanyieidlable {
  margin-left: -764px;
  margin-top: -34px;
  font-size: 15px;
  color: gray;
}
.yieid {
  display: flex;
  margin: 50px;
}
</style>