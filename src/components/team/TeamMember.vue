<template>
  <el-container style="height:1000px;">
  <div class="teamMember">
    <el-card class="box-card">
      创建者&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;文档管理员



        <el-button style="float: right" @click="dialogFormVisible = true" >添加成员</el-button>


      <el-dialog title="添加成员" :visible.sync="dialogFormVisible">
        <el-form :model="add">
          <el-form-item label="搜索" style="margin-left: 10%" >
            <el-input v-model="add.addname" autocomplete="off" style="width: 480px;">
              <el-button slot="append" icon="el-icon-search" @click="AddMember()"></el-button>
            </el-input>
          </el-form-item>

          <el-table :data="addname" v-if="existName">
            <el-table-column prop="name" label="用户" width="450"></el-table-column>
            <el-table-column label="操作" width="250">
              <el-button @click="send_msg">发送邀请</el-button>
            </el-table-column>
          </el-table>

        </el-form>
      </el-dialog>




      <el-row :gutter="12" style="margin-top: 30px; margin-left: 30px">

        <el-col :span="4" v-for="item in TeamCreator" :key="item.id">
          <el-card shadow="hover" >
            <el-avatar :src="item.photo" style="margin-left: 33%"></el-avatar>
            <br>
            <div style="text-align: center; margin-top: 5px">{{item.name}}</div>
            <el-button @click="editMember(item)" type="primary" icon="el-icon-edit" circle style="margin-left: 15%; margin-top: 20px" size="mini" v-if="onlyCreator"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="onlyCreator"></el-button>
          </el-card>
        </el-col>

        <el-col :span="1">
          <el-divider class="el-divider--vertical" direction="vertical" ></el-divider>
        </el-col>

        <el-col :span="3" >&#8197; </el-col>
        <el-col :span="4" v-for="item in TeamAdmin" :key="item.id">
          <el-card shadow="hover" >
            <el-avatar :src="item.photo" style="margin-left: 33%"></el-avatar>
            <br>
            <div style="text-align: center; margin-top: 5px">{{item.name}}</div>
            <el-button @click="editMember(item)" type="primary" icon="el-icon-edit" circle style="margin-left: 15%; margin-top: 20px" size="mini" v-if="onlyCreator || Admin"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="onlyCreator || Admin"></el-button>
          </el-card>
        </el-col>
      </el-row>






      <el-divider></el-divider>
      团队成员
      <el-row :gutter="12" style="margin-top: 30px; margin-left: 30px" >
        <el-col :span="4" v-for="item in TeamCommon" :key="item.id">
          <el-card shadow="hover" >
            <el-avatar :src="item.photo" style="margin-left: 33%"></el-avatar>
            <br>
            <div style="text-align: center; margin-top: 5px">{{item.name}}</div>
            <el-button @click="editMember(item)" type="primary" icon="el-icon-edit" circle style="margin-left: 15%; margin-top: 20px" size="mini"  v-if="onlyCreator || Admin"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"  v-if="onlyCreator || Admin"></el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog class="editdialog" title="编辑团队成员权限" :visible.sync="dialogFormVisible1" >
      <el-form :model="thisMember">
        <el-avatar style="margin-left: 40%;" :src="thisMember.photo" :size="50"></el-avatar>
        <br>
        <el-form-item label="用户名:" style="margin-left: 10%;margin-top: 30px" >
          {{thisMember.name}}
        </el-form-item>
        <el-form-item label="邮  箱:" style="margin-left: 10%;margin-top: 30px" >
          {{thisMember.email}}
        </el-form-item>
        <el-form-item label="手机号码:" style="margin-left: 10%;margin-top: 30px" >
          {{thisMember.mobile}}
        </el-form-item>

        <el-form-item label="权限设置: " style="margin-left: 10%;margin-top: 30px">
          <br>

<!--          <el-checkbox-group v-model="rights.type">-->
<!--            <el-checkbox v-for="item in rights.type" :label="item.name" :key="item.id" :checked="item.checkedflag=true" :disabled="item.checkedflag=false"></el-checkbox>-->
<!--          </el-checkbox-group>-->


          <el-checkbox-group v-model="rights.type">
            <el-checkbox v-for="(item,index) in rights.type" :key="item.id" :label="item.name" @click="addAuthority(index)"></el-checkbox>
