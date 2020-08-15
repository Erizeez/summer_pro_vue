<template>
    <div id="app" class="divConfig1">
        <el-container>
            <el-header class="headConfig">
                <div class="divConfig2">
                    <el-input v-model="docData.title">
                        <template slot="prepend">文档名</template> 
                    </el-input>
                </div>
            </el-header>
            <el-main class="mainConfig">
                <el-input v-model="docData.intro" class="inputConfig">
                    <template slot="prepend">简介</template>
                </el-input>
                <ckeditor :editor="editor" v-model="docData.text" :config="editorConfig" @ready="onReady" class="editorStyle">{{this.$route.params.id}}</ckeditor>
            </el-main>
            <el-footer class="footerConfig">
                <el-button type="danger" @click="deleteDoc">移入回收站</el-button>
                <el-button type="primary" @click="cancelEdit">返回</el-button>
                <el-button type="primary" @click="goDetail">详情页面</el-button>
                <el-button type="primary" @click="saveEdit">保存</el-button>
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
                    intro: ''
                }
                // ...
            };
        },
        created() {
          this.getDocData();
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
                this.$http.get('/doc/read', {
                    params: { id: this.$route.params.id }
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
                })
            },
            cancelEdit() {
                this.$router.back();
            },
            saveEdit() {
                let _this=this;
                this.$http.post('/doc/edit', this.docData).then(
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
                this.$http.post('/doc/gototrash', this.docData).then(
                function(res){
                    console.log(res);
                    if(res.data == "success"){
                        _this.$router.back();
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
                this.$router.push("/text?textid=" + this.docData.id);  
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
        box-sizing: border-box;
    }
    .mainConfig{
        width: 100%;
        height: 80%;
        background-color: #fff;
        overflow-x: hidden; 
     //   overflow-y: hidden;
    }
    .footerConfig{
        right: 0px;
        padding: 10px 10px 10px 10px;
        text-align: right;
    }
</style>

