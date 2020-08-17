<template>
  <el-container style="height: 700px">
    <div class="teamMember">
      <el-card class="box-card">
        创建者&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;文档管理员



        <el-button style="float: right" @click="dialogFormVisible = true">添加成员</el-button>


        <el-dialog title="添加成员" :visible.sync="dialogFormVisible" :append-to-body="true">
          <el-form :model="add">
            <el-form-item label="搜索" style="margin-left: 10%">
              <el-input v-model="add.addname" autocomplete="off" style="width: 480px;">
                <el-button slot="append" icon="el-icon-search" @click="AddMember()"></el-button>
              </el-input>
            </el-form-item>

            <el-table :data="addname" v-if="existName">
              <el-table-column prop="name" label="用户" width="450"></el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button @click="send_msg(scope.row.id)">发送邀请</el-button>
                </template>
              </el-table-column>

            </el-table>

          </el-form>
        </el-dialog>




        <el-row :gutter="12" style="margin-top: 30px; margin-left: 30px">

          <el-col :span="4" v-for="item in TeamCreator" :key="item.id">
            <el-card shadow="hover">
              <el-avatar :src="item.photo" style="margin-left: 33%"></el-avatar>
              <br>
              <div style="text-align: center; margin-top: 5px">{{item.name}}</div>
              <el-button @click="editMember(item)" type="primary" icon="el-icon-edit" circle
                style="margin-left: 15%; margin-top: 20px" size="mini"></el-button>
              <!-- <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="onlyCreator"></el-button> -->
            </el-card>
          </el-col>

          <el-col :span="1">
            <el-divider class="el-divider--vertical" direction="vertical"></el-divider>
          </el-col>

          <el-col :span="3">&#8197; </el-col>
          <el-col :span="4" v-for="item in TeamAdmin" :key="item.id">
            <el-card shadow="hover">
              <el-avatar :src="item.photo" style="margin-left: 33%"></el-avatar>
              <br>
              <div style="text-align: center; margin-top: 5px">{{item.name}}</div>
              <el-button @click="editMember(item)" type="primary" icon="el-icon-edit" circle
                style="margin-left: 15%; margin-top: 20px" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="onlyCreator"
                @click="kick(item.id)"></el-button>
            </el-card>
          </el-col>
        </el-row>






        <el-divider></el-divider>
        团队成员
        <el-row :gutter="12" style="margin-top: 30px; margin-left: 30px">
          <el-col :span="4" v-for="item in TeamCommon" :key="item.id">
            <el-card shadow="hover">
              <el-avatar :src="item.photo" style="margin-left: 33%"></el-avatar>
              <br>
              <div style="text-align: center; margin-top: 5px">{{item.name}}</div>
              <el-button @click="editMember(item)" type="primary" icon="el-icon-edit" circle
                style="margin-left: 15%; margin-top: 20px" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini" v-if="onlyCreator || Admin"
                @click="kick(item.id)"></el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-card>

      <el-dialog style="width:700px" class="editdialog" title="编辑团队成员权限" :visible.sync="dialogFormVisible1"
        :append-to-body="true">
        <el-form :model="thisMember">
          <el-avatar style="margin-left: 40%;" :src="thisMember.photo" :size="50"></el-avatar>
          <br>
          <el-form-item label="用 户 名:" style="margin-left: 10%;margin-top: 30px">
            {{thisMember.name}}
          </el-form-item>
          <el-form-item label="邮    箱:" style="margin-left: 10%;margin-top: 30px">
            {{thisMember.email}}
          </el-form-item>
          <el-form-item label="手机号码:" style="margin-left: 10%;margin-top: 30px">
            {{thisMember.mobile}}
          </el-form-item>
          <el-form-item label="角色：" v-if="!onlyCreator">{{roleName}}</el-form-item>
          <el-form-item v-model="role" label="选择角色" v-if="onlyCreator">
            <el-select v-model="value" placeholder="请选择成员角色">

              <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>

              <!--                <el-option label="管理员" value="1" @click="setRole(1)"></el-option>-->
              <!--                <el-option label="普通成员" value="0" @click="setRole(0)"></el-option>-->
            </el-select>
          </el-form-item>

          <el-form-item label="权限设置: " style="margin-left: 10%;margin-top: 30px" v-if="Admin&&value==0">
            <br>

            <!--          <el-checkbox-group v-model="rights.type">-->
            <!--            <el-checkbox v-for="item in rights.type" :label="item.name" :key="item.id" :checked="item.checkedflag=true" :disabled="item.checkedflag=false"></el-checkbox>-->
            <!--          </el-checkbox-group>-->


            <el-checkbox-group v-model="rights.select">
              <el-checkbox v-for="(item,index) in rights.type" :key="index" :label="item.name"
                @click="addAuthority(index)"></el-checkbox>
              <!--            <el-checkbox label="可分享" name="type" @click="addShare"></el-checkbox>-->
              <!--            <br>-->
              <!--            <el-checkbox label="可编辑" name="type" @click="addEdit"></el-checkbox>-->
              <!--            <el-checkbox label="可评论" name="type" @click="addComment"></el-checkbox>-->
            </el-checkbox-group>
          </el-form-item>
          <div class="confirmbtn">
            <el-button type="primary" @click="comfirmAuth"
              v-if="(onlyCreator&&value==1)||(Admin&&value==0)">确认</el-button>
          </div>
        </el-form>
      </el-dialog>




    </div>

  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        TeamMember: [],
        thisMember: {
          address: '',
          company: '',
          email: '',
          id: '',
          mobile: '',
          name: '',
          password: '',
          photo: ''
        },
        TeamCreator: [],
        TeamAdmin: [],
        TeamCommon: [],
        TeamId: '',
        onlyCreator: true,
        Admin: true,
        add: {
          addname: ''
        },
        dialogFormVisible: false,
        existName: false,
        addname: [],
        receiverid: '',
        dialogFormVisible1: false,
        rights: {
          type: [
            {
              name: '可评论'
            },
            {
              name: '可创建、编辑、删除文档'

            }
          ],
          select: []
        },
        authority: 1,
        role: [
          { value: 1, role: 1, label: '管理员' },
          { value: 0, role: 0, label: '普通成员' }
        ],
        value: '',
        EditAuth: {
          userid: '',
          belongid: '',
          teamid: '',
          accountid: '',
          authority: '',
          role: ''
        },
        roleName: ''
      }
    },
    created() {
      this.getParams();
      this.getUser();
    },
    watch: {
      '$router': 'getParams'
    },
    methods: {
      getParams() {
        this.TeamId = this.$route.query.teamid;
        this.$http.get('/team/findTeamMember?teamId=' + this.TeamId).then(async res => {
          this.TeamMember = res.data;
          //console.log(res.data[0]);
          // console.log(this.TeamMember);
          // console.log(this.TeamMember.length);
          for (var i = 0; i < this.TeamMember.length; i++) {
            await this.$http.get('/team/findbelong?accountId=' + res.data[i].id + '&teamId=' + this.TeamId).then(res1 => {
              if (res1.data.role === 2) {
                this.TeamCreator.push(res.data[i]);
              }
              if (res1.data.role === 0) {
                this.TeamCommon.push(res.data[i]);
              } if (res1.data.role === 1) {
                this.TeamAdmin.push(res.data[i]);
              }
              //  if(res1.data.authority === 1){
              //    this.rights.select[0] = null;
              //    this.rights.select[1] = null;
              //    this.rights.select[2] = null;
              //  }
              //  // this.rights.select[0] = null;
              //  // this.rights.select[1] = null;
              //  // this.rights.select[2] = null;
              //
              // if(res1.data.authority === 3){
              //    this.rights.select[0] = "可分享";
              //  }
              //  if(res1.data.authority === 5){
              //    this.rights.select[1] = "可评论";
              //  }
              //  if(res1.data.authority === 7){
              //    this.rights.select[0] = "可分享";
              //    this.rights.select[1] = "可评论";
              //  }
              //  if(res1.data.authority === 9){
              //    this.rights.select[0] = "可编辑";
              //  }
              //  if(res1.data.authority === 11){
              //    this.rights.select[0] = "可分享";
              //    this.rights.select[1] = "可编辑";
              //  }
              //  if(res1.data.authority === 13){
              //    this.rights.select[0] = "可评论";
              //    this.rights.select[1] = "可编辑";
              //  }
              //  if(res1.data.authority === 15){
              //    this.rights.select[0] = "可分享";
              //    this.rights.select[1] = "可评论";
              //    this.rights.select[2] = "可编辑";
              //  }
            })
          }

        })
      },
      getUser() {
        this.$http.get('/team/findbelong?accountId=' + localStorage.getItem('userid') + '&teamId=' + this.TeamId).then(res => {
          if (res.data.role === 2) {
            this.onlyCreator = true;
            this.Admin = true;
          }
          if (res.data.role === 1) {
            this.onlyCreator = false;
            this.Admin = true;
          }
          if (res.data.role === 0) {
            this.onlyCreator = false;
            this.Admin = false;
          }
        })
      },
      async AddMember() {
        await this.$http.get('/account/searchbyname?name=' + this.add.addname).then(res => {
          if (res.data === "") {
            return this.$message.error('不存在用户！')
          }
          this.existName = true;
          this.addname = res.data;
        })
      },
      send_msg(id) {
        var userid = window.localStorage.getItem('userid');
        this.$http.get('/msg/invite?teamId=' + this.TeamId + '&senderId=' + userid + '&receiverId=' + id).then(async res => {
          if (res.data === "success") {
            this.$message.success('发送邀请成功！')
            this.dialogFormVisible = false;
          }
          else if (res.data === "Record exists.") {
            this.$message.info('成员已存在！')
            this.dialogFormVisible = false;
          }
          else if (res.data === 'Please wait for the reply.') {
            this.$message.info('请等待用户回应');
            this.dialogFormVisible = false;
          }
          else {
            this.$message.error('添加失败，请重新发送邀请');
            this.dialogFormVisible = false;
          }

        })
      },
      editMember(item) {



        this.$http.get('/team/findbelong?accountId=' + item.id + '&teamId=' + this.TeamId).then(res => {
          this.value = res.data.role;
          if (this.value == 0) {
            this.roleName = "普通成员"
          }
          else if (this.value == 1) {
            this.roleName = "管理员"
          }
          else {
            this.roleName = "创建者"
          }
          //console.log(this.rights.select);


          if (res.data.authority === 1) {
            this.rights.select = [];
          }
          // this.rights.select[0] = null;
          // this.rights.select[1] = null;
          // this.rights.select[2] = null;

          if (res.data.authority === 3) {
            this.rights.select[0] = "可评论";
          }
          if (res.data.authority === 5) {
            this.rights.select[1] = "可创建、编辑、删除文档";
          }
          if (res.data.authority === 7) {
            this.rights.select[0] = "可评论";
            this.rights.select[1] = "可创建、编辑、删除文档";
          }

          console.log(this.rights.select);
          console.log('初始化权限');
          this.dialogFormVisible1 = true;

          // if(res.data.authority === 3){
          //   this.rights.select[0] = "可分享";
          // }
          // if(res.data.authority === 7){
          //   this.rights.select[0] = "可分享";
          //   this.rights.select[1] = "可评论";
          // }
          // if(res.data.authority === 15){
          //   this.rights.select[0] = "可分享";
          //   this.rights.select[1] = "可评论";
          //   this.rights.select[2] = "可编辑";
          // }
          //console.log(this.rights.select);
          //console.log('11');
        })
        this.EditAuth.accountid = item.id;
        this.$http.get('/account/search?id=' + item.id).then(res => {
          this.thisMember = res.data;
        })
      },
      comfirmAuth() {

        this.authority = 1;
        for (var i = 0, len = this.rights.select.length; i < len; i++) {
          if (this.rights.select[i] === "可评论") {
            this.authority += 2;
          }
          else {
            this.authority += 4;
          }
        }
        if (this.value == 1) {
          this.authority = 7;
        }
        this.EditAuth.userid = parseInt(localStorage.getItem('userid'));
        this.EditAuth.authority = this.authority;
        this.$http.get('/team/findbelong?accountId=' + this.EditAuth.accountid + '&teamId=' + this.TeamId).then(res => {
          this.EditAuth.belongid = res.data.id;
        })
        this.EditAuth.teamid = parseInt(this.TeamId);
        this.EditAuth.role = this.value;
        this.$http.post('/team/editAuth', this.EditAuth).then(res => {
          if (res.data === "success") {
            this.$message.success('编辑权限成功');
          }
          else {
            this.$message.error('编辑失败，请重新尝试');
          }
        })
        this.dialogFormVisible1 = false;
        this.TeamCommon = [];
        this.TeamAdmin = [];
        this.TeamCreator = [];
        this.getParams();
      },
      kick(id) {
        this.$http.get('/msg/kick?sendId=' + window.localStorage.getItem('userid') + '&receiveId=' + id + '&teamId=' + this.TeamId).then(res => {
          if (res.data = "success") {
            this.$message.success("踢出成功！");
            this.TeamCreator = [];
            this.TeamAdmin = [];
            this.TeamCommon = [];
            this.getParams();
          }
          else {
            this.$message.error("踢出失败！");
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box-card {
    width: 90%;
    height: auto;
    position: absolute;
    left: 5%;
    top: 5%;
  }

  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 180px;
    margin: 0 80px;
    vertical-align: middle;
    position: relative;
  }

  .editdialog {
    /*position: absolute;*/
    /*left: 50%;*/
    /*top:50%;*/
    /*transform: translate(-50%, -50%);*/
    width: 100%;
    left: 30%;
  }

  .confirmbtn {
    text-align: center;
  }
</style>