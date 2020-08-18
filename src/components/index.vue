<template>
  <el-container>
    <div class="wrapper">
      <div class="card-titile">
        <div class="title-text" style="font-size:40px">黑曜石百科 | 小知识</div>
        <p >
          学会如何使用「 黑曜石文档 」，找到更适合的使用场景，
          了解更多的工作方法，
          提高你的工作效率
        </p>
      </div>
  

    <el-row :gutter="50">
      <el-col :span="24">

        <el-row :gutter="50">
            <el-col :span="8">
              <el-card class="box-card" shadow="hover">
                <div>
                  <p class="card-p">黑曜石文档关于网站开始测试的公告</p>
                  <p class="card-t">黑曜石文档将于 8 月 17 日起结束开发模式并部署服务器，后续将解决更多潜在的功能bug，欢迎大家前来测试。</p>
                </div>
                <img class="card-img" src="../assets/home/lunbo1.png">
                <span class="card-span">
                  #黑曜石公告
                </span>
              </el-card>
              </el-col>
        
            <el-col :span="8">
              <el-card class="box-card" shadow="hover">
                <div>
                  <p class="card-p">黑曜石文档
                    相关使用说明<br></p>
                  <p class="card-t">点击'创建文档'开始你的文档创作；<br>
                    点击‘团队空间’开始你的团队协作；<br>
                    你还可以在个人工作台查看你的最近浏览和收藏文件；<br><br>
                    现在就开始你的黑曜石之旅吧！<br>
                    </p>
                </div>
                <img class="card-img" style="margin-top:20px" src="../assets/home/lunbo4.jpeg">
                <span class="card-span">
                  #黑曜石公告
                </span>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card class="box-card" shadow="hover">
                <div>
                  <p class="card-p">黑曜石文档工作团队</p>
                  <p class="card-t">如果有任何问题<br>欢迎致电：88888888<br>
                  或者联系邮箱：obsidianWD@126.com<br><br>
                  黑曜石文档开发团队竭诚为您服务<br>
                  
                  </p>
                </div>
                <img class="card-img" style="margin-top:20px" src="../assets/home/lunbo3.png">
                <span class="card-span">
                  #黑曜石公告
                </span>
              </el-card>
            </el-col>


         </el-row>
      </el-col>
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
  .wrapper{
    width:80%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%,-50%);
  }
  .card-titile{
    width:100%;
    flex-direction: column;
    text-align: center;
    margin: 60px 0 60px;
    color: #41464b;
  }
  .title-text{
    font-size: 20px Extra large;
    letter-spacing: 3.3px;
    margin: 0;
    color: #41464b;
  }
  .box-card{
    width: 320px;
    height: 465px;
    /* display: block; */
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.08);
    border-radius: 4px;
    border: 1px solid #eee;
    margin-right: 15px;
    margin-left: 15px;
    transition: box-shadow .2s linear;
    margin-bottom: 30px;
    padding: 13px 13px 0;
    cursor: pointer;
    box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
  }
  .card-p{
    font-size: 20px;
    line-height: 1.5;
    color: #41464b;
    margin-top: 0;
    margin-bottom: 12px;
    font-weight: 550;
  }
  .card-t{
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 1px;
    color: #676b6f;
  }
  .card-img{
    width: 318px;
    height: 200px;
    margin-top:30px;
    margin-left: -35px;
  }
  .card-span{
    line-height: 45px;
    font-size: 14px;
    letter-spacing: 1px;
    margin-left:-20px;
    color: #a5a5a5;
  }
</style>
