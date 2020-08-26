<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-menu
          default-active="/aboutus"
          @select="handleSelect"
          active-text-color="red"
          router
          style="text-align: center"
        >
          <el-menu-item index="/mag">
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="/img">
            <span slot="title">合作机构</span>
          </el-menu-item>
          <el-menu-item index="/news">
            <span slot="title">公司新闻</span>
          </el-menu-item>
          <el-menu-item index="com">
            <span slot="title">官方公告</span>
          </el-menu-item>
          <el-menu-item index="contact">
            <span slot="title">联系方式</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="16">
        <el-tabs type="border-card">
          <router-view />
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style >
.divider1 {
  background-color: red;
}
.span2 {
  font-size: 30px;
}
.span1 {
  margin-left: 25px;
  font-size: 30px;
}
.el-col-18 {
  margin-left: 27px;
  margin-top: 100px;
}
.div5 {
  margin-left: 550px;
  margin-top: -200px;
}
p {
  font-size: 150%;
}
.el-tabs--left.el-tabs--card .el-tabs__item.is-left {
  border-left: none;
  border-right: 1px solid #e4e7ed;
  border-bottom: none;
  border-top: 1px solid #e4e7ed;
  text-align: center;
  width: 175px;
}
.divnew {
  margin-top: -42px;
  margin-left: 20px;
}
.line {
  display: inline;
}
img {
  margin-top: 80px;
}
.tb1 {
  width: 1500px;
  border-left: 200px;
  border-top: 200px;
}
</style>