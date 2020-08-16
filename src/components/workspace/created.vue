<template>
    <el-container>
        <el-main class="el-main-1">
            <el-row class="delete-btn" v-if="brouseMode==false">
                <el-button class="delete-btn-part" circle type="danger" @click="deleteMode" v-if="!isDelete" icon="el-icon-delete" style="float:right"></el-button>
                <el-button class="delete-btn-part" round @click="deleteMode" v-if="isDelete" style="float:right">取消</el-button>
                <el-button class="delete-btn-part" round type="danger" @click="deleteAll" v-if="isDelete" style="float:right;margin-right: 5px;">确认删除
                </el-button>
            </el-row>

            <el-row class="el-row-1">
                <el-col class="title-col" :span="12">
                    <div class="title-div">
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
                    

                    <el-row :gutter="50" style="padding-left: 50px; margin-top: 20px; overflow: hidden;position: relative;">
                        <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
                        <div style="overflow: hidden;" v-if="brouseMode==true" class="author-title">
                            <el-row :gutter="20">
                            <el-col :span="4">
                                <div>
                                    <span class="author-name">序号</span>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="talk-box">
                                    <span class="reply">文档名</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <span class="reply">创建时间</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <span class="reply">修改时间</span>
                                </div>
                            </el-col>
                            <el-col :span="1">
                                <div>
                                    <span class="reply">查看</span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div>
                                    <span class="reply">删除</span>
                                </div>
                            </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        </el-col>
                        <el-col :span="24" style="width: 95%; margin: 0px 0px 20px 0px;">
                        <div style="overflow: hidden;" v-for="(item,i) in createdlist" :key="i" v-if="brouseMode==true" class="author-title">
                            <el-row :gutter="20">
                            <el-col :span="4">
                                <div>
                                    <span class="author-name">{{i+1}}</span>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="talk-box">
                                    <span class="reply">{{item.title}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <span class="reply">{{item.createTime}}</span>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div>
                                    <span class="reply">{{item.lastTime}}</span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div>
                                    <el-button type="primary" icon="el-icon-search" circle @click="editComment(i)"></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteComment(i)"></el-button>
                                </div>
                            </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        </el-col>
                        <el-col style="width: 18%; margin: 0px 0px 20px 0px;left:0px;" :span="5" v-if="brouseMode==false" v-for="(item,index) in createdlist" :key="item.id">
                            <el-card :span="5" :body-style="{ padding: '0px' }" shadow="hover" class="card-box-s">
                                <img src="../../assets/home/card-bg.jpg" class="image"
                                    style="width: 100%; height:200px; display: block">
                                <div style="padding: 14px;">
                                    <div style="text-align: center; margin-bottom: 5%;">{{item.title}} </div>
                                    <div class="bottom clearfix">
                                        <div v-if="!isDelete" style="">
                                            <el-button size="small" type="primary" style="float: left;  margin-bottom: 5%;" round plain class="button" @click="todoc(item.id)">进入文档
                                            </el-button>

                                            <el-button size="small" type="danger" style="float: right;" round plain class="button" icon="el-icon-delete"
                                                @click="deleteFile(index)">删除
                                            </el-button>
                                        </div>
                                        <el-button type="danger" icon="el-icon-delete" circle
                                            v-if="isDelete&&deleteIndex[index].show" @click="deleteMark(index)"></el-button>
                                        <el-button icon="el-icon-delete" circle v-if="isDelete && !deleteIndex[index].show"
                                            @click="deleteMark(index)"></el-button>
                                    </div>
                                </div>

                            </el-card>
                        </el-col>
                    </el-row>
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
        //color: #555;
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
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 30px;
        position: absolute;
        left: 50%;
        top: 0px;
        transform :translate(-50%, 0%);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        margin: 10px 0px 50px 0px;
        transition-duration: 0.5s;
    }
    .info_box:hover{
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
</style>