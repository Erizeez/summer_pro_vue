<template>
    <el-container>
        <el-main class="el-main-1">
            
            <!-- <el-row class="delete-btn" v-if="brouseMode==false">
                <el-button class="delete-btn-part" circle type="success" @click="deleteMode" v-if="!isDelete" icon="el-icon-refresh-left" style="float:right"></el-button>
                <el-button class="delete-btn-part" round @click="deleteMode" v-if="isDelete" style="float:right">取消</el-button>
                <el-button class="delete-btn-part" round type="success" @click="deleteAll" v-if="isDelete" style="float:right;margin-right: 5px;">确认删除
                </el-button>
            </el-row> -->

            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="title-div">
                        <p class="titleP">回收站</p>
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
                            <el-col :span="6">
                                <div>
                                    <span class="tableTitle">修改时间</span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div>
                                    <span class="tableTitle">删除 / 查看</span>
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
                            <el-col :span="6">
                                <div>
                                    <span class="tablePart">{{item.lastTime}}</span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div>
                                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteDoc(item.id, i)"></el-button>
                                    <el-button type="success" icon="el-icon-refresh-left" circle @click="recoverDoc(item, i)"></el-button>
                                </div>
                            </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        </el-col>
                        <el-col style="width: 20%; margin: -50px 0px 50px 0px;left:0px;" :span="5" v-if="brouseMode==false" v-for="(item,index) in doclist" :key="item.id">
                            <el-card :span="5" :body-style="{ padding: '0px' }" shadow="hover" class="card-box-s">
                                <img src="../../assets/home/card-bg.jpg" class="image"
                                    style="width: 100%; height:200px; display: block">
                                <div style="padding: 14px;">
                                    <div style="text-align: center; margin-bottom: 5%;">{{item.title}} </div>
                                    <div class="bottom clearfix">
                                        <div v-if="!isDelete" style="">
                                            <el-button size="small" type="danger" style="float: left;  margin-bottom: 5%;" round plain class="button" @click="deleteDoc(item.id, i)">彻底删除
                                            </el-button>

                                            <el-button size="small" type="success" style="float: right;" round plain class="button" icon="el-icon-refresh-left"
                                                @click="recoverDoc(item, i)">复原
                                            </el-button>
                                        </div>
                                        <el-button type="danger" icon="el-icon-delete" circle
                                            v-if="isDelete&&deleteIndex[index].show" @click="deleteMark(index)"></el-button>
                                        <el-button icon="el-icon-refresh-left" circle v-if="isDelete && !deleteIndex[index].show"
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
        brouseMode: false,
        Doc:{
            id:'',
            createId:'',
            createTime:'',
            lastTime:'',
            text:'',
            status:'',
            title:'',
            intro:'',
            isedit:''
        }
      }
    },
    created() {
      this.gettrashDoc();
    },
    methods:{
      gettrashDoc(){
        var userId = localStorage.getItem('userid');

        this.$http.get('/doc/trash?accountId='+userId).then(res =>{
          console.log(res);
          if(res.status !== 200) return this.$message.error('获取失败');
          this.doclist = res.data;
        })
      },
      deleteDoc(id, i){
        this.Doc.id = id;
        this.$http.post('/doc/gototrash/delete', this.Doc).then(res=>{
            console.log(res);
            if(res.data === "success"){
                this.doclist.splice(i, 1);
                this.$message.success("彻底删除成功");
                this.gettrashDoc();
            }
            else{
                this.$message.error("彻底删除失败");
                this.gettrashDoc();
            }
        })
      },
      todoc(id){
        this.$router.push({
          path:'/trashtext',
          query:{
            textid:id
          }
        });
      },
      recoverDoc(item,index){
        this.$http.post('/doc/recover', item).then(res =>{
          console.log(res);
          if(res.data !== 'success') return this.$message.error("复原失败");
          this.$message.success('复原成功');
          this.doclist.splice(index, 1);
          item.status = 0;
        })
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
        min-height: 800px;
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
      width: 30%;
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
