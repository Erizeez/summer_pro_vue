<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/rlc-logo.png" alt="">
      </div>
      <div class="big_stress">
        欢迎使用金刚石文档
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
          <el-button type="info" round @click="goRegister">前往注册</el-button>
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
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
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

<style lang="less" scoped>
.login_container{
  height: 100%;
  background-image: url("../assets/login/login_bg.jpg");
  }
  .login_box{
    width: 450px;
    height: 380px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform :translate(-50%, -50%);
    box-shadow: 0px 5px 35px 20px rgba(0, 0, 0, 0.3);
    .avatar_box{
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform :translate(-50%, -50%);
      background-color: #fff;
      box-shadow: 0px 2px 15px 3px rgba(0, 0, 0, 0.3);
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .big_stress{
    font-family: "Microsoft YaHei";
    font-size: 30px;
    color: #aaa;
    position: absolute;
    text-align: center;
    top: 100px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>
