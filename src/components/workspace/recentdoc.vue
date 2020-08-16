<template>
  <div>
      <el-row :gutter="20">
          <h1>最近浏览
            <el-row :gutter="0">
              <el-radio-group v-model="brouseMode" style="margin-bottom: 20px;float:right;margin-right:50px">
                <el-radio-button :label="false">平铺</el-radio-button>
                <el-radio-button :label="true">列表</el-radio-button>
              </el-radio-group>
            </el-row>
          </h1>
        </el-row>
    <el-row :gutter="50" style="margin-top: 20px;" class="boxes">
        <el-col :span="16" :offset="2" v-if="brouseMode==true">
            <el-table :data="doclist" stripe style="width: 100%">
              <el-table-column type="index" width="50">
              </el-table-column>
              <el-table-column prop="title" label="文档名" width="500">
              </el-table-column>
              <el-table-column prop="createTime" label="创建日期" width="240">
              </el-table-column>
              <el-table-column prop="lastTime" label="最后修改日期">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="todoc(scope.row.id)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
      <el-col :span="5" v-for="item in doclist" :key="item.id" v-if="brouseMode==false">
        <el-card :span="5" :body-style="{ padding: '0px' }"  shadow="hover" class="box">
          <img src="../../assets/home/card-bg2.jpg" class="image" style="width: 100%; height:200px; display: block"/>
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
      doclist:[
        {
          url:require("../../assets/home/card-bg2.jpg")
        },{
        url: require("../../assets/home/card-bg1.jpg")
        }
      ],
      user:{
        id:''
      },
      brouseMode:false
    }
  },
  created() {
    this.getrecentdoc();
  },
  methods: {
    getrecentdoc(){
        var userId = window.localStorage.getItem('userid');

        console.log(typeof parseInt(userId));
        this.$http.get(`/doc/latestlist?id=`+userId).then(res =>{
          console.log(res);
          if(res.status !== 200){
          return this.$message.error('获取失败')
        }
        this.doclist = res.data.reverse();
      })
    },
    todoc(id){
      console.log(id);
      this.$router.push({
        path:'/text',
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
.box{
margin-top: 30px;
}
.boxes{
  position: relative;
  left: 7%;
}
</style>
