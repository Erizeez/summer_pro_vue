<template>
    <div id="app" class="divConfig1">
        <el-container>
            <el-header class="headConfig">
                <div class="divConfig2">
                    <el-input v-model="docData.title" readonly>
                        <template slot="prepend">文档名</template>
                    </el-input>
                </div>
            </el-header>
            <el-main class="mainConfig">
                <ckeditor :editor="editor" v-model="docData.text" :config="editorConfig" @ready="onReady" class="editorStyle">{{this.$route.params.id}}</ckeditor>
            </el-main>
            <el-footer class="footerConfig">
                <el-button type="primary" @click="exportWord()">导出doc</el-button>
                <el-popover placement="bottom" trigger="click">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div id="qrCode" ref="qrCodeDiv"></div>
                        </el-col>
                        <el-col :span="16" :offset="2">
                            <el-row>
                                <el-input v-model="address" :title="address"></el-input>
                            </el-row>
                            <el-row>
                                <br/>
                            </el-row>
                            <el-row :gutter="20" align="bottom">
                                <el-col :span="9" :offset="15">
                                    <el-button type="primary" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                    <el-button type="warning" slot="reference">分享</el-button>
                </el-popover>
                <el-button type="primary" @click="goBack">返回</el-button>
                <el-button type="primary" @click="goDetail">详情页面</el-button>
                <el-button type="primary" @click="goEdit">编辑</el-button>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
	import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js'
	import QRCode from 'qrcodejs2';

const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <figure class="image"><img src="http://localhost:8080/summer_pro_ssm/resources/upload/1597308266601.png"></figure><figure class="image"><img src="http://localhost:8080/summer_pro_ssm/resources/upload/1597308270489.jpeg"></figure><blockquote><p>sadasdas<span style="font-size:48px;">dasd<strong>dd</strong><i><strong>dddd<u>ddddd</u></strong><s><strong><u>ddd</u></strong></s></i></span><span style="color:hsl(60, 75%, 60%);font-size:48px;"><i><s><strong><u>ddd</u></strong></s></i></span><span style="background-color:hsl(0, 0%, 60%);color:hsl(60, 75%, 60%);font-size:48px;"><i><s><strong><u>dddd</u></strong></s></i></span></p></blockquote>
</body>
</html>`

export default {
        name: 'app',
        data() {
            return {
                editor: DecoupledEditor,
                address: '',
                editorConfig: {
                    // The configuration of the editor.
                    language: "zh-cn",
                    fontSize: {
                    	options: [5,5.5,6.5,7.5,8,9,10,10.5,11,12,14,16,18,20,22,24,26,28,36,48,72],
                    	supportAllValues: true
                    },
					toolbar: [ 'restrictedEditingException'],
                	//toolbar: [heading', 'fontFamily', 'fontSize', 'fontColor', 'bold', 'italic', 'underline', 'strikeThrough', 'alignment', 'numberedList', 'bulletedList', 'increaseIndent', 'decreaseIndent', 'link', 'blockQuote', 'image', 'insertTable', 'undo', 'redo'],
                	ckfinder: {
                        uploadUrl: '/apis/doc/upload',
                    }
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
            this.getDocData();
            this.address = window.location.href;
        },
        mounted() {
            this.$nextTick(function () {
                this.bindQRCode();
            })
        },
        methods: {
            onReady( editor )  {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                    editor.isReadOnly = true,
                );
            },
            bindQRCode: function () {
                new QRCode(this.$refs.qrCodeDiv, {
                    text: window.location.href,
                    width: 100,
                    height: 100,
                    colorDark: "#333333", //二维码颜色
                    colorLight: "#ffffff", //二维码背景色
                    correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                })
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
                })
            },
            goBack() {
                this.$router.back();
            },
            goEdit() {
                this.$router.push("/teamdocedit/" + this.docData.id);
            },
            goDetail() {
                this.$router.push("/teamtext?textid=" + this.docData.id);
            },
            onCopy(e){ 　　 // 复制成功
        　　　　this.$message({
            　　　   message:'复制成功！',
                    type:'success'
    　　　　    })
　　　　    },
　　　　    onError(e){　　 // 复制失败
　　　　　　    this.$message({
　　　　　　        message:'复制失败！',
　　　　　　        type:'error'
　　　　        })
　　        },
            exportWord: function() {
                this.$http.get('/team/exportWord', {
                    params: { id: this.docData.id }
                }).then(res =>{
                    console.log(res);

                    var link = document.createElement('a');
                    link.setAttribute('href', res.data.url);
                    link.setAttribute('download', this.docData.title);
                    link.click();
                    //释放内存
                    window.URL.revokeObjectURL(link.href);
                })
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

