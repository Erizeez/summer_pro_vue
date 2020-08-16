<template>
    <el-container>
        <el-main class="el-main-1" style="overflow:-Scroll;overflow-x:hidden">

            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="title-div">
                        <p class="titleP">创建新的文档</p>
                    </div>
                </el-col>
                <el-col class="title-col" :span="12">
                    <el-tooltip class="seBtn" content="切换" placement="top">
                        <el-switch
                            style="display: block"
                            v-model="value"
                            active-color="#13ce66"
                            inactive-color="#13ce66"
                            active-text="基础信息"
                            inactive-text="文档编辑">
                        </el-switch>
                    </el-tooltip>    
                </el-col>
            </el-row>
            <el-row class="el-row-2">
                <div class="info_box" id="contentDiv">
                    <el-row :gutter="50" style="height: 100%; padding-left: 50px; margin-top: 20px; overflow: hidden;position: relative;">
                        <el-col :span="24" style="height: 100%; width: 95%; margin: 40px 0px 20px 0px;">
                            <ckeditor :editor="editor" v-model="docData.text" :config="editorConfig" @ready="onReady" class="editorStyle">{{this.$route.params.id}}</ckeditor>
                        </el-col>
                        
                    </el-row>
                </div>
                <div class="info_box1" id="infoDiv">
                    <el-row :gutter="50" style="height: 100%; padding-left: 50px; margin-top: 20px; overflow: hidden;position: relative;">
                        <el-col :span="24" style="height: 5%; width: 95%; margin: 40px 0px 20px 0px;">
                            <el-input v-model="docData.title">
                                <template slot="prepend">文档名</template>
                            </el-input>
                        </el-col>
                        <el-col :span="24" style="height: 10%; width: 95%; margin: 40px 0px 20px 0px;">
                            <div>
                                <p style="font-size: 20px;">简介:</p>
                            </div>
                        </el-col>
                        <el-col :span="24" style="height: 30%; width: 95%; margin: 40px 0px 20px 0px;">
                            <el-input style="max-height: 40%;" type="textarea" v-model="docData.intro" class="inputConfig">
                                
                            </el-input>
                        </el-col>
                        <el-col :span="24" style="height: 30%; width: 95%; margin: 40px 0px 20px 0px;">
                            <el-row>
                                <el-col :span="12" style="height: 5%; margin: 40px 0px 20px 0px;">
                                    <div class="btn-div-1" @click="cancelAdd">
                                        <p class="titleB">取消</p>
                                    </div>
                                </el-col>
                                <el-col :span="12" style="height: 5%;margin: 40px 0px 20px 0px;">
                                    <div class="btn-div-2" @click="saveAdd">
                                        <p class="titleB">创建</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-header>
            <el-main class="mainConfig">
                <el-input v-model="docData.intro" class="inputConfig">
                    <template slot="prepend">简介</template>
                </el-input>
                <ckeditor :editor="editor" v-model="docData.text" :config="editorConfig" @ready="onReady" class="editorStyle">{{this.$route.params.id}}</ckeditor>
            </el-main>
            <el-footer class="footerConfig">
                <el-button type="primary" @click="cancelAdd">取消</el-button>
                <el-button type="primary" @click="saveAdd">保存</el-button>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
	import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js'

export default {
        name: 'app',
        data() {
            return {
                editor: DecoupledEditor,
                editorConfig: {
                    // The configuration of the editor.
                    language: "zh-cn",
                    fontSize: {
                    	options: [5,5.5,6.5,7.5,8,9,10,10.5,11,12,14,16,18,20,22,24,26,28,36,48,72],
                    	supportAllValues: true
                    },
                  ckfinder: {
                    uploadUrl: '/apis/doc/upload_file',
                    name: 'file',
                  }

                	//toolbar: ['exportWord', heading', 'fontFamily', 'fontSize', 'fontColor', 'bold', 'italic', 'underline', 'strikeThrough', 'alignment', 'numberedList', 'bulletedList', 'increaseIndent', 'decreaseIndent', 'link', 'blockQuote', 'image', 'insertTable', 'undo', 'redo'],


                },
                docData: {
                    id: '',
                    createId: '',
                    createTime: '',
                    lastTime: '',
                    text: '',
                    status: '',
                    title: '',
                    intro: ''
                }
                // ...
            };
        },
        created() {
            this.docData.createId = window.localStorage.getItem('userid');
          this.getParams();
        },
        watch:{
          '$router':'getParams'
        },
        methods: {
            onReady( editor )  {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
            },
            getDocData() {
                this.$http.get('/doc/read', {
                    params: { id: this.$route.params.id }
                }).then(res =>{
                    console.log(res);
                    this.docData.id = res.data.id;

                    this.docData.createTime = res.data.createTime;
                    this.docData.lastTime = res.data.lastTime;
                    this.docData.text = res.data.text;
                    this.docData.status = res.data.status;
                    this.docData.title = res.data.title;
                    this.docData.intro = res.data.intro;
                })
            },
            cancelAdd() {
                this.$router.back();
            },
            saveAdd() {
                let _this=this;
                this.$http.post('/doc/add', this.docData).then(
                function(res){
                    console.log(res);
                    if(res.data == "success"){
                        _this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        _this.$router.push("/created");
                    } else{
                        _this.$message({
                            type: 'error',
                            message: '保存失败'
                        });
                    }
                });
            },
          getParams(){
            this.docData.text=this.$route.query.model;
          }
        }
    }
</script>

<style scoped>
    .divConfig1 {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
    .divConfig2 {
        width: 100%;
        height: 100%;
        //overflow-y: hidden;
        padding: 5px 0px 0px 0px;
    }
    .inputConfig {
        padding: -10px 0px 5px 0px;
    }
    .el-container {
        height: 100%;
        margin-bottom: 40px;
        background-image: url("../assets/login/login_bg.jpg");
    }
	.editorStyle{
		width: 100%;
		height: 100%;
        //overflow-y: hidden;
	}
    .headConfig{
        padding: 0px 10px 10px 15px;
        font-family: "Microsoft YaHei";
        font-size: 30px;
        color: #333;
        text-align: left;
        top: 100px;
        width: 100%;
        margin: 0 auto;
        height: 30%;
        box-sizing: border-box;
    }
    .mainConfig{
        width: 100%;
        height: 70%;
        background-color: #fff;
        overflow-x: hidden;
     //   overflow-y: hidden;
    }
    .footerConfig{
        right: 0px;
        top: 50%;
    }
    .detail-div{
        width: 20%;
        height: 100%;
        border-radius: 10px;
        background-color: rgba(150, 150, 150, 0.05);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        text-align: center;
        color: #666;
        transition-duration: 0.2s;
    }
    .btn-div-1{
        width: 20%;
        height: 100%;
        position: absolute;
        left: 10%;
        border-radius: 10px;
        background-color: rgba(150, 150, 150, 0.05);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        text-align: center;
        color: #666;
    }
    .btn-div-1:active{
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
        color: #666;
    }
    .btn-div-2{
        width: 20%;
        height: 100%;
        position: absolute;
        right: 10%;
        border-radius: 10px;
        background-color: rgba(150, 150, 150, 0.05);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        text-align: center;
        color: #666;
    }
    .btn-div-2:active{
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
        color: #666;
    }
    .titleB{
        font-size: 18px;
        //color: #555;
    }
    /* .detail-div:hover{
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
        color: #666;
        transition-duration: 0.2s;
    } */
</style>

