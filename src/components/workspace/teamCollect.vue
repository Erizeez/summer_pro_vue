<template>
  <div>
  <el-row :gutter="50" style="margin-top: 20px;" class="boxes">
    <el-col :span="5" v-for="item in collectlist" :key="item.id" >
      <el-card :span="5" :body-style="{ padding: '0px' }"  shadow="hover" class="box">
        <img src="../../assets/home/card-bg2.jpg" class="image" style="width: 100%; height:200px; display: block">
        <div style="padding: 14px;">
          <span>{{item.title}} </span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="todoc(item.id)">进入文档</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>

</template>

<script>
  export default {
    data () {
      return {
        collectlist:[

        ]
      }
    },
    created() {
      this.getTeamCollect();
    },
    methods:{

      getTeamCollect(){
        var userId = window.localStorage.getItem('userid');
        this.$http.get('/team/collectlist?accountId='+userId).then(res =>{
          console.log('hhh');
          console.log(res);
          if(res.status !== 200) {
            return this.$message.error('获取失败');
          }
          this.collectlist = res.data;
        })
      },
      todoc(id){
        console.log(id);
        this.$router.push({
          path:'/teamtext',
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

</style>
