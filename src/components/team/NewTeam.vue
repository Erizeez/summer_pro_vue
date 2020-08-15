<template>
  <div class="form">
    <el-card class="box-card">
      <el-form :model="newteam" :rules="rules" ref="newteamRef" label-width="100px" class="addForm">
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="newteam.name"></el-input>
        </el-form-item>
        <el-form-item label="团队简介" prop="introduction">
          <el-input v-model="newteam.introduction"></el-input>
        </el-form-item>
        <el-form-item style="position: relative; left: 25%">
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newteam:{
          name:'',
          introduction:'',
          id:'',
          creatorId:''
        },
        rules: {
          name: [
            { required: true, message: '请输入团队名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          introduction:[
            { required: true, message: '请输入团队简介', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.setCreateId();
    },
    methods:{
      setCreateId(){
        this.newteam.creatorId=window.localStorage.getItem('userid');
      },
      submitForm(){
        console.log(this.newteam);
        this.$refs.newteamRef.validate((valid) => {
          if (valid) {
            this.$http.post('/team/create', this.newteam).then(res =>{
              console.log(res);
            })


            alert('submit!');
            this.$router.push('/TeamAside');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.newteamRef.resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card{
  width: 60%;
  position: absolute;
  left: 50%;
  top:30%;
  transform: translate(-50%, -50%);
}
</style>
