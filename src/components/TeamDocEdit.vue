<template>
    <el-container>
        <el-main class="el-main-1" style="overflow:-Scroll;overflow-x:hidden">

            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="title-div">
                        <p class="titleP">编辑团队文档</p>
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
                        <el-col :span="24" style="height: 5%; width: 95%; margin: 10px 0px 20px 0px;">
                            <p style="font-size: 20px;">文档名:</p>
                            <el-input v-model="docData.title">
                                <template slot="prepend"></template>
                            </el-input>
                        </el-col>
                        <el-col :span="24" style=" width: 95%; margin: 0px 0px 20px 0px;">
                        </el-col>
                        <el-col :span="24" style="height: 30%; width: 95%; margin: 40px 0px 20px 0px;">
                            <p style="font-size: 20px;">简介:</p>
                            <el-input style="height: 40%;" type="textarea" v-model="docData.intro" class="inputConfig">
                                
                            </el-input>
                        </el-col>
                        <el-col :span="24" style="height: 30%; width: 95%; margin: 40px 0px 20px 0px;">
                            <el-row style="float: right;">
                                <el-button round type="danger" @click="deleteDoc">移入回收站</el-button>
                                <el-button round type="primary" @click="cancelEdit">返回</el-button>
                                <el-button round type="primary" @click="goDetail">详情页面</el-button>
                                <el-button round type="primary" @click="saveEdit">保存</el-button>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
        </el-main>
    </el-container>
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
                    	options: [7,9,11,12,14,16,18,20,22,24,26,28,36,48,64],
                    	supportAllValues: true
                    },
                	toolbar: ['heading', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'alignment', '|', 'numberedList', 'bulletedList', '|', 'indent', 'outdent', '|', 'link', 'blockQuote', 'image', 'imageUpload', 'insertTable', '|', 'undo', 'redo'],
                	ckfinder: {
                        uploadUrl: '/apis/doc/upload_file',
                        name: 'file',
                    },
                    
      	             
                },
                docData: {
                    id: '',
                    createId: '',
                    createTime: '',
                    lastTime: '',
                    text: '',
                    status: '',
                    title: '',
                    intro: '',
                    teamId: '',
                    isEdit: ''
                },
                teamTrash: {
                    docId: '',
                    teamId: '',
                },
                value: false,
                // ...
            };
        },
        mounted() {
            window.onbeforeunload = e => {      //刷新时弹出提示
                if(this.docData.isEdit == 0){
                    this.$http.get("/team/canceledit?teamdocId=" + this.docData.id).then(
                    function(res) {
                        console.log(res);
                    })
                }
               return ''; 
            };
        },
        created() {
            this.getDocData();
            let __this = this
            this.$http.get("/team/checkedit?teamdocId=" + this.$route.params.id).then(
                function(res) {
                    console.log(res);
                    if(res.data != "success"){
                        __this.$router.back();   
                        __this.$message({
                            type: 'error',
                            message: '他人正在编辑，请稍后再试',
                        });
                    }
                }
            );
        },
        beforeDestroy() {
            if(this.docData.isEdit == 0){
                this.$http.get("/team/canceledit?teamdocId=" + this.docData.id).then(
                    function(res) {
                        console.log(res);
                    }
                )
            }
        },
        watch:{
          '$router':'getParams',
            value(val, oldVal){
                if(val == false){
                    var contentDiv = document.getElementById("contentDiv");
                    var infoDiv = document.getElementById("infoDiv");
                    contentDiv.style["left"] = "50%";
                    infoDiv.style["left"] = "150%";
                }else{
                    var contentDiv = document.getElementById("contentDiv");
                    var infoDiv = document.getElementById("infoDiv");
                    contentDiv.style["left"] = "-50%";
                    infoDiv.style["left"] = "50%";
                }
            }
        },
        methods: {
            onReady( editor )  {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
                //console.log(Array.from( editor.ui.componentFactory.names() ));
            },
            getDocData() {
                this.$http.get('/team/getteamdoc', {
                    params: { DocId: this.$route.params.id }
                }).then(res =>{
                    console.log(res);
                    this.docData.id = res.data.id;
                    this.docData.createId = res.data.createId;
                    this.docData.createTime = res.data.createTime;
                    this.docData.lastTime = res.data.lastTime;
                    this.docData.text = res.data.text;
                    this.docData.status = res.data.status;
                    this.docData.title = res.data.title;
                    this.docData.intro = res.data.intro;
                    this.docData.teamId = res.data.teamId;
                    this.docData.isEdit = res.data.isedit;
                    this.teamTrash.docId = res.data.id;
                    this.teamTrash.teamId = res.data.teamId;

                })
            },
            cancelEdit() {
                this.$router.back();
            },
            saveEdit() {
                let _this=this;
                this.$http.post('/team/editdoc', this.docData).then(
                function(res){
                    console.log(res);
                    if(res.data == "success"){
                        _this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                    } else{
                        _this.$message({
                            type: 'error',
                            message: '保存失败'
                        });
                    }
                });
            },
            deleteDoc() {
                let _this=this;
                this.$http.post('/teamtrash/gototrash', this.docData).then(
                function(res){
                    console.log(res);
                    if(res.data == "success"){
                        _this.$router.push("/TeamDocs?teamid=" + _this.docData.teamId);
                        _this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    } else{
                        _this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                    }
                });
            },
            goDetail() {
                this.$router.push("/teamtext?textid=" + this.docData.id);  
            }
        }
    }