<!--            <el-checkbox label="可分享" name="type" @click="addShare"></el-checkbox>-->
<!--            <br>-->
<!--            <el-checkbox label="可编辑" name="type" @click="addEdit"></el-checkbox>-->
<!--            <el-checkbox label="可评论" name="type" @click="addComment"></el-checkbox>-->
          </el-checkbox-group>
        </el-form-item>

      </el-form>
    </el-dialog>




  </div>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        TeamMember:[],
        thisMember:{
          address:'',
          company: '',
          email: '',
          id: '',
          mobile: '',
          name: '',
          password: '',
          photo:''
        },
        TeamCreator:[],
        TeamAdmin:[],
        TeamCommon:[],
        TeamId:'',
        onlyCreator:true,
        Admin:true,
        add:{
          addname:''
        },
        dialogFormVisible:false,
        existName:false,
        addname:[{
          name:''
        }],
        receiverid:'',
        dialogFormVisible1:false,
        rights:{
          type:[
            {
              id:1,
              name:'可分享',
              checkedflag:false
            },
            {
              id:2,
              name:'可评论',
              checkedflag:false,

            },
            {
              id:3,
              name:'可编辑',
              checkedflag:''
            }
          ]
        },
        authority:1
      }
    },
    created() {
      this.getParams();
      this.getUser();
    },
    watch:{
      '$router':'getParams'
    },
    methods:{
      getParams(){
        this.TeamId=this.$route.query.teamid;
        this.$http.get('/team/findTeamMember?teamId='+this.TeamId).then(async res =>{
          this.TeamMember = res.data;
          //console.log(res.data[0]);
          // console.log(this.TeamMember);
          // console.log(this.TeamMember.length);
          for(var i = 0; i < this.TeamMember.length; i ++){
            await this.$http.get('/team/findbelong?accountId='+res.data[i].id+'&teamId='+this.TeamId).then(res1 =>{
              if(res1.data.role === 2){
                this.TeamCreator.push(res.data[i]);
              }
              else if(res1.data.role === 0){
                this.TeamCommon.push(res.data[i]);
              }else if(res1.data.role === 1){
                this.TeamAdmin.push(res.data[i]);
              }
            })
          }

        })
      },
      getUser(){
        this.$http.get('/team/findbelong?accountId='+localStorage.getItem('userid')+'&teamId='+this.TeamId).then(res =>{
          if(res.data.role === 'creator'){
            this.onlyCreator = true;
            this.Admin = true;
          }
          if(res.data.role === 'admin'){
            this.onlyCreator = false;
            this.Admin = true;
          }
          if(res.data.role === 'member'){
            this.onlyCreator = false;
            this.Admin = false;
          }
        })
      },
      async AddMember(){
        await this.$http.get('/account/searchbyname?name='+this.add.addname).then(res =>{
          if(res.data===""){
            return this.$message.error('不存在用户！')
          }
          this.existName = true;
          this.addname[0].name = res.data.name;
          this.receiverid = res.data.id;
        })
      },
      send_msg(){
        var userid = window.localStorage.getItem('userid');
        this.$http.get('/msg/invite?teamId='+this.TeamId+'&senderId='+userid+'&receiverId='+this.receiverid).then(res =>{
          if(res.data === "success"){
            location.reload(true);
            return this.$message.success('发送邀请成功！')
          }
          else if(res.data === "Record exists."){
            return this.$message.info('成员已存在！')
          }
          else if(res.data === 'Please wait for the reply.') {
            return this.$message.info('请等待用户回应');
          }
          else{
            return this.$message.error('添加失败，请重新发送邀请');
          }
        })
      },
      editMember(item){
        this.dialogFormVisible1 = true;
        this.$http.get('/account/search?id='+item.id).then(res =>{
          console.log(res);
          this.thisMember = res.data;
        })
      },
      addShare(){
        this.authority += 2;
        console.log(this.authority);
      },
      addComment(){
        this.authority += 4;
      },
      addEdit(){
        this.authority += 8;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card{
  width: 90%;
  height: 100%;
  position: absolute;
  left:5%;
  top:5%;
}
.el-divider--vertical{
  display:inline-block;
  width:1px;
  height:180px;
  margin:0 80px;
  vertical-align:middle;
  position:relative;
}
  .editdialog{
    /*position: absolute;*/
    /*left: 50%;*/
    /*top:50%;*/
    /*transform: translate(-50%, -50%);*/
    width: 50%;
    left: 30%;
  }
</style>
