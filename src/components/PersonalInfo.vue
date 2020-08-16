<template>
    <div class="container">
        <el-container>
                <el-main>
                    <el-card class="box-card" v-if="doChange">
                        <div slot="header" class="clearfix">
                            <span>修改个人信息</span>
                            <el-button style="float: right; padding: 3px 3px" type="info" @click=toChange>取消修改
                            </el-button>
                        </div>
                        <div class="text item">
                            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
                                <el-form-item label="用户名" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model.number="ruleForm.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="家庭住址" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item label="公司名" prop="company">
                                    <el-input v-model="ruleForm.company"></el-input>
                                </el-form-item>
                                <el-form-item label="头像" prop="photo">
                                    <!-- <li class="one" v-if="info.photo">
                                        <img :src="info.photo">
                                    </li>
                                    <li style="position:relative" v-if="!info.photo">
                                        <input @change='add_img' type="file">
                                    </li> -->
                                    <el-upload class="avatar-uploader" action="/apis/account/upload_photo" name="photo"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload" accept="image/*">
                                        <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submit('ruleForm')">
                                        提交修改
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                    <el-card class="box-card" v-else>
                        <div slot="header" class="clearfix">
                            <span>个人信息</span>
                          <el-button style="float:right; margin-left: 25px;" size="small" type="warning" plain @click="openPassword">修改密码</el-button>
<!--                            <el-button style="float: right; padding: 3px 0" type="text" @click=jumpToChange>完善与修改信息-->
<!--                            </el-button>-->
                          <el-button type="primary" size="small" style="float: right;" @click=jumpToChange plain>完善与修改信息</el-button>

                        </div>
                        <el-form label-width="90px">
                            <el-form-item label="用户名">
                                {{info.name}}
                            </el-form-item>
                            <el-form-item label="邮箱">
                                {{info.email||"暂无"}}
                            </el-form-item>
                            <el-form-item label="手机号码">
                                {{info.mobile||"暂无"}}
                            </el-form-item>
                            <el-form-item label="家庭住址">
                                {{info.address||"暂无"}}
                            </el-form-item>
                            <el-form-item label="公司名">
                                {{info.company||"暂无"}}
                            </el-form-item>
                            <el-form-item label="头像">
                                    <el-image
                                    style="width: 100px; height: 100px"
                                    :src="info.photo"
                                    ></el-image>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-main>
        </el-container>


      <el-dialog title="修改密码"  :visible.sync="dialogFormVisible" style="width: 70%; position: absolute; left:15%; top:5%">
        <el-form :model="passwordform" :rules="pwdRule" ref="pwdformRef">
          <el-form-item label="原密码" prop="old">
            <el-input type="password" v-model="passwordform.old" autocomplete="off" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new">
            <el-input type="password" v-model="passwordform.new" autocomplete="off" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="newAgain">
            <el-input type="password" v-model="passwordform.newAgain" autocomplete="off" style="width: 345px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitPassword">确 定</el-button>
        </div>
      </el-dialog>



    </div>
</template>
<script>
    export default {
        data() {
            var checkPhone = (rule, value, callback) => {
                const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
                if (!value) {
                    return callback(new Error('电话号码不能为空'))
                }
                setTimeout(() => {

                    if (!Number.isInteger(+value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        if (phoneReg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('电话号码格式不正确'))
                        }
                    }
                }, 100)
            };
            var checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            }
            return {
                info: {
                    id: 0,
                    name: '',
                    email: '',
                    mobile: '',
                    address: '',
                    company: '',
                    photo: '',
                },
                ruleForm: {
                    id: 0,
                    name: '',
                    password: '',
                    email: '',
                    mobile: '',
                    address: '',
                    company: '',
                    photo: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, validator: checkEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, validator: checkPhone, trigger: 'blur' }
                    ]
                },
              passwordform:{
                old:'',
                new:'',
                newAgain:''
              },
              pwdRule:{
                  old:[
                    { required: true, message: "请输入原密码", trigger: "blur"},
                  ],
                  new:[
                    { required: true, message: "请输入新密码", trigger: "blur"},
                    { min: 8, max: 25, message: "长度在8到25个字符之间", trigger: "blur"}
                  ],
                newAgain:[
                  { required: true, message: "请再次输入密码", trigger: "blur"},
                  { min: 8, max: 25, message: "长度在8到25个字符之间", trigger: "blur"}
                ]
              },
                doChange: false,
                imgData: {
                    accept: 'image/gif, image/jpeg, image/png, image/jpg',
                },
                dialogFormVisible:false,

            };
        },
        created() {
            this.info.id = window.localStorage.getItem('userid');
        },
        mounted: function () {
            this.$http.get('/account/search?id=' + this.info.id).then(res => {
                console.log(res);
                this.info = res.data;
            })

        },
        methods: {
            getInfo: function () {
                console.log(this.info);
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/account/edit', this.ruleForm).then(res => {
                            console.log(res);
                            if ((res.data.msg) !== ('success')) {
                                this.$message.success('修改成功');
                                this.info.name = this.ruleForm.name;
                                this.info.email = this.ruleForm.email;
                                this.info.password=this.ruleForm.password;
                                this.info.mobile = this.ruleForm.mobile;
                                this.info.address = this.ruleForm.address;
                                this.info.company = this.ruleForm.company;
                                this.info.photo = this.ruleForm.photo;
                                this.toChange();
                            }
                            else {

                                return this.$message.error('修改失败，请检查输入格式');
                            }
                        })

                    }
                    else {
                        return false;
                    }
                })
            },
            jumpToChange() {
                this.ruleForm.id = this.info.id;
                this.ruleForm.name = this.info.name;
                this.ruleForm.email = this.info.email;
                this.ruleForm.password=this.info.password;
                this.ruleForm.mobile = this.info.mobile;
                this.ruleForm.address = this.info.address;
                this.ruleForm.company = this.info.company;
                this.ruleForm.photo = this.info.photo;
                this.toChange();
            },
            toChange() {
                this.doChange = !this.doChange;
            },
            /* add_img(event) {
                let reader = new FileReader();
                let img1 = event.target.files[0];
                let type = img1.type; //文件的类型，判断是否是图片
                let size = img1.size; //文件的大小，判断图片的大小
                if (this.imgData.accept.indexOf(type) == -1) {
                    alert('请选择我们支持的图片格式！');
                    return false;
                }
                //图片的大小
                if (size > 1024 * 10240) {
                    alert('请选择10M以内的图片！');
                    return false;
                }
                var uri = ''
                let form = new FormData();
                form.append('file', img1, img1.name);
                //接口部分
                this.$http.post("/account/upload_photo", form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    console.log(response.data)
                    uri = response.data.filepath;
                    reader.readAsDataURL(img1);
                    var that = this;
                    reader.onloadend = function () {
                        that.info.photo = uri;
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            } */
            submitPassword(){
              this.$refs.pwdformRef.validate(valid => {
                if(!valid) {
                  this.dialogFormVisible = false;
                  return this.$message.error("请输入正确格式");
                }
                this.dialogFormVisible = false;
                var oldpassword;
                console.log(this.passwordform.old);
                console.log(typeof this.passwordform.old)
                this.$http.get('/account/search?id=' + this.info.id).then(res => {
                  //console.log(res);
                  oldpassword = res.data.password;
                  console.log(typeof oldpassword);

                  if (this.passwordform.old !== oldpassword) {
                    return this.$message.error("原密码不正确")
                  }
                  if (this.passwordform.new !== this.passwordform.newAgain) {
                    return this.$message.error("两次输入密码不一致")
                  } else {
                    this.$http.get('/account/modifypwd?id=' + this.info.id + '&oldPwd=' + this.passwordform.old + '&newPwd=' + this.passwordform.new).then(res => {
                      console.log(res);
                      if (res.data === "success") {
                        return this.$message.success("修改密码成功");
                      } else {
                        return this.$message.error("修改密码失败");
                      }
                    })
                  }

                })
              })
            },
            openPassword(){
              this.dialogFormVisible = true;
            },
            handleAvatarSuccess(res) {
                var tmp=res.filepath;
                console.log(tmp);
                this.ruleForm.photo=tmp;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/gif'||'image/jpeg'||'image/png'||'image/jpg';
                const isLt10M = file.size / 1024 / 1024 / 10;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt10M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt10M;
            }

        }
    };
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
        
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 0.6);

        border-radius: 30px;
        min-height: 300px;
        position: absolute;
        left: 50%;
        top: 100px;
        transform :translate(-50%, 0%);
        
        transition-duration: 0.5s;
        width: 1000px;
    }

    /*  .one {
        width: 3rem;
        height: 3rem;
    }

    .one img {
        width: 3rem;
        height: 3rem;
    } */
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
