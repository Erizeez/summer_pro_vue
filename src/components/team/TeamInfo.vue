<template>
    <el-container class="TeamInfo_container">
        <div style="width: 70%;">
            <router-view></router-view>
        </div>
        <div style="width: 29%;" class="TeamInfo_main">
            <h3>团队信息
                <el-button style="margin-left:50px;" round v-if="changeMode" type="primary" @click="submit">确认</el-button>
                <el-button round v-if="changeMode" @click="toChange">取消</el-button>
                <el-button style="float:right;" size="mini" round type="info" icon="el-icon-edit" class="TeamInfo_main_title_btn"
                    v-if="!changeMode&& isCreator" @click="toEdit">修改团队信息</el-button>
            </h3>
            <el-form ref="editForm" :model="editForm" :rules="rules" label-width="50%">
                <el-form-item label="团队名：" prop="name" v-if="changeMode">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="团队名：" v-if="!changeMode">
                    <div v-if="!changeMode">{{teamInfo.name}}</div>
                </el-form-item>
                <el-form-item label="创建者：">
                    {{creatorName}}
                </el-form-item>
                <el-form-item label="团队介绍:">
                </el-form-item>
            </el-form>
            <el-card class="Team_intro" shadow="hover">
                <span v-if="!changeMode" class="Team_intro_show">
                    {{teamInfo.introduction||"暂无"}}</span>
                <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入内容" v-model="editForm.introduction"
                    v-if="changeMode">
                </el-input>
            </el-card>
            <div class="changeTeamInfo_confirm">
                <el-popconfirm confirmButtonText='是的' cancelButtonText='算了' icon="el-icon-info" iconColor="red"
                    title="确定要进行此操作吗" @onConfirm="deleteOrQuit">
                    <el-button round slot="reference" type="danger" v-if="!isCreator">退出团队</el-button>
                    <el-button round slot="reference" type="danger" v-if="isCreator">解散团队</el-button>
                </el-popconfirm>
            </div>
        </div>
    </el-container>
</template>


<script>
    export default {
        data() {
            return {
                teamInfo: {},
                teamid: "",
                creatorName: "",
                changeMode: false,
                editForm: {
                    name: "",
                    introduction: ""
                },
                rules: {
                    name: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
                },
                isCreator: false
            }
        },
        mounted() {
            this.teamid = this.$route.query.teamid;
            this.getInfo();
        },
        watch: {
            $route() {
                this.teamid = this.$route.query.teamid;
            },
            teamid(){
                this.getInfo();
            }
        },
        methods: {
            getInfo() {
                this.$http.get("/team/getteam?teamId=" + this.teamid).then(res => {
                    this.teamInfo = res.data;
                    if (this.teamInfo.creatorId == window.localStorage.getItem('userid')) {
                        this.isCreator = true;
                    }
                    this.$http.get("/account/search?id=" + this.teamInfo.creatorId).then(res => {
                        this.creatorName = res.data.name;
                    })
                })

            },
            handleClick(index) {
                console.log(this.activeName);
                if (this.activeName == "1") {
                    this.$router.push({
                        path: '/TeamInfo',
                        query: {
                            teamid: this.teamid
                        }
                    })
                }
                else if (this.activeName == "2") {
                    this.$router.push({
                        path: '/random',
                        query: {
                            teamid: this.teamid
                        }
                    })
                }
                else {
                    console.log("error");
                }
            },
            toChange() {
                this.changeMode = !this.changeMode;
            },
            toEdit() {
                this.editForm.id = this.teamInfo.id;
                this.editForm.creatorId = this.teamInfo.creatorId;
                this.editForm.name = this.teamInfo.name;
                this.editForm.introduction = this.teamInfo.introduction;
                this.toChange();
            },
            submit() {
                if (this.editForm.name == "") {
                    this.$message.error("团队名称不能为空");
                }
                else {
                    this.$http.post('/team/editteam?', this.editForm).then(res => {
                        if (res.data == "success") {
                            this.$message.success("修改成功");
                            this.teamInfo.name = this.editForm.name;
                            this.teamInfo.introduction = this.editForm.introduction;
                            this.toChange();
                        }
                        else {
                            this.$message.error("修改失败");
                        }
                    })
                }
            },
            deleteOrQuit() {
                if (this.isCreator == true) {
                    this.$http.post('/team/destroy', this.teamInfo).then(res => {
                        if (res.data == "success") {
                            this.$message.success("解散团队成功！");
                            this.$router.push("/TeamAside");
                        }
                        else {
                            this.$message.error("解散失败");
                        }
                    })
                }
                else {
                    this.$http.get('/team/quit?accountId=' + window.localStorage.getItem('userid') + '&teamId=' + this.teamid).then(res => {
                        if (res.data == "success") {
                            this.$message.success("退出团队成功！");
                            this.$router.push("/TeamAside");
                        }
                        else {
                            this.$message.error("退出失败");
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .TeamInfo_container {
        height: auto;
        min-height: 500px;
        border: 1px solid #eee;
    }
    .TeamInfo_main {
        
    }
    .TeamInfo_main_title_btn {
        //float: right;
        //margin-top: -5px
    }

    .Team_intro {
        margin-left: 25px;
        margin-right: 10px;
        font-size: 12px;
        height: 200px;
        background-color: rgba(0, 0, 0, 0);
    }

    .Team_intro_show {
        margin-left: 5px;
        margin-right: 5px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }

    .TeamInfo_change {
        /* margin-left: 20px;
        margin-top: 10px */
    }

    .changeTeamInfo_confirm {
        position: fixed;
        right: 1%;
        bottom: 2%;
    }
</style>