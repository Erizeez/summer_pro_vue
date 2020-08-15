<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset=3>
                <el-card class="box-card">
                    <h1>我创建的团队
                        <el-button type="primary" icon="el-icon-plus" style="float:right">创建新团队</el-button>
                    </h1>
                    <el-divider></el-divider>
                    <div v-if="createdTeam.length==0">
                        <span stype="font-size:large">还没创建过团队？快点击创建吧！</span>
                    </div>
                    <div>
                        <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item v-for="(item,index) in createdTeam" :title="item.name" :name="index"
                                :key="index">
                                <el-container style="height: 600px; border: 1px solid rgba(0, 0, 0, 0.109)">
                                    <el-container>
                                        <el-aside width="30%">
                                            <el-container>

                                                <el-main>
                                                    <el-card class="box-card">
                                                        <el-table :data="createdTeam[index].members" style="width: 100%"
                                                            height="400">
                                                            <el-table-column prop="name" label="成员管理"
                                                                style="width:100%">
                                                            </el-table-column>
                                                            <el-table-column label="操作" width="100">
                                                                <template slot-scope="scope">
                                                                    <el-button size="mini" type="danger" fixed="right"
                                                                        @click="">踢出
                                                                    </el-button>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </el-card>
                                                </el-main>
                                            </el-container>
                                        </el-aside>
                                        <el-container>
                                            <el-header style="text-align:right" height="40px">
                                                <div style="margin-top:10px"></div>
                                                <el-button icon="el-icon-plus">添加新文档</el-button>
                                                <el-button type="info" @click="dialogFormVisible = true">修改团队信息
                                                    <el-dialog title="团队信息修改" :visible.sync="dialogFormVisible"
                                                        :append-to-body="true">
                                                        <el-form :model="form">
                                                            <el-form-item label="团队名称" :label-width="formLabelWidth">
                                                                <el-input v-model="form.name" autocomplete="off">
                                                                </el-input>
                                                            </el-form-item>
                                                            <el-form-item label="团队介绍" :label-width="formLabelWidth">
                                                                <el-input type="textarea" :rows="2" placeholder="请输入内容"
                                                                    v-model="form.introduction">
                                                                </el-input>
                                                            </el-form-item>
                                                        </el-form>
                                                        <div slot="footer" class="dialog-footer">
                                                            <el-button @click="dialogFormVisible = false">取 消
                                                            </el-button>
                                                            <el-button type="primary"
                                                                @click="dialogFormVisible = false">确 定</el-button>
                                                        </div>
                                                    </el-dialog>
                                                </el-button>
                                                <el-button type="info">邀请/复制邀请连接</el-button>
                                                <el-popconfirm confirmButtonText='是的' cancelButtonText='算了'
                                                    icon="el-icon-info" iconColor="red" title="确定要删除该团队吗" @onConfirm="">
                                                    <el-button slot="reference" type="danger">删除团队</el-button>
                                                </el-popconfirm>
                                            </el-header>
                                            <el-main>
                                                <el-card class="box-card">
                                                    <el-table :data="createdTeam[index].docs"
                                                        style="width: 100%;height: 360px;">
                                                        <el-table-column prop="name" label="团队文档" style="width:100%">
                                                        </el-table-column>
                                                        <el-table-column label="操作" width="200">
                                                            <template slot-scope="scope">
                                                                <el-button type="text" icon="el-icon-view">查看详细信息
                                                                </el-button>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </el-card>

                                            </el-main>
                                        </el-container>
                                    </el-container>
                                    <el-footer height="100px">
                                        <div
                                            style="height:90%;width:100%;border:1px inset pink;border-radius: 4px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                            <span>{{item.introduction}}</span>
                                        </div>

                                    </el-footer>
                                </el-container>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="18" :offset=3>
                <el-card class="box-card">
                    <h1>我加入的团队</h1>
                    <el-divider></el-divider>
                    <div v-if="joinedTeam.length==0">
                        <span stype="font-size:large">还没有加入任何团队，可通过收到团队创建者的邀请来加入！</span>
                    </div>
                    <div>
                        <el-collapse v-model="activeNamesjoined" @change="handleChange">
                            <el-collapse-item v-for="(item,index) in joinedTeam" :title="item.name" :name="index"
                                :key="index">
                                <el-container style="height: 600px; border: 1px solid rgba(0, 0, 0, 0.109)">
                                    <el-container>
                                        <el-aside width="30%">
                                            <el-container>

                                                <el-main>
                                                    <el-card class="box-card">
                                                        <el-table :data="joinedTeam[index].members" style="width: 100%"
                                                            height="400">
                                                            <el-table-column prop="name" label="成员查看"
                                                                style="width:100%">
                                                            </el-table-column>
                                                        </el-table>
                                                    </el-card>
                                                </el-main>
                                            </el-container>
                                        </el-aside>
                                        <el-container>
                                            <el-header style="text-align:right" height="40px">
                                                <div style="margin-top:10px"></div>
                                                <el-button icon="el-icon-plus">添加新文档</el-button>
                                                <el-popconfirm confirmButtonText='是的' cancelButtonText='算了'
                                                    icon="el-icon-info" iconColor="red" title="确定要退出该团队吗" @onConfirm="">
                                                    <el-button slot="reference" type="danger">退出团队</el-button>
                                                </el-popconfirm>
                                            </el-header>
                                            <el-main>
                                                <el-card class="box-card">
                                                    <el-table :data="joinedTeam[index].docs"
                                                        style="width: 100%;height: 360px;">
                                                        <el-table-column prop="name" label="团队文档" style="width:100%">
                                                        </el-table-column>
                                                        <el-table-column label="操作" width="200">
                                                            <template slot-scope="scope">
                                                                <el-button type="text" icon="el-icon-view">查看详细信息
                                                                </el-button>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </el-card>

                                            </el-main>
                                        </el-container>
                                    </el-container>
                                    <el-footer height="100px">
                                        <div
                                            style="height:90%;width:100%;border:1px inset pink;border-radius: 4px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                            <span>{{item.introduction}}</span>
                                        </div>

                                    </el-footer>
                                </el-container>
                            </el-collapse-item>
                        </el-collapse>
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
                activeNames: [],
                activeNamesjoined: [],
                createdTeam: [{
                    name: "123", introduction: "我是介绍", members: [
                        { name: "123" },
                        { name: "144" }
                    ], docs: [
                        { id: "1", name: "一篇论文" },
                        { id: "2", name: "essay" }
                    ]
                },
                { name: "bb34b", introduction: "88" }

                ],
                joinedTeam: [{
                    name: "abc", introduction: "我是介绍", members: [
                        { name: "123" },
                        { name: "144" }
                    ], docs: [
                        { id: "1", name: "一篇论文" },
                        { id: "2", name: "essay" }
                    ]
                },
                { name: "bbb", introduction: "88" }],
                dialogFormVisible: false,
                formLabelWidth: "120px",
                form: { name: "", introduction: "" },
                userID:''
            };
        },
        created(){
            this.getTeamMessage();
        },
        methods: {
            getTeamMessage(){
                this.userID=window.localStorage.getItem('userid');
                this.$http.get("/team/findTeam?accountId="+this.userID).then(res=>{
                    console.log(res);
                })
            },
            handleChange(val) {
                console.log(val);
            }
        }
    }
</script>

<style>
</style>