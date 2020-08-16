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

                    <el-button type="warning" slot="reference" @click="showshare">分享</el-button>
                </el-popover>
                <el-button type="primary" @click="goBack">返回</el-button>
                <el-button type="primary" @click="goDetail">详情页面</el-button>
                <el-button type="primary" @click="goEdit">编辑</el-button>
            </el-footer>



    <el-dialog class="editdialog" title="编辑团队成员权限" :visible.sync="showShare" @close="closeDialog">
        <el-form style="height:300px">
          <el-form-item label="权限设置:" style="margin-left: 10%;">
            <br>
            <el-checkbox-group v-model="rights.select">
              <el-checkbox v-for="(item,index) in rights.type" :key="index" :label="item.name"></el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" @click="editAuth" style="margin-top:25px">确认分享</el-button>
          </el-form-item>


            <el-col >
                请复制分享链接:
                <el-card shadow="hover" style="margin-bottom:30px; margin-top:20px" v-if="showlink">
               {{this.sharelink}}
                </el-card>
            </el-col>

        </el-form>
      </el-dialog>






        </el-container>
    </div>

    
</template>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
	import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js'
	import QRCode from 'qrcodejs2';

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
                    intro: ''
                },
                rights: {
                    type: [
                        {
                        name: '可分享'
                        },
                        {
                        name: '可评论'
                        },
                        {
                        name: '可编辑'
                        }
                    ],
                    select: []
                },
                showShare:false,
                authority:1,
                showlink:false,
                sharelink:"http://localhost:8081/#/text"
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
            goBack() {
                this.$router.back();
            },
            goEdit() {
                this.$router.push("/edit/" + this.docData.id);
            },
            goDetail() {
                this.$router.push("/text?textid=" + this.docData.id);
            },
            onCopy(){ 　　 // 复制成功
        　　　　this.$message({
            　　　   message:'复制成功！',
                    type:'success'
    　　　　    })
　　　　    },
　　　　    onError(){　　 // 复制失败
　　　　　　    this.$message({
　　　　　　        message:'复制失败！',
　　　　　　        type:'error'
　　　　        })
　　        },
            exportWord: function() {
                this.$http.get('/doc/exportWord', {
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
            },
            showshare(){
                this.showShare = true;
            },
            editAuth(){
                this.sharelink = "http://localhost:8081/#/text";
                this.authority = 1;
                for(var i = 0; i < this.rights.select.length; i ++){
                    if(this.rights.select[i]==="可分享"){
                        this.authority += 2
                    }
                    if(this.rights.select[i] === "可评论"){
                        this.authority += 4;
                    }
                    if(this.rights.select[i] === "可编辑"){
                        this.authority += 8;
                    }
                }
                this.rights.select=[];
                console.log(this.authority);
                this.showlink=true;
                this.$http.get('/share/getlink?docId='+this.$route.params.id+'&auth='+this.authority).then(res =>{
                    console.log(res);
                    this.$http.get('/share/sharedoc?uuid='+res.data+'&accountId='+localStorage.getItem('userid')).then(res1 =>{
                        console.log(res1);
                        this.sharelink = this.sharelink + "?textid=" + this.$route.params.id + "&uuid=" + res.data;
                        console.log(this.sharelink);
                    })
                })
            },
            closeDialog(){
                this.showlink = false;//清空数据
            },
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
    }
    .footerConfig{
        right: 0px;
        padding: 10px 10px 10px 10px;
        text-align: right;
    }
</style>

