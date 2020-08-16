<template>
    <div class="model_container">
        <el-card class="box-card">
            <el-tabs :tab-position="tabPosition">

                <el-tab-pane label="系统模板">
                    <el-table :data="systemModels" stripe style="width: 950px; left: 10%">

                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="name" label="模板名" width="600" style="text-align: center">
                        </el-table-column>
                        <el-table-column prop="content" label="操作" width="300px">

                            <template slot-scope="scope">
                                <el-button type="info" style="margin:0 auto" @click="showSystemModel(scope.row)"
                                    icon="el-icon-view">预览
                                </el-button>
                                <el-button type="primary" style="margin:0 auto" @click="useModel(scope.row)">使用模板创建文档</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="我的模板">
                    <div v-if="MyModels.length==0">
                        <span>还没有自定义模板，快将觉得满意的文件添加为模板吧！</span>
                    </div>
                    <el-table :data="MyModels" stripe style="width: 1050px; left: 10%" v-if="MyModels.length>0">
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="name" label="模板名" width="600" style="text-align: center">
                        </el-table-column>
                        <el-table-column prop="content" label="操作" width="400px">

                            <template slot-scope="scope">
                                <el-button type="info" style="margin:0 auto" @click="" @click="showMyModel(scope.row)"
                                    icon="el-icon-view">预览
                                </el-button>
                                <el-button type="primary" style="margin:0 auto" @click="useModel(scope.row)">使用模板创建文档</el-button>
                                <el-button type="danger" style="margin:0 auto" @click="deleteModel(scope.$index)">删除模板
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table>
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
                systemModels: [{ name: "系统模板1" }],
                MyModels: [],
                dialogVisible: false,
                dialogcontent: '',
                editor:DecoupledEditor,
                editorConfig: {
                    // The configuration of the editor.
                    language: "zh-cn",
                    fontSize: {
                    	options: [5,5.5,6.5,7.5,8,9,10,10.5,11,12,14,16,18,20,22,24,26,28,36,48,72],
                    	supportAllValues: true
                    },
					toolbar: [ 'restrictedEditingException'],
                	//toolbar: ['exportWord', heading', 'fontFamily', 'fontSize', 'fontColor', 'bold', 'italic', 'underline', 'strikeThrough', 'alignment', 'numberedList', 'bulletedList', 'increaseIndent', 'decreaseIndent', 'link', 'blockQuote', 'image', 'insertTable', 'undo', 'redo'],
                	ckfinder: {
                        uploadUrl: '/apis/doc/upload',
                    },
      	
                },
            }
        },
        created() {
            this.getmodels();
        },
        methods: {
            getmodels() {
                this.$http.get('/doc/getModelList?accountId=' + localStorage.getItem('userid')).then(res => {
                    console.log(res);
                    this.MyModels = res.data;
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
            useModel(item){
                this.$router.push({
                    path:'/add',
                    query:{
                        model:item.content
                    }
                })
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
            onReady( editor )  {
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
    .editorStyle{
		width: 100%;
		height: 100%;
        //overflow-y: hidden;
	}
</style>