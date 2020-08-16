<template>
    <div style="width:93%">
        <el-row :gutter="0">
            <el-radio-group v-model="brouseMode" class="Teamdoc_btns">
                <el-radio-button :label="false">平铺</el-radio-button>
                <el-radio-button :label="true">列表</el-radio-button>
            </el-radio-group>
            <el-button class="Teamdoc_btns" icon="el-icon-delete" @click="isTeamTrash=true" v-if="!isTeamTrash">团队回收站
            </el-button>
            <el-button class="Teamdoc_btns" @click="isTeamTrash=false" v-if="isTeamTrash">返回</el-button>
            <el-popover placement="bottom" width="150" v-model="visible" v-if="!isTeamTrash">
                <div style="margin: 5px">
                    <el-button @click="createEmptyFile">创建空白文档</el-button>

                </div>
                <div style="margin: 5px">
                    <el-button @click="createFromModel">基于模板创建</el-button>
                </div>
                <el-button class="Teamdoc_btns" slot="reference" icon="el-icon-plus">创建新文档</el-button>
            </el-popover>

        </el-row>
        <el-row :gutter="0" style="margin-top: 20px;" class="boxes">
            <el-col :span="24" :offset="1" v-if="brouseMode==true">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="talk-box">
                            <span class="reply">文档名</span>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div>
                            <span class="reply">创建时间</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <span class="reply">修改时间</span>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div>
                            <span class="reply">操作</span>
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </el-col>
            <el-col :span="24" :offset="1">
                <div style="overflow: hidden;" v-for="(item,i) in TeamDocsList" :key="i" v-if="brouseMode==true" class="author-title">
                    <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="talk-box">
                            <span class="reply">{{item.title}}</span>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div>
                            <span class="reply">{{item.createTime}}</span>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div>
                            <span class="reply">{{item.lastTime}}</span>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div>
                            <el-button v-if="!isTeamTrash" size="small" type="primary" icon="el-icon-search" circle @click="todoc(item.id)"></el-button>
                            <el-button v-if="!isTeamTrash" size="small" type="danger" icon="el-icon-delete" circle @click="deletedoc(i)"></el-button>

                            <el-button v-if="isTeamTrash" size="small" type="success" icon="el-icon-refresh-left" circle @click="recoverdoc(item)"></el-button>
                            <el-button v-if="isTeamTrash" size="small" type="danger" icon="el-icon-delete" circle @click="removedoc(item)"></el-button>
                        </div>
                    </el-col>
                    </el-row>
                    <el-divider></el-divider>
                </div>
            </el-col>
            <el-col style="width: 25%; margin: 0px 0px 25px 0px;left:0px;" :span="5" v-if="brouseMode==false" v-for="(item,index) in TeamDocsList" :key="item.id">
                <el-card :span="5" :body-style="{ padding: '0px' }" shadow="hover" class="card-box-s">
                    <img src="../../assets/home/card-bg.jpg" class="image"
                        style="width: 100%; height:60%; display: block">
                    <div style="padding: 14px;">
                        <div style="text-align: center; margin-bottom: 5%;">{{item.title}} </div>
                        <div class="bottom clearfix">
                            <div v-if="!isDelete" style="">
                                <el-button v-if="!isTeamTrash" type="primary" style="float: left;  margin-bottom: 5%;" circle plain class="button" icon="el-icon-search" @click="todoc(item.id)">
                                </el-button>
                                <el-button v-if="isTeamTrash" type="success" style="float: left;  margin-bottom: 5%;" circle plain class="button" icon="el-icon-refresh-left" @click="recoverdoc(item)">
                                </el-button>
                                <el-button v-if="!isTeamTrash" type="danger" style="float: right;" circle plain class="button" icon="el-icon-delete"
                                    @click="deletedoc(item)">
                                </el-button>
                                <el-button v-if="isTeamTrash" type="danger" style="float: right;" circle plain class="button" icon="el-icon-delete"
                                    @click="removedoc(item)">
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                TeamDocsList: [],
                brouseMode: false,
                teamid: "",
                visible: false,
                isTeamTrash: false
            }
        },
        created() {
            this.teamid = this.$route.query.teamid;
            this.getTeamDocs();
        },
        watch: {
            $route() {
                this.teamid = this.$route.query.teamid;
            },
            teamid() {
                this.getTeamDocs();
                this.isTeamTrash = false;
            },
            isTeamTrash() {
                if (this.isTeamTrash == true) {
                    this.getTrashDocs();
                }
                else {
                    this.getTeamDocs();
                }
            }
        },
        methods: {
            getTeamDocs() {
                this.$http.get('/team/teamdoclist?teamId=' + this.teamid).then(res => {
                    console.log(res);
                    if (res.status !== 200) {
                        return this.$message.error('获取失败');
                    }
                    this.TeamDocsList = res.data;
                })
            },
            getTrashDocs() {
                this.$http.get('/teamtrash/getlist?teamId=' + this.teamid).then(res => {
                    if (res.status !== 200) {
                        return this.$message.error('获取失败');
                    }
                    this.TeamDocsList = res.data;
                })
            },
            todoc(id) {
                console.log(id);
                this.$router.push({
                    path: '/teamtext',
                    query: {
                        textid: id
                    }
                });
            },
            deletedoc(item) {
                this.$http.post('/teamtrash/gototrash', item).then(res => {
                    if (res.data == "success") {
                        this.$message.success("删除成功，你依旧可以在团队回收站看到它！");
                        this.getTeamDocs();
                    }
                    else {
                        this.$message.error("删除失败！");
                    }
                })
            },
            createEmptyFile() {
                this.$router.push('/teamdocadd/' + this.teamid);
            },
            createFromModel() {
                this.$router.push({
                    path: '/CreateFromModel',
                    query: {
                        teamid: this.teamid
                    }
                })
            },
            recoverdoc(item){
                this.$http.post('/teamtrash/recover', item).then(res => {
                    if (res.data == "success") {
                        this.$message.success("恢复成功！");
                        this.getTrashDocs();
                    }
                    else {
                        this.$message.error("恢复失败！");
                    }
                })
            },
            removedoc(item){
                this.$http.post('/teamtrash/gototrash/delete', item).then(res => {
                    if (res.data == "success") {
                        this.$message.success("永久删除成功！");
                        this.getTrashDocs();
                    }
                    else {
                        this.$message.error("永久删除失败！");
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-card{
        width: 160px;
        height: 330px;
    }
    .boxes{
        padding-left: 10px;
    }
    .box {
        left: 50px;
        margin-top: 30px;
        border-radius: 15px;
        box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    }
    .Teamdoc_btns {
        margin-bottom: 20px;
        float: right;
        margin-top: 10px;
        margin-right: 5px;
    }
    .card-box-s{
        left: 50px;
        margin-top: 0px;
        height: 30%;
        width: 80%;
        border-radius: 15px;
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
    }
</style>