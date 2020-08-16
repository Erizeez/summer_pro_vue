<template>
  <div class="login_container">
    <div class="login_box">

      <div class="avatar_box">
        <img src="../assets/logo.png" style="width: 100px; height: 100px; border-radius: 50%; background-color: #eeeeee">
      </div>

      <el-form :model="loginForm" :rules="loginformRules" class="login_form" ref="loginformRef">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item class = "btns">
          <el-button type="primary" round @click="goRegister">注册</el-button>
          <el-button type="success" round @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loginForm:{
          name:'',
          password:''
        },
        loginformRules:{
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      goRegister(){
        this.$router.push("/register");
      },
      login(){
        this.$refs.loginformRef.validate(valid =>{
          // console.log(valid);
          if(!valid) return;
          this.$http.post('/account/login', this.loginForm).then(res =>{
            console.log(this.loginForm);
            console.log(res.data);

            if((res.data.msg) !== ('Login success')){
              return this.$message.error('登录失败');
            }
            else{
              this.$message.success('登陆成功');
              window.sessionStorage.setItem('token', res.data.token);
              window.localStorage.setItem('userid', res.data.account.id);
              //this.$local.set('user', {'name':this.loginForm.name, 'password':this.loginForm.password});
              this.$router.push('/home');
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
.login_container{
  height: 100%;
  background-image: url("../assets/login/login_bg.jpg");
}
  .login_box{
    height: 450px;
    width: 400px;
    background-color: aliceblue;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
  .avatar_box{
    height: 100px;
    width: 100px;
    border: 2px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
  }
  .btns{
    display: flex;
    justify-content: center;
  }
  .login_form{
    position: absolute;
    top: 100px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