</script>

<style scoped>
.el-container{
        height: 100%;
    }
    .editorStyle{
        height: 78%;
    }
    .el-row-1{
        top: -5%;
        height: 15%;
        width: 80%;
        left: 50%;
        transform: translate(-50%, 0%);
        margin: 10px 0px 0px 0px;
    }
    .el-row-2{
        top: -5%;
        min-height: 85%;
        height: auto;
        width: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
    }
    .titleP{
        font-size: 30px;
    }
    .title-col{
        height: 100%;
    }
    .btn-change{
        position:absolute;
        top: 50%;
        transform: translate(0%, -30%);
        right: 0;
    }
    .info_box{
        width: 90%;
        height: 135%;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 30px;
        position: absolute;
        left: 50%;
        top: 0px;
        transform :translate(-50%, 0%);
        box-shadow: 0px 6px 20px 8px rgba(0, 0, 0, 0.3);
        margin: 10px 0px 10px 0px;
        transition-duration: 0.5s;
    }
    .info_box:hover{
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
      transition-duration: 0.5s;
    }
    .info_box1{
        width: 90%;
        height: 95%;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 30px;
        position: absolute;
        left: 150%;
        top: 0px;
        transform :translate(-50%, 0%);
        box-shadow: 0px 6px 20px 8px rgba(0, 0, 0, 0.3);
        margin: 10px 0px 10px 0px;
        transition-duration: 0.5s;
    }
    .info_box1:hover{
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
      transition-duration: 0.5s;
    }
    .el-main-1{
        padding: 20px 0px 100px 0px;
    }
    .delete-btn{
        position: fixed;
        right: 10%;
        bottom: 8%;
        z-index: 99;
    }
    .delete-btn-part{
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }
    .card-box-s{
        left: 50px;
        margin-top: 30px;
        border-radius: 15px;
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }
    .title-div{
      width: 50%;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: -1px -1px 8px 4px rgba(0, 0, 0, 0.25), inset 0px -2px 5px 2px rgba(255, 255, 255, 0.8);
      text-align: center;
      color: #666;
      transition-duration: 0.15s;
    }
    .title-div:hover{
      background-color: rgba(240, 240, 240, 0.9);
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2), inset 0px -2px 8px 2px rgba(255, 255, 255, 0.7);
      opacity: 1;
      color: #888;
      transition-duration: 0.15s;
    }
    .seBtn{
        position: absolute;
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
    }
    /* .detail-div:hover{
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
        color: #666;
        transition-duration: 0.2s;
    } */
</style>

