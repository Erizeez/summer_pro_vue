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
    data() {
      return {
        newteam: {
          name: '',
          introduction: '',
          id: '',
          creatorId: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入团队名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入团队简介', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.setCreateId();
    },
    methods: {
      setCreateId() {
        this.newteam.creatorId = window.localStorage.getItem('userid');
      },
      submitForm() {
        console.log(this.newteam);
        let _this = this;
        this.$refs.newteamRef.validate((valid) => {
          if (valid) {
            this.$http.post('/team/create', this.newteam).then(res => {
              _this.$message({
                type: 'success',
                message: '新建成功',
              });
              this.$router.push('/TeamAside');
            })
          } else {
            _this.$message({
              type: 'error',
              message: '新建失败',
            });
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
  .box-card {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 240px;
    height: 240px;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
  }
</style>