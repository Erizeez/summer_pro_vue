<template>
  <div>
    <el-row :gutter="50" style="margin-top: 20px;" class="boxes">
      <el-col :span="5" v-for="(item,index) in doclist" :key="item.id" >
        <el-card :span="5" :body-style="{ padding: '0px' }"  shadow="hover" class="box" v-if="item.status=1">
          <img src="../../assets/home/card-bg2.jpg" class="image" style="width: 100%; height:200px; display: block">
          <div style="padding: 20px;">
            <span>{{item.title}} </span>
            <div class="buttons" style="margin-top: 20px; position: center">
              <el-button type="primary" size="small" class="button" @click="todoc(item.id)">进入文档</el-button>
              <el-button type="warning" size="small" class="button" @click="recoverDoc(item, index)">恢复文档</el-button>
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
        doclist:[]
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
.buttons{
  position: center;
}
</style>
