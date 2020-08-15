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
                    intro: '',
                    teamId: '',
                }
                // ...
            };
        },
        created() {
            this.docData.createId = window.localStorage.getItem('userid');
          this.getParams();
            this.docData.teamId = this.$route.params.teamid;
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

            cancelAdd() {
                this.$router.back();
            },
            saveAdd() {
                let _this=this;
                let doc = this.docData
                this.$http.post('/team/adddoc', doc).then(
                function(res){
                    console.log(res);
                    if(res.data == "success"){
                        alert("保存成功");
                        //_this.$router.push("/teamtext?textid=" + );
                    } else{
                        alert("保存失败");
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
        padding: 10px 10px 10px 10px;
        text-align: right;
    }
</style>

