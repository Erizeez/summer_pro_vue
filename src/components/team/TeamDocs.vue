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
            <el-col :span="20" :offset="1" v-if="brouseMode==true">
                <el-table :data="TeamDocsList" stripe style="width: 100%">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column prop="title" label="文档名" width="300">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建日期" width="240">
                    </el-table-column>
                    <el-table-column prop="lastTime" label="最后修改日期" v-if="!isTeamTrash">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100" v-if="!isTeamTrash">
                        <template slot-scope="scope">
                            <el-button @click="todoc(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button @click="deletedoc(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160" v-if="isTeamTrash">
                        <template slot-scope="scope">
                            <el-button @click="recoverdoc(scope.row)" type="text" size="small">恢复</el-button>
                            <el-button @click="removedoc(scope.row)" type="text" size="small">永久删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="5" v-for="item in TeamDocsList" :key="item.id" v-if="brouseMode==false">
                <el-card :span="5" :body-style="{ padding: '0px' }" shadow="hover" class="box">
                    <img src="../../assets/home/card-bg2.jpg" class="image"
                        style="width: 100%; height:200px; display: block">
                    <div style="padding: 14px;">
                        <span>{{item.title}} </span>
                        <div class="bottom clearfix" v-if="!isTeamTrash">
                            <el-button type="text" class="button" @click="todoc(item.id)">进入文档</el-button>
                            <el-button type="text" class="button" @click="deletedoc(item)">删除文档</el-button>
                        </div>
                        <div class="bottom clearfix" v-if="isTeamTrash">
                            <el-button type="text" class="button" @click="recoverdoc(item)">恢复文档</el-button>
                            <el-button type="text" class="button" @click="removedoc(item)">永久删除</el-button>
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
                TeamDocsList: [

                ],
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
    .box {
        margin-top: 30px;
    }

    .boxes {
        position: relative;
        left: 7%;
    }

    .Teamdoc_btns {
        margin-bottom: 20px;
        float: right;
        margin-top: 10px;
        margin-right: 5px;
    }
</style>