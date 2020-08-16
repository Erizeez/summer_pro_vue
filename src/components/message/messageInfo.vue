<template>

  <div class="msg_container">
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition">

        <el-tab-pane label="通知消息">
          <el-table
            :data="msg_data1" border stripe
            style="width: 780px; left: 10%">

            <el-table-column type="index"></el-table-column>
            <el-table-column prop="title" label="通知标题" width="600" style="text-align: center"></el-table-column>
            <el-table-column prop="content" label="查看" width="130px">

              <template slot-scope="scope">
                <el-button type="info" style="display:block;margin:0 auto" v-if="scope.row.haveread === 1" @click="showcontent(scope.row)">已读</el-button>
                <el-button type="primary" style="display:block;margin:0 auto" v-else-if="scope.row.haveread === 0" @click="showcontent(scope.row)">查看</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>

        <el-tab-pane label="团队消息">
          <el-table
            :data="msg_data2" border stripe
            style="width: 780px; left: 10%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="title" label="通知标题" width="600" style="text-align: center"></el-table-column>
            <el-table-column prop="content" label="查看" width="180">

              <template slot-scope="scope">
                <el-button type="info" style="display:block;margin:0 auto" v-if="scope.row.haveread === 1" @click="showcontent1(scope.row)">已读</el-button>
                <el-button type="primary" style="display:block;margin:0 auto" v-else-if="scope.row.haveread === 0" @click="showcontent1(scope.row)">查看</el-button>

              </template>
            </el-table-column>

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
          console.log(res);
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
          console.log(res);
          this.$emit('ifMessage');
        })
      },
      accept(item){
        this.dialogVisible1 = false;
        this.$http.post('/msg/agree', item).then(res =>{
          console.log(res);
          if(res.data === 'success'){
            this.$message.success('加入队伍成功')
          }
          else{
            this.$message.error('加入队伍失败')
          }
        })
      },
      refuse(item){
        this.dialogVisible1 = false;
        this.$http.post('/msg/refuse', item).then(res =>{
          console.log(res);
          if(res.data==='success'){
            this.$message.success('拒绝成功！')
          }
          else this.$message.error('拒绝失败！')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box-card {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
