<template>
  <div>


    <el-card class="box-card">

      <div slot="header"  class="clearfix">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <span >{{text.name}}</span>
        <div class = "favorite">
          <el-button type="primary" style="float: right; margin-right: 10px" round @click="recoverDoc">复原文档</el-button>
        </div>

      </div>
      <div  class="text item" style="text-align: left">
        {{text.texts}}
      </div>
    </el-card>


  </div>
</template>

<script>
  export default {
    data () {
      return {
        textid:'',
        text:{
          texts:'',
          name:''
        },
        Doc:{
          id:'',
          createId:'',
          createTime:'',
          lastTime:'',
          text:'',
          status:'',
          title:'',
          intro:''
        }
      }
    },
    created() {
      this.getParams();
    },
    watch:{
      '$router':'getParams'
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getParams: function () {
        this.textid = this.$route.query.textid;
        console.log(this.$route.query.textid);
        this.$http.get('/doc/getatrash?DocId=' + this.$route.query.textid).then(res => {
          console.log(res);
          this.text.texts = res.data.text;
          this.text.name = res.data.title;
          this.Doc=res.data;
        })
      },
      recoverDoc(){
        this.$http.post('/doc/recover', this.Doc).then(res =>{
          console.log(res);
          if(res.data !== 'success') return this.$message.error("复原失败");
          this.$message.success('复原成功');
          this.$router.go(-1);
        })
      }
    }
  }
</script>


<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 90%;
    height: 550px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .favorite{
    margin: 5px;
  }
</style>
