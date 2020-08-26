<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-table :data="ProjectList" style="width: 100%">
          <el-table-column width="200px">
            <template slot-scope="scope">
              <div class="number">{{ scope.row.pNmae }}</div>
              <div style="font-size:25px ; color: red;">
                {{ scope.row.ExpectedAnnualized }}
                <span>%</span>
              </div>
              <div style="font-size:10px ; color: gray;">预期年化收益率</div>
            </template>
          </el-table-column>

          <el-table-column width="200px">
            <template slot-scope="scope">
              <span style="font-size:25px ; color: black;">{{ scope.row.pTerm }}</span>
              <span style="font-size:15px ; color: gray;">天</span>
              <div style="font-size:10px ; color: gray;">期限</div>
            </template>
          </el-table-column>

          <el-table-column width="200px">
            <template slot-scope="scope">
              <span style="font-size:25px ; color: gray;">{{ scope.row.Loanamount }}.00</span>
              <span style="font-size:15px">元</span>
              <div style="font-size:10px ; color: gray;">借款金额</div>
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <div style="font-size:25px ; color: gray;">
                <el-progress :percentage="scope.row.progres" prop="progres"></el-progress>
              </div>
              <span style="font-size:10px ; color: gray;">投资进度</span>
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <div class="grid-content bg-purple" style="text-align:center">
                <span>
                  <el-button
                    round
                    style="width:180px"
                    class="btn1"
                    v-text="scope.row.progres==0?'预热中':scope.row.progres==100?'已满标':'立即投资'"
                    @click="addRoutes1(scope.row.pId)"
                  ></el-button>
                </span>
              </div>
            </template>
          </el-table-column>

          <el-divider content-position="right"></el-divider>
        </el-table>
      </div>
    </el-card>
    <el-pagination
      :total="total"
      layout="total,prev, pager, next"
      :page-size="limit"
      :current-page="pageIndex"
      :page-sizes="[1, 2, 5, 50]"
      style="position: static"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!--弹出订单详情-->
  </div>
</template>

<script>
import { WebGetProjectList } from "../../network/project";
export default {
  created() {
    this.GetProjectList();
  },

  data() {
    return {
      ProjectList: [], //数据
      Investment: [],
      pageIndex: 1, //当前页数
      limit: 3,
      count: 1,
      total: 1,
      btnText: "预热中",
      centerDialogVisible: false,
    };
  },

  methods: {
    async GetProjectList() {
      const { data: res } = await WebGetProjectList(this.pageIndex, this.limit);
      this.ProjectList = res.Data;
      this.total = res.totle;
      this.Investment = res.Data.Investment;
      console.log(res.Data.progres);
      if ((this.btnText = "立即投资")) {
      }
    },

    addRoutes1(id) {
    this.$router.push({
        name: "InvestDetails",
        query: {
          id: id,
        },
      });  
    },

    // 初始页currentPage、初始每页数据数pagesize
    handleSizeChange(newsize) {
      // 改变每页显示的条数
      this.PageSize = newsize;
      this.GetProjectList();
    },
    handleCurrentChange(startPage) {
      this.pageIndex = startPage;
      this.GetProjectList();
    },
  },
};
</script>
<style>
span {
  display: block；;
}
.el-table th > .cell {
  font-size: 12px;
  text-align: left;
}
.cell {
  text-align: center;
}
.number {
  font-size: 14px;
  display: -webkit-box;
  color: gray;
}
.el-pager li {
  position: static;
}
.btn1 {
  background-color: rgba(221, 0, 0, 0.8);
  color: white;
}
</style>