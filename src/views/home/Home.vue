<template>
  <!-- 首页信息  -->

  <div class="home">
    <!-- Carousel 走马灯 -->
    <el-carousel :interval="3000" arrow="always" height="490px">
      <el-carousel-item v-for="item in dataimg" :key="item.id">
        <div class="grid-content">
          <div>
            <img :src="item.src" width="100%" height="490px" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- icon 图标 -->
    <div class="demo">
      <div class="inner">
        <div class="shuoming">
          <ul>
            <li class="icon_1">
              <strong>放款快</strong>
              <p>最快1分钟到账</p>
            </li>
            <li class="icon_2">
              <strong>利率低</strong>
              <p>利率超级低</p>
            </li>
            <li class="icon_3">
              <strong>额度高</strong>
              <p>最高50万额度</p>
            </li>
            <li class="icon_4">
              <strong>门槛低</strong>
              <p>凭手机就能借款</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 推荐项目 -->
    <div class="recommend">
      <div class="reco_code">
        <div>
          <h1>推荐项目</h1>
        </div>
        <div style="width:80%; margin:0px auto">
          <template>
            <el-carousel :interval="4000" type="card" height="600px">
              <el-carousel-item
                v-for="item in 6"
                :key="item"
                style="width:500px; margin-left:100px"
              >
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </template>
        </div>
      </div>
    </div>

    <!-- 新闻公告 -->
    <div class="demo">
      <div class="inner">
        <el-row :gutter="10">
          <el-col :span="10">
            <h2>公司新闻</h2>
            <el-divider></el-divider>
            <ul>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="10">
            <h2>官方公告</h2>
            <el-divider></el-divider>
            <ul>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
              <li>
                柳州金控2018年5月运营月报
                <span>2018-06-15</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Carousel 走马灯 加载图片
      dataimg: [
        {
          src: require("../../assets/img/W020191105326954358817.jpg"),
          id: 1,
        },
        {
          src: require("../../assets/img/W020200619863788747818.jpg"),
          id: 2,
        },
        {
          src: require("../../assets/img/W020200628830604400555.jpg"),
          id: 3,
        },
      ],
    };
  },
};
</script>
<style>
.home .demo {
  width: 100%;
  display: flex; /*设置为flex布局*/
  justify-content: center; /*水平居中*/
  align-items: center; /*垂直居中*/
}
.inner {
  width: 60%;
  font-size: 14px;
}
.shuoming li {
  float: left;
  width: 170px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 70px auto;
  padding-left: 70px;
  text-align: center;
}
li {
  list-style-type: none;
  vertical-align: bottom;
}
.shuoming .icon_1 {
  background-image: url("../../assets/img/iconHomeimg/index1.png");
}
.shuoming .icon_2 {
  background-image: url("../../assets/img/iconHomeimg/index2.png");
}
.shuoming .icon_3 {
  background-image: url("../../assets/img/iconHomeimg/index3.png");
}
.shuoming .icon_4 {
  background-image: url("../../assets/img/iconHomeimg/index4.png");
}

.recommend {
  background: url("../../assets/img/iconHomeimg/yumaoyumaobeijingjianyuehuise-38226077_3.jpg")
    no-repeat;
  background-size: cover;
  height: 800px;
}

.reco_code {
  height: 140px;
}
/* 卡片化走马灯样式 */
.el-carousel__item h3 {
  color: white;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
}

.el-divider--horizontal {
  height: 2px;
}
</style>
