<template>
  <div class="msg_container">
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane>
          <span slot="label" class="paneTitle">通知消息</span>
          <el-row :gutter="20">
            <el-col :offset="2" :span="4">
                <div>
                    <span class="tableTitle">序号</span>
                </div>
            </el-col>
            <el-col :span="13">
                <div>
                    <span class="tableTitle">通知标题</span>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <span class="tableTitle">操作</span>
                </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
            <div style="overflow: hidden;" v-for="(item,i) in msg_data1" :key="i" class="author-title">
                <el-row :gutter="20">
                    <el-col :offset="2" :span="4">
                        <div>
                            <span class="tablePart">{{i+1}}</span>
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <div>
                            <span class="tablePart">{{item.title}}</span>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div style="display:block;margin:0 auto">
                            <el-button type="info" v-if="item.haveread === 1" @click="showcontent(item)">已读</el-button>
                            <el-button type="primary" v-else-if="item.haveread === 0" @click="showcontent(item)">查看</el-button>
                            <el-button type="danger" @click="deleteMsg(item)">删除</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </div>
          </el-col>
  
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label" class="paneTitle">团队消息</span>
          <el-row :gutter="20">
              <el-col :offset="2" :span="4">
                  <div>
                      <span class="tableTitle">序号</span>
                  </div>
              </el-col>
              <el-col :span="13">
                  <div>
                      <span class="tableTitle">通知标题</span>
                  </div>
              </el-col>
              <el-col :span="3">
                  <div>
                      <span class="tableTitle">查看</span>
                  </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>

            <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
              <div style="overflow: hidden;" v-for="(item,i) in msg_data2" :key="i" class="author-title">
                  <el-row :gutter="20">
                      <el-col :offset="2" :span="4">
                          <div>
                              <span class="tablePart">{{i+1}}</span>
                          </div>
                      </el-col>
                      <el-col :span="13">
                          <div>
                              <span class="tablePart">{{item.title}}</span>
                          </div>
                      </el-col>
                      <el-col :span="3">
                          <div>
                              <el-button type="info" style="display:block;margin:0 auto" v-if="item.haveread === 1" @click="showcontent1(item)">已读</el-button>
                              <el-button type="primary" style="display:block;margin:0 auto" v-else-if="item.haveread === 0" @click="showcontent1(item)">查看</el-button>
                          </div>
                      </el-col>
                  </el-row>
                  <el-divider></el-divider>
              </div>
            </el-col>
          
          <!-- <el-table
            :data="msg_data2" border stripe
            style="width: 880px; left: 10%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="title" label="通知标题" width="650" style="text-align: center"></el-table-column>
            <el-table-column prop="content" label="查看" width="180">

              <template slot-scope="scope">
                <el-button type="info" style="display:block;margin:0 auto" v-if="scope.row.haveread === 1" @click="showcontent1(scope.row)">已读</el-button>
                <el-button type="primary" style="display:block;margin:0 auto" v-else-if="scope.row.haveread === 0" @click="showcontent1(scope.row)">查看</el-button>

              </template>
            </el-table-column> -->

          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true">
      <span>{{this.dialogcontent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%"
      :append-to-body="true">
      <span>{{this.dialogcontent1}}</span>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="refuse(teamdia)">拒 绝</el-button>
                    <el-button type="primary" @click="accept(teamdia)">接 受</el-button>
                  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'left',
        dialogVisible: false,
        dialogVisible1: false,
        msg_data: [],
        msg_data1:[],
        msg_data2:[],
        dialogcontent:'',
        dialogcontent1:'',
        teamdia:''
      }
    },
    created() {
      this.getmessage();
    },
    methods: {
      getmessage() {
        this.msg_data1=[];
        this.msg_data2=[];
        this.$http.get('/msg/getmsg?accountId=' + localStorage.getItem('userid')).then(res => {
          console.log(res);
          this.msg_data = res.data;
          for(var i=0, len=this.msg_data.length; i<len; i++){
            if(this.msg_data[i].type === 0){
              this.msg_data1.push(this.msg_data[i]);
            }
            else{
              this.msg_data2.push(this.msg_data[i]);
            }
          }
          console.log(this.msg_data2);
        })
      },
      showcontent(item){
        console.log(item);
        this.dialogVisible=true;
        this.dialogcontent=item.content;
        console.log(this.dialogcontent+'hhhh');
        item.haveread=1;
        this.$http.post('/msg/haveread', item).then(res =>{
          this.$emit('ifMessage');
        })
      },
      showcontent1(item){
        console.log(item);
        this.dialogVisible1=true;
        this.dialogcontent1=item.content;
        item.haveread=1;
        this.teamdia = item;
        this.$http.post('/msg/haveread', item).then(res =>{
          this.$emit('ifMessage');
        })
      },
      accept(item){
        this.dialogVisible1 = false;
        this.$http.post('/msg/agree', item).then(res =>{
          console.log(res);
          if(res.data === 'success'){
            this.$message.success('加入队伍成功');
            this.getmessage();
            this.$emit('ifMessage');
          }
          else{
            this.$message.error('加入队伍失败')
          }
        })
      },
      refuse(item){
        this.dialogVisible1 = false;
        this.$http.post('/msg/refuse', item).then(res =>{
          if(res.data==='success'){
            this.$message.success('拒绝成功！')
          }
          else this.$message.error('拒绝失败！')
        })
      },
      deleteMsg(item){
        this.$http.get('/msg/delete?MessageId='+item.id).then(res=>{
          if(res.data=="success"){
            this.$message.success('删除成功！');
            this.getmessage();
          }
          else{
            this.$message.error('删除失败！');
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box-card {
      box-shadow: 0px 0px 12px 6px rgba(0, 0, 0, 0.2), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 30px;
      min-height: 600px;
      position: absolute;
      left: 50%;
      top: 100px;
      transform: translate(-50%, 0%);
      transition-duration: 0.3s;
      width: 90%;;
  }
  .box-card:hover {
      box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.3), inset 0px -2px 15px 2px rgba(255, 255, 255, 0.7);
      background-color: rgba(255, 255, 255, 0.4);
      transition-duration: 0.3s;
  }
  .paneTitle{
        font-size: 20px;
        color: #888;
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
