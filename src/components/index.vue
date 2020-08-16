<template>
  <el-container>
    <div class="body">
      <el-row :gutter="50">
        <el-col :span="15">
          <div>
          <el-divider content-position="left">查看文档</el-divider>
          <el-row :gutter="50" style="margin-top: 40px">
            <el-col :span="7">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/home/card-bg.jpg" class="image" style="width: 100%; height:200px; display: block">
                <div style="padding: 14px;">
                  <span>文档示例</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button">进入文档</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>

            <el-col :span="7">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/home/card-bg1.jpg" class="image" style="width: 100%; height:200px; display: block">
                <div style="padding: 14px;">
                  <span>文档示例2</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button">进入文档</el-button>
                  </div>
                </div>
              </el-card>

            </el-col>

            <el-col :span="7">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/home/card-bg3.jpg" class="image" style="width: 100%; height:200px; display: block">
                <div style="padding: 14px;">
                  <span>文档示例3</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button">进入文档</el-button>
                  </div>
                </div>
              </el-card>

            </el-col>

            <el-col :span="7" class="box">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/home/card-bg4.jpg" class="image" style="width: 100%; height:200px; display: block">
                <div style="padding: 14px;">
                  <span>文档示例4</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button">进入文档</el-button>
                  </div>
                </div>
              </el-card>

            </el-col>
          </el-row>

        </div>
        </el-col>


        <el-col :span="9"><div class="grid-content bg-purple-light">
          <div class="block">
            <!--              <span class="demonstration">hh</span>-->
            <el-carousel height="300px">
              <el-carousel-item v-for="item in superURL" :key="item.id">
                <img :src="item.idView" class="image" style="height: 300px; width: 600px">
              </el-carousel-item>
            </el-carousel>
          </div>

          <div>
            <div class="block" style="margin-top: 0px">
              <el-image :src="src"></el-image>
            </div>
          </div>
        </div></el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        superURL:[
          {
            id:0,
            idView:require("../assets/home/lunbo2.png")
          },{
            id:1,
            idView: require("../assets/home/lunbo3.png")
          },{
            id:2,
            idView: require("../assets/home/lunbo4.jpeg")
          }
        ],
        src: require("../assets/home/team1.png")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body{
    margin-top: 10px;
  }
  .box{
    margin-top: 30px;
  }
</style>
