<!--<template>
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
</template>-->


<template>
    <el-container>
        <el-main class="el-main-1" style="overflow:-Scroll;overflow-x:hidden">
            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="title-div">
                        <p class="titleP">修改团队文档</p>
                    </div>
                </el-col>
                <el-col class="title-col" :span="12">
                    <el-tooltip class="seBtn" content="切换" placement="top">
                        <el-switch style="display: block" v-model="value" active-color="#13ce66"
                            inactive-color="#13ce66" active-text="基础信息" inactive-text="文档编辑">
                        </el-switch>
                    </el-tooltip>
                </el-col>
            </el-row>
            <el-row class="el-row-2">
                <div class="info_box" id="contentDiv">
                    <el-row :gutter="50"
                        style="height: 100%; padding-left: 50px; margin-top: 20px; overflow: hidden;position: relative;">
                        <el-col :span="24" style="height: 100%; width: 95%; margin: 40px 0px 20px 0px;">
                            <ckeditor :editor="editor" v-model="docData.text" :config="editorConfig" @ready="onReady"
                                class="editorStyle">{{this.$route.params.id}}</ckeditor>
                        </el-col>

                    </el-row>
                </div>
                <div class="info_box1" id="infoDiv">
                    <el-row :gutter="50"
                        style="height: 100%; padding-left: 50px; margin-top: 20px; overflow: hidden;position: relative;">
                        <el-col :span="24" style="height: 5%; width: 95%; margin: 10px 0px 20px 0px;">
                            <p style="font-size: 20px;">文档名:</p>
                            <el-input v-model="docData.title" readonly>
                                <template slot="prepend"></template>
                            </el-input>
                        </el-col>
                        <el-col :span="24" style=" width: 95%; margin: 0px 0px 20px 0px;">
                        </el-col>
                        <el-col :span="24" style="height: 30%; width: 95%; margin: 40px 0px 20px 0px;">
                            <p style="font-size: 20px;">简介:</p>
                            <el-input readonly style="height: 40%;" type="textarea" v-model="docData.intro"
                                class="inputConfig">

                            </el-input>
                        </el-col>
                        <el-col :span="24" style="height: 30%; width: 95%; margin: 40px 0px 20px 0px;">
                            <el-row style="float: right;">
                                <el-button type="primary" @click="exportWord()">导出doc</el-button>

                                <el-button type="primary" @click="goBack">返回</el-button>
                                <el-button type="primary" @click="goDetail">详情页面</el-button>
                                <el-button type="primary" @click="goEdit" :disabled="!canEdit">编辑</el-button>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
        </el-main>
        <!-- <el-dialog class="editdialog" title="编辑团队成员权限" :visible.sync="showShare" @close="closeDialog">
        <el-form style="height:300px">
          <el-form-item label="权限设置:" style="margin-left: 10%;">
            <br>
            <el-checkbox-group v-model="rights.select">
              <el-checkbox v-for="(item,index) in rights.type" :key="index" :label="item.name"></el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" @click="editAuth" style="margin-top:25px">确认分享</el-button>
          </el-form-item>


            <el-col>
                请复制分享链接:
                <el-card shadow="hover" style="margin-bottom:30px; margin-top:20px; width: 80%;" v-if="showlink">
                    {{this.sharelink}}
                </el-card>
            </el-col>

        </el-form>
      </el-dialog> -->
    </el-container>
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
                        options: [5, 5.5, 6.5, 7.5, 8, 9, 10, 10.5, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
                        supportAllValues: true
                    },
                    toolbar: ['restrictedEditingException'],
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
                },
                value: false,
                canEdit: false,
                textid:''
                // ...
            };
        },
        watch: {
            '$router': 'getParams',
            value(val, oldVal) {
                if (val == false) {
                    var contentDiv = document.getElementById("contentDiv");
                    var infoDiv = document.getElementById("infoDiv");
                    contentDiv.style["left"] = "50%";
                    infoDiv.style["left"] = "150%";
                } else {
                    var contentDiv = document.getElementById("contentDiv");
                    var infoDiv = document.getElementById("infoDiv");
                    contentDiv.style["left"] = "-50%";
                    infoDiv.style["left"] = "50%";
                }
            },
            $route() {
                this.textid = this.$route.params.id;
            },
            textid() {
                this.getDocData();
            }
        },
        created() {
            this.textid = this.$route.params.id;
            this.getDocData();
            this.address = window.location.href;
        },
        methods: {
            goBack() {
                this.$router.back();
            },
            goEdit() {
                this.$router.push("/edit/" + this.docData.id);
            },
            onReady(editor) {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                    editor.isReadOnly = true,
                );
            },
            getDocData() {
                this.$http.get('/team/getteamdoc', {
                    params: { DocId: this.textid }
                }).then(res => {
                    this.docData.id = res.data.id;
                    this.docData.createId = res.data.createId;
                    this.docData.createTime = res.data.createTime;
                    this.docData.lastTime = res.data.lastTime;
                    this.docData.text = res.data.text;
                    this.docData.status = res.data.status;
                    this.docData.title = res.data.title;
                    this.docData.intro = res.data.intro;
                    this.docData.teamId = res.data.teamId;
                    this.$http.get('/team/findbelong?accountId=' + window.localStorage.getItem('userid') + '&teamId=' + this.docData.teamId).then(res => {
                        if(res.data.msg=="failed"){
                            this.$router.push("../MyTeams");
                            this.$message.warning("不要偷看别人的文档哟！");
                            return;
                        }
                        if (res.data.belong.authority >= 4) {
                            this.canEdit = true;
                        }
                    })
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
            onCopy(e) { 　　 // 复制成功
                this.$message({
                    message: '复制成功！',
                    type: 'success'
                })
            },
            onError(e) {　　 // 复制失败
                this.$message({
                    message: '复制失败！',
                    type: 'error'
                })
            },
            exportWord: function () {
                this.$http.get('/team/exportWord', {
                    params: { id: this.docData.id }
                }).then(res => {
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
    .el-container {
        height: 100%;
    }

    .editorStyle {
        height: 78%;
    }

    .el-row-1 {
        top: -5%;
        height: 15%;
        width: 80%;
        left: 50%;
        transform: translate(-50%, 0%);
        margin: 10px 0px 0px 0px;
    }

    .el-row-2 {
        top: -5%;
        min-height: 85%;
        height: auto;
        width: 100%;
        left: 50%;
        transform: translate(-50%, 0%);
    }

    .titleP {
        font-size: 30px;
    }

    .title-col {
        height: 100%;
    }

    .btn-change {
        position: absolute;
        top: 50%;
        transform: translate(0%, -30%);
        right: 0;
    }

    .info_box {
        width: 90%;
        height: 135%;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 30px;
        position: absolute;
        left: 50%;
        top: 0px;
        transform: translate(-50%, 0%);
        box-shadow: 0px 6px 20px 8px rgba(0, 0, 0, 0.3);
        margin: 10px 0px 10px 0px;
        transition-duration: 0.5s;
    }

    .info_box:hover {
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
        transition-duration: 0.5s;
    }

    .info_box1 {
        width: 90%;
        height: 95%;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 30px;
        position: absolute;
        left: 150%;
        top: 0px;
        transform: translate(-50%, 0%);
        box-shadow: 0px 6px 20px 8px rgba(0, 0, 0, 0.3);
        margin: 10px 0px 10px 0px;
        transition-duration: 0.5s;
    }

    .info_box1:hover {
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
        transition-duration: 0.5s;
    }

    .el-main-1 {
        padding: 20px 0px 100px 0px;
    }

    .delete-btn {
        position: fixed;
        right: 10%;
        bottom: 8%;
        z-index: 99;
    }

    .delete-btn-part {
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }

    .card-box-s {
        left: 50px;
        margin-top: 30px;
        border-radius: 15px;
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }

    .title-div {
        width: 50%;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: -1px -1px 8px 4px rgba(0, 0, 0, 0.25), inset 0px -2px 5px 2px rgba(255, 255, 255, 0.8);
        text-align: center;
        color: #666;
        transition-duration: 0.15s;
    }

    .title-div:hover {
        background-color: rgba(240, 240, 240, 0.9);
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2), inset 0px -2px 8px 2px rgba(255, 255, 255, 0.7);
        opacity: 1;
        color: #888;
        transition-duration: 0.15s;
    }

    .seBtn {
        position: absolute;
        right: 0px;
        top: 50%;
    }

    .detail-div {
        width: 20%;
        height: 100%;
        border-radius: 10px;
        background-color: rgba(150, 150, 150, 0.05);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        text-align: center;
        color: #666;
        transition-duration: 0.2s;
    }

    .btn-div-1 {
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

    .btn-div-1:active {
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
        color: #666;
    }

    .btn-div-2 {
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

    .btn-div-2:active {
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
        color: #666;
    }

    .titleB {
        font-size: 18px;
    }
</style>