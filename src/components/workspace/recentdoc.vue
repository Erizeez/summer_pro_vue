<template>
    <el-container>
        <el-main class="el-main-1">

            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="title-div">
                        <p class="titleP">最近浏览个人文档</p>
                    </div>
                </el-col>
                <el-col class="title-col" :span="12">
                    <el-radio-group class="btn-change" v-model="brouseMode" style="float:right;">
                        <el-radio-button :label="false">平铺</el-radio-button>
                        <el-radio-button :label="true">列表</el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="el-row-2">
                <div class="info_box">
                    

                    <el-row :gutter="50" style="padding-left: 50px; margin-top: 20px; overflow: hidden;position: relative;">
                        <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
                        <div style="overflow: hidden;" v-if="brouseMode==true" class="author-title">
                            <el-row :gutter="20">
                            <el-col :span="4">
                                <div>
                                    <span class="tableTitle">序号</span>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div>
                                    <span class="tableTitle">文档名</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <span class="tableTitle">创建时间</span>
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div>
                                    <span class="tableTitle">修改时间</span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div>
                                    <span class="tableTitle">查看</span>
                                </div>
                            </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        </el-col>
                        <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
                        <div style="overflow: hidden;" v-for="(item,i) in doclist" :key="i" v-if="brouseMode==true" class="author-title">
                            <el-row :gutter="20">
                            <el-col :span="4">
                                <div>
                                    <span class="tablePart">{{i+1}}</span>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div>
                                    <span class="tablePart">{{item.title}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <span class="tablePart">{{item.createTime}}</span>
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div>
                                    <span class="tablePart">{{item.lastTime}}</span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div>
                                    <el-button type="primary" icon="el-icon-search" circle @click="todoc(item.id)"></el-button>
                                </div>
                            </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        </el-col>
                        <el-col style="width: 18%; margin: -50px 0px 20px 0px;left:0px;" :span="5" v-if="brouseMode==false" v-for="(item,index) in doclist" :key="item.id">
                            <el-card :span="5" :body-style="{ padding: '0px' }" shadow="hover" class="card-box-s">
                                <img src="../../assets/home/card-bg.jpg" class="image"
                                    style="width: 100%; height:200px; display: block">
                                <div style="padding: 14px;">
                                    <div style="text-align: center; margin-bottom: 5%;">{{item.title}} </div>
                                    <div class="bottom clearfix">
                                        <div v-if="!isDelete" >
                                            <el-button style="margin: 0px 0px 0px 20px;" type="primary" plain icon="el-icon-search" round @click="todoc(item.id)">查看文档</el-button>         
                                        </div>
                                        <el-button type="danger" icon="el-icon-delete" circle
                                            v-if="isDelete&&deleteIndex[index].show" @click="deleteMark(index)"></el-button>
                                        <el-button icon="el-icon-delete" circle v-if="isDelete && !deleteIndex[index].show"
                                            @click="deleteMark(index)"></el-button>
                                    </div>
                                </div>

                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      doclist:[],
      user:{
        id:''
      },
      brouseMode:false
    }
  },
  created() {
    this.getrecentdoc();
  },
  methods: {
    getrecentdoc(){
        var userId = window.localStorage.getItem('userid');

        console.log(typeof parseInt(userId));
        this.$http.get(`/doc/latestlist?id=`+userId).then(res =>{
          console.log(res);
          if(res.status !== 200){
          return this.$message.error('获取失败')
        }
        this.doclist = res.data.reverse();
      })
    },
    todoc(id){
      console.log(id);
      this.$router.push({
        path:'/text',
        query:{
          textid:id
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
        height: 100%;
    }
    .el-row-1{
        top: -5%;
        height: 15%;
        width: 80%;
        left: 50%;
        transform: translate(-50%, 0%);
        margin: 10px 0px 0px 0px;
    }
    .el-row-2{
        top: -5%;
        min-height: 85%;
        height: auto;
        width: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
    }
    .titleP{
        font-size: 30px;
    }
    .title-col{
        height: 100%;
    }
    .btn-change{
        position:absolute;
        top: 50%;
        transform: translate(0%, -30%);
        right: 0;
    }
    .info_box{
        width: 90%;
        height: auto;
        min-height: 400px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 30px;
        position: absolute;
        left: 50%;
        top: 0px;
        transform :translate(-50%, 0%);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        margin: 10px 0px 50px 0px;
        transition-duration: 0.5s;
    }
    .info_box:hover{
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
      transition-duration: 0.5s;
    }
    .el-main-1{
        padding: 20px 0px 100px 0px;
    }
    .delete-btn{
        position: fixed;
        right: 10%;
        bottom: 8%;
        z-index: 99;
    }
    .delete-btn-part{
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }
    .card-box-s{
        left: 50px;
        margin-top: 30px;
        border-radius: 15px;
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }
    .title-div{
      width: 55%;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: -1px -1px 6px 2px rgba(0, 0, 0, 0.1), inset 0px 0px 5px 2px rgba(255, 255, 255, 0.8);
      text-align: center;
      color: #666;
      transition-duration: 0.5s;
    }
    .title-div:hover{
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2), inset 0px 0px 3px 1px rgba(255, 255, 255, 0.7);
      transition-duration: 0.5s;
    }
    .tableTitle{
        font-size: 20px;
        font-weight: bold;
        color: #888;
    }
    .tablePart{
        font-size: 20px;
        color: #666;
    }
</style>
