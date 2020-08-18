<template class="whole">
  <el-container class="home_container">
    <el-header class="el-header">

      <el-menu class="el-menu-demo" mode="horizontal" text-color="#777" background-color="#fff" active-text-color="#222"
        :default-active="activeIndex">
        <el-menu-item index="0">
          <div @click="goindex">
            <img class="img-title" src="../assets/logo11.png">
            <span class="LogoFont">黑曜石文档</span>
          </div>
        </el-menu-item>
        <el-submenu class="submenu-1" index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>我的工作台
          </template>
          <!--          <el-menu-item class="item1" index="2-1" @click="toRecent">-->
          <!--            <i class="el-icon-view" ></i>最近浏览文档-->
          <!--          </el-menu-item>-->

          <el-submenu index="1-2">
            <template slot="title">
              <i class="el-icon-view"></i>最近浏览文档
            </template>
            <el-menu-item index="1-2-1" @click="toRecent">个人最近浏览文档</el-menu-item>
            <el-menu-item index="1-2-2" @click="toTeamRecent">团队最近浏览文档</el-menu-item>
          </el-submenu>


          <el-submenu index="2-2">
            <template slot="title">
              <i class="el-icon-star-off"></i>收藏文档
            </template>
            <el-menu-item index="2-2-1" @click="toCollect">个人文档</el-menu-item>
            <el-menu-item index="2-2-2" @click="toTeamCollect">团队文档</el-menu-item>
          </el-submenu>


          <el-menu-item index="2-3" @click="toCreated"><i class="el-icon-circle-check"></i>已创建文档</el-menu-item>
          <el-menu-item index="2-5" @click="toTrash"><i class="el-icon-delete"></i>回收站</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title"><i class="el-icon-connection"></i>团队空间</template>
          <el-menu-item index="5-1" @click="toMyTeam"><i class="el-icon-s-home"></i>我的团队</el-menu-item>
          <el-menu-item index="5-2" @click="toNewTeam"><i class="el-icon-circle-plus-outline"></i>创建团队</el-menu-item>
        </el-submenu>


        <el-menu-item index="3" @click="toPersonalInfo"><i class="el-icon-s-custom"></i>个人中心</el-menu-item>


        <el-menu-item index="1" @click="tomessageInfo">
          <i class="el-icon-s-opportunity"></i>
          消息中心
          <el-badge v-if="haveNewMessage" value="new" class="item">

          </el-badge>


        </el-menu-item>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-document-add"></i>创建文档</template>
          <el-menu-item index="4-1" @click="addDoc"><i class="el-icon-edit-outline"></i>创建新的文档</el-menu-item>
          <el-menu-item index="4-2" @click="toCreateFromModel"><i class="el-icon-s-order"></i>从模板创建文档</el-menu-item>
        </el-submenu>

        <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom-end">
          <el-button type="danger" @click="logout" style="float:right; margin-right: 50px; margin-top: 10px"
            icon="el-icon-right" circle></el-button>
        </el-tooltip>

        <a @click="toPersonalInfo">
          <el-tooltip class="item" effect="dark" :content="this.username" placement="bottom">
            <el-avatar class="header-img" :size="42" :src="photo"
              style="float:right; margin-right: 20px; margin-top: 8px"></el-avatar>
          </el-tooltip>
        </a>

      </el-menu>
    </el-header>
    <el-main>
      <router-view @ifMessage="ifMessage" @getUserInfo="getUserInfo"></router-view>
    </el-main>
  </el-container>


</template>

<script>
  import recentdoc from "./workspace/recentdoc";

  export default {
    data() {
      return {
        superURL: [
          {
            id: 0,
            idView: require("../assets/home/lunbo2.png")
          }, {
            id: 1,
            idView: require("../assets/home/lunbo3.png")
          }, {
            id: 2,
            idView: require("../assets/home/lunbo4.jpeg")
          }
        ],
        photo: '',
        username: '',
        haveNewMessage: false,
        src: require("../assets/home/team1.png"),
        activeIndex: ''
      }
    },
    created() {
      this.getUserInfo(),
        this.ifMessage();
    },
    methods: {
      ifMessage() {
        this.$http.get('/msg/getmsg?accountId=' + localStorage.getItem('userid')).then(res => {
          for (var i = 0, len = res.data.length; i < len; i++) {
            if (res.data[i].haveread == 0) {
              this.haveNewMessage = true;
              break;
            }
            this.haveNewMessage = false;
          }
        })
      },
      getUserInfo() {
        this.$http.get('/account/search', {
          params: { id: window.localStorage.getItem("userid") }
        }).then(res => {
          console.log(res);
          this.photo = res.data.photo;
          this.username = "欢迎，" + res.data.name;
        })
      },
      logout() {
        window.sessionStorage.clear();
        window.localStorage.clear();
        this.$router.push('/login');
        this.$message.success('退出成功');
      },
      toRecent() {
        console.log('hh');
        this.$router.push('/recentdoc');
      },
      goindex() {
        this.$router.push('/index');
      },
      toCollect() {
        this.$router.push('/collect');
      },
      addDoc() {
        this.$router.push('/add');
      },
      toTrash() {
        this.$router.push('/trash');
      },
      toCreated() {
        this.$router.push('/created');
      },
      toPersonalInfo() {
        this.activeIndex = 3;
        this.$router.push('/PersonalInfo');
      },
      tomessageInfo() {
        this.$router.push('/messageInfo');
      },
      toMyTeam() {
        this.$router.push('/TeamAside');
      },
      toTeamCollect() {
        this.$router.push('/teamCollect');
      },
      toCreateFromModel() {
        this.$router.push('/CreateFromModel');
      },
      toNewTeam() {
        this.$router.push('/NewTeam');
      },

      toTeamRecent() {
        this.$router.push('/teamRecent');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .whole {
    height: 100%;
    width: 100%;
    background-color: cornsilk;
  }

  .el-menu-demo {
    height: 60px;
    width: 100%;
    font-size: x-large;
    box-shadow: 0px 0px 30px 2px rgba(0, 0, 0, 0.4);
    transition-duration: 0.3s;
  }

  .el-menu-demo:hover {
    transition-duration: 0.3s;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.4);
  }

  .img-title {
    height: 60px;
    width: auto;
  }

  .home_container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
  }

  .body {
    margin-top: 10px;
  }

  .box {
    margin-top: 30px;
  }

  .submenu-1 {
    font-size: large;
  }

  a:hover {
    filter: brightness(120%);
  }

  .item {
    margin-top: -25px;
    margin-left: -4px;
    margin-right: -15px;
  }
  .LogoFont{
    font-weight:bolder;
    font-size: large;
  }
</style>