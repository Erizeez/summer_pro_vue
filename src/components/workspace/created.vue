<template>
    <el-container>
        <el-main class="el-main-1">
            <el-row class="delete-btn" v-if="brouseMode==false">
                <el-button type="danger" @click="deleteMode" v-if="!isDelete" style="float:right">批量删除</el-button>
                <el-button @click="deleteMode" v-if="isDelete" style="float:right">取消</el-button>
                <el-button type="danger" @click="deleteAll" v-if="isDelete" style="float:right;margin-right: 5px;">确认删除
                </el-button>
            </el-row>

            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="grid-content bg-purple-dark">
                        <p class="titleP">已创建的文档</p>
                    </div>
                </el-col>
                <el-col class="title-col" :span="12">
                    <el-radio-group class="btn-change" v-model="brouseMode" style="float:right;">
                        <el-radio-button :label="false">平铺</el-radio-button>
                        <el-radio-button :label="true">列表</el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row class="el-row-2">
                <div class="info_box">





                </div>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                createdlist: [

                ],
                isDelete: false,
                deleteIndex: [],
                brouseMode: false
            }
        },
        created() {
            this.getcollectdoc();
        },
        methods: {
            getcollectdoc() {
                var userId = window.localStorage.getItem('userid');
                this.$http.get('/doc/createlist?accountId=' + userId).then(res => {
                    console.log(res);
                    if (res.status !== 200) {
                        return this.$message.error('获取失败');
                    }
                    this.createdlist = res.data;
                })
            },
            todoc(id) {
                console.log(id);
                this.$router.push({
                    path: '/text',
                    query: {
                        textid: id
                    }
                });
            },
            deleteFile(index) {
                console.log(index);
                this.$http.post('/doc/gototrash', this.createdlist[index]).then(res => {
                    if (res.data === "success") {
                        this.createdlist.splice(index, 1);
                        return this.$message.success('删除成功，你仍能在回收站找到它们');
                    }
                    else {

                    }
                })
            },
            deleteMode() {
                if (!this.isDelete) {
                    var length = this.createdlist.length;
                    for (var i = 0; i < length; i++) {
                        this.deleteIndex.push({ show: false });
                    }
                }
                this.isDelete = !this.isDelete;
            },
            deleteMark(index) {
                this.deleteIndex[index].show = !this.deleteIndex[index].show;
            },
            deleteAll() {
                var length = this.createdlist.length;
                var deleteComplete = true;
                for (var i = length - 1; i >= 0; i--) {
                    if (this.deleteIndex[i].show === true) {
                        this.$http.post('/doc/gototrash', this.createdlist[i]).then(res => {
                            if (res.data === "success") {
                            }
                            else {
                                deleteComplete = false;
                            }
                        })
                    }
                }
                if (deleteComplete) {
                    this.$message.success('删除成功，你仍能在回收站找到它们');
                }
                else {
                    this.$message.success('删除失败');
                }
                this.deleteIndex = [];
                this.isDelete = false;
                this.getcollectdoc();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .box {
        margin-top: 30px;
    }
    .boxes {
        position: relative;
        left: 7%;
    }
    .el-container{
        height: 100%;
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
        color: #555;
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
        height: auto;
        min-height: 800px;
        background-color: #fff;
        border-radius: 30px;
        position: absolute;
        left: 50%;
        top: 0px;
        transform :translate(-50%, 0%);
        box-shadow: 0px 3px 20px 8px rgba(0, 0, 0, 0.3);
        margin: 10px 0px 50px 0px;
    }
    .el-main-1{
        padding: 20px 0px 100px 0px;
    }
    .delete-btn{
        
    }
</style>