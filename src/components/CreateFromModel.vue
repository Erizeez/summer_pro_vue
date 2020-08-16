<template>
    <div class="model_container">
        <el-card class="box-card">
            <el-tabs :tab-position="tabPosition">

                <el-tab-pane>
                    <span slot="label" class="paneTitle">系统模板</span>
                    <el-row :gutter="20">
                        <el-col :offset="3" :span="2">
                            <div>
                                <span class="tableTitle">序号</span>
                            </div>
                        </el-col>
                        <el-col :span="13">
                            <div class="talk-box">
                                <span class="tableTitle">模板名</span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div>
                                <span class="tableTitle">操作</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>

                    <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
                        <div style="overflow: hidden;" v-for="(item,i) in systemModels" :key="i" class="author-title">
                            <el-row :gutter="20">
                                <el-col :offset="3" :span="2">
                                    <div>
                                        <span class="tablePart">{{i+1}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div>
                                        <span class="tablePart">{{item.name}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div>
                                        <el-button type="info" style="margin:0 auto" @click="showSystemModel(item)" icon="el-icon-view">预览
                                        </el-button>
                                        <el-button type="primary" style="margin:0 auto" @click="useModel(item)">使用模板创建文档
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                    </el-col>

                    <!-- <el-table :data="systemModels" stripe style="width: 950px; left: 10%">
                        
                        <el-divider></el-divider>
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="name" label="模板名" width="600" style="text-align: center">
                        </el-table-column>
                        <el-table-column prop="content" label="操作" width="300px">

                            <template slot-scope="scope">
                                <el-button type="info" style="margin:0 auto" @click="showSystemModel(scope.row)"
                                    icon="el-icon-view">预览
                                </el-button>
                                <el-button type="primary" style="margin:0 auto" @click="useModel(scope.row)">使用模板创建文档
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table> -->
                </el-tab-pane>

                <el-tab-pane style="min-height: 100px;">
                    <span slot="label" class="paneTitle">我的模板</span>
                    

                    <el-row :gutter="20">
                        <el-col :offset="3" :span="2">
                            <div>
                                <span class="tableTitle">序号</span>
                            </div>
                        </el-col>
                        <el-col :span="13">
                            <div class="talk-box">
                                <span class="tableTitle">模板名</span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div>
                                <span class="tableTitle">操作</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <div v-if="MyModels.length==0" style="text-align: center;position: relative; top: 50%;">
                        <span style="font-size: 30px; color: #888;">还没有自定义模板，快将觉得满意的文件添加为模板吧！</span>
                    </div>
                    <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
                        <div style="overflow: hidden;" v-for="(item,i) in MyModels" :key="i" class="author-title">
                            <el-row :gutter="20">
                                <el-col :offset="3" :span="2">
                                    <div>
                                        <span class="tablePart">{{i+1}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="11">
                                    <div>
                                        <span class="tablePart">{{item.name}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div>
                                        <el-button type="info" style="margin:0 auto" @click="showSystemModel(item)" icon="el-icon-view">预览
                                        </el-button>
                                        <el-button type="primary" style="margin:0 auto" @click="useModel(item)">使用模板创建文档
                                        </el-button>
                                        <el-button type="danger" style="margin:0 auto" @click="deleteModel(i)">删除模板
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog title="预览" :visible.sync="dialogVisible" width="80%" :append-to-body="true">
            <ckeditor :editor="editor" v-model="dialogcontent" :config="editorConfig" @ready="onReady"
                class="editorStyle"></ckeditor>
        </el-dialog>
    </div>
</template>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
    import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js'

    export default {
        data() {
            return {
                tabPosition: 'left',
                systemModels: [],
                MyModels: [],
                dialogVisible: false,
                dialogcontent: '',
                editor: DecoupledEditor,
                editorConfig: {
                    // The configuration of the editor.
                    language: "zh-cn",
                    fontSize: {
                        options: [5, 5.5, 6.5, 7.5, 8, 9, 10, 10.5, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
                        supportAllValues: true
                    },
                    toolbar: ['restrictedEditingException'],
                    //toolbar: ['exportWord', heading', 'fontFamily', 'fontSize', 'fontColor', 'bold', 'italic', 'underline', 'strikeThrough', 'alignment', 'numberedList', 'bulletedList', 'increaseIndent', 'decreaseIndent', 'link', 'blockQuote', 'image', 'insertTable', 'undo', 'redo'],
                    ckfinder: {
                        uploadUrl: '/apis/doc/upload',
                    },

                },
                teamid: ''
            }
        },
        created() {
            this.getmodels();
            this.teamid = this.$route.query.teamid;
            console.log(this.teamid);
        },
        methods: {
            getmodels() {
                this.$http.get('/doc/getModelList?accountId=' + localStorage.getItem('userid')).then(res => {
                    this.MyModels = res.data;
                })
                this.$http.get('/doc/getSystemModel?accountId='+localStorage.getItem('userid')).then(res=>{
                    this.systemModels=res.data;
                })
            },
            showSystemModel(item) {
                this.dialogVisible = true;
                this.dialogcontent = item.content;
            },
            showMyModel(item) {
                this.dialogVisible = true;
                this.dialogcontent = item.content;
            },
            useModel(item) {
                if (this.teamid == null) {
                    this.$router.push({
                        path: '/add',
                        query: {
                            model: item.content
                        }
                    })
                }
                else {
                    this.$router.push({
                        path: '/teamdocadd/' + this.teamid,
                        query: {
                            model: item.content
                        }
                    })
                }
            },
            deleteModel(item) {
                this.$http.get('/doc/delmodel?modelId=' + this.MyModels[item].id).then(res => {
                    console.log(res);
                    if (res.data === "success") {
                        this.$message.success('删除成功');
                        this.MyModels.splice(item, 1);
                    }
                    else this.$message.error('删除失败');
                })
            },
            onReady(editor) {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                    editor.isReadOnly = true,
                );
            }
        }
    }
</script>

<style>
    .editorStyle {
        width: 100%;
        height: 100%;
        //overflow-y: hidden;
    }
    .box-card{
        width: 90%;
    min-height: 600px;
    box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 100px;
    transform :translate(-50%, 0%);
    }
    .tableTitle{
        font-size: 20px;
        font-weight: bold;
        color: #888;
    }
    .tablePart{
        font-size: 20px;
        //font-weight: bold;
        color: #666;
    }
    .paneTitle{
        font-size: 20px;
        ///font-weight: bold;
        color: #888;
    }
</style>