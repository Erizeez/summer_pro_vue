<template class="whole">
  <el-container class="home_container">
    <el-header class="el-header">

      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#E06994"
        text-color="#fff"

        style="height: 60px; width: 100%; font-size: x-large"
        active-text-color="#F2CDDB">
        <el-menu-item index="0" > <img src="../assets/j-logo.png" style="height: 60px; width: auto" @click="goindex"> </el-menu-item>
        <el-submenu index="2" style=" font-size: large; mix-blend-mode: lighten;">
          <template slot="title"><i class="el-icon-menu" ></i>我的工作台</template>
          <el-menu-item index="2-1" @click="toRecent"><i class="el-icon-view" ></i>最近浏览文档</el-menu-item>

          <el-submenu index="2-2">
            <template slot="title"><i class="el-icon-star-off"></i>收藏文档</template>
            <el-menu-item index="2-2-1" @click="toCollect">个人文档</el-menu-item>
            <el-menu-item index="2-2-2" @click="toTeamCollect">团队文档</el-menu-item>
          </el-submenu>

<!--          <el-menu-item index="2-2" @click="toCollect"><i class="el-icon-star-off"></i>收藏文档</el-menu-item>-->
          <el-menu-item index="2-3" @click="toCreated"><i class="el-icon-circle-check"></i>已创建文档</el-menu-item>
          <el-menu-item index="2-4" @click="toMyTeam"><i class="el-icon-connection"></i>已加入团队</el-menu-item>
          <el-menu-item index="2-5" @click="toTrash"><i class="el-icon-delete"></i>回收站</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" style=" mix-blend-mode: lighten;"  @click="toPersonalInfo"><i class="el-icon-s-custom"></i>个人中心</el-menu-item>
        <el-menu-item index="1" style="margin-left: 20px;mix-blend-mode: lighten; " @click="tomessageInfo">
          <i class="el-icon-s-opportunity"></i>
          消息中心
        </el-menu-item>
        <el-submenu index="4" style=" font-size: large; mix-blend-mode: lighten;">
          <template slot="title"><i class="el-icon-document-add" ></i>创建文档</template>
          <el-menu-item index="2-1" @click="addDoc"><i class="el-icon-edit-outline" ></i>创建新的文档</el-menu-item>
          <el-menu-item index="2-2" @click="toCreateFromModel"><i class="el-icon-s-order"></i>从模板创建文档</el-menu-item>
        </el-submenu>
        
        <el-button type="info" @click="logout" style="float:right; margin-right: 10px; margin-top: 10px">退出</el-button>
        <el-avatar class="header-img" :size="42" :src="photo" style="float:right; margin-right: 10px; margin-top: 8px"></el-avatar>
      </el-menu>



    </el-header>
    <el-main>
       <router-view></router-view>
    </el-main>
  </el-container>


</template>

<script>
  import recentdoc from "./workspace/recentdoc";

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
        src: require("../assets/home/team1.png"),
        photo: '',
      }
    },
    methods:{
      getUsername(){
        this.username = localStorage.getItem('username');
      },
      logout(){
        window.sessionStorage.clear();
        window.localStorage.clear();
        this.$router.push('/login');
        this.$message.success('退出成功');
      },
      toRecent(){
        console.log('hh');
        this.$router.push('/recentdoc');
      },
      goindex(){
        this.$router.push('/index');
      },
      toCollect(){
        this.$router.push('/collect');
      },
      addDoc(){
        this.$router.push('/add');
      },
      toTrash(){
        this.$router.push('/trash');
      },
      toCreated(){
        this.$router.push('/created');
      },
      toPersonalInfo(){
        this.$router.push('/PersonalInfo');
      },
      tomessageInfo(){
        this.$router.push('/messageInfo');
      },
      toAccess() {
        this.$router.push('/Access');
      },
      toMyTeam(){
        this.$router.push('/TeamAside');
      },
      toTeamCollect(){
        this.$router.push('/teamCollect');
      },
      toCreateFromModel(){
        this.$router.push('/CreateFromModel');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .whole{
    height: 100%;
    width: 100%;
    background-color: cornsilk;
  }
.home_container{
  width: 100%;
  height: 100%;
}
.el-header{
  display: flex;
  justify-content: space-between;
}
  .body{
    margin-top: 10px;
  }
  .box{
    margin-top: 30px;
  }
</style>
