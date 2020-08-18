<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo11.png" alt="">
      </div>
      <div class="big_stress">
        欢迎加入黑曜石文档
      </div>
      <!-- 注册表单区域 -->
      <el-form :model="RegisterForm" status-icon :rules="RegisterFormRules" style="top:160px" ref="RegisterForm" label-width="0px" class="register_form">
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input v-model="RegisterForm.name" placeholder="请输入用户名"  prefix-icon="el-icon-user-solid" > </el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="RegisterForm.email" placeholder="请输入邮箱"  prefix-icon="el-icon-message"> </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="emailcheck">
          <el-input prop="emailcheck" v-model="RegisterForm.emailcheck" placeholder="请输入邮箱验证码" style="width:290px" prefix-icon="el-icon-message"> </el-input>
          <el-button  prefix-icon="el-icon-message" style="float:right;" @click="checkemail">获取验证码</el-button>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="RegisterForm.password" placeholder="请输入密码" prefix-icon="el-icon-warning" type="password" show-password> </el-input>
        </el-form-item>
        <!-- 再一次输入密码 -->
        <el-form-item prop="checkPassword">
          <el-input v-model="RegisterForm.checkPassword" placeholder="请输入相同密码" prefix-icon="el-icon-warning" type="password" show-password> </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="info" @click="goLogin" round>返回登录</el-button>
          <el-button type="primary" @click="submitForm('RegisterForm')" round>注册</el-button>
          <el-button type="warning" @click="resetForm('RegisterForm')" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.RegisterForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        RegisterForm: {
          name: '',
          password: '',
          checkPassword: '',
          email: '',
          emailcheck:''
        },
        RegisterFormRules: {
          name: [
            { required: true, message: "请输入用户名", trigger: "blur"},
            { min: 3, max: 8, message: "长度在3到8个字符之间", trigger: "blur"}
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur"},
            { min: 8, max: 25, message: "长度在8到25个字符之间", trigger: "blur"}
          ],
          checkPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur"},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          emailcheck:[
            {required :true, message: "请输入验证码", trigger:"blur"},
            { min:6, max:6, message:'请输入六位邮箱验证码', trigger: "blur"}
          ]
        },
        havecheck:false,
        check:''
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.RegisterForm.emailcheck === this.check){
            this.$http.post('/account/reg', this.RegisterForm).then(
              function(res){
              console.log(res);
              if(res.data == "success"){
                _this.$router.push("/login");
                _this.$message({
                  type: 'success',
                  message: '注册成功'
                });
              } else{
                _this.$message({
                  type: 'error',
                  message: '注册失败'
                });
              }
           });
          }
          else{
            this.$message.error("邮箱验证失败");
            return false;
          }
        } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      },
      checkemail(){
        this.$http.get('/account/getvcode?email='+this.RegisterForm.email).then(res=>{
          console.log(res);
          this.check = res.data.vcode;
        })
        
      },
      goLogin() {
        this.$router.push("/login");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .register_container{
    height: 100%;
    background-image: url("../assets/login/login_bg.jpg");
  }
  .register_box{
    width: 450px;
    height: 550px;
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
  .register_form{
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
