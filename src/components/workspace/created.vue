<template>

    <div>
        <el-row :gutter="20">
            <h1>已创建文档列表
                <el-row :gutter="0">
                    <el-radio-group v-model="brouseMode" style="margin-bottom: 20px;float:right;margin-right:50px">
                        <el-radio-button :label="false">平铺</el-radio-button>
                        <el-radio-button :label="true">列表</el-radio-button>
                    </el-radio-group>
                </el-row>
            </h1>
        </el-row>
        <div>
            <el-row v-if="brouseMode==false">
                <el-button type="danger" @click="deleteMode" v-if="!isDelete" style="float:right">批量删除</el-button>
                <el-button @click="deleteMode" v-if="isDelete" style="float:right">取消</el-button>
                <el-button type="danger" @click="deleteAll" v-if="isDelete" style="float:right;margin-right: 5px;">确认删除
                </el-button>
            </el-row>
            <el-row :gutter="50" style="margin-top: 20px;" class="boxes">
                <el-col :span="16" :offset="2" v-if="brouseMode==true">
                    <el-table :data="createdlist" stripe style="width: 100%">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="title" label="文档名" width="500">
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建日期" width="240">
                        </el-table-column>
                        <el-table-column prop="lastTime" label="最后修改日期">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="todoc(scope.row.id)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small" style="color: red;" @click="deleteFile(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="5" v-if="brouseMode==false" v-for="(item,index) in createdlist" :key="item.id">
                    <el-card :span="5" :body-style="{ padding: '0px' }" shadow="hover" class="box">
                        <img src="../../assets/home/card-bg.jpg" class="image"
                            style="width: 100%; height:200px; display: block">
                        <div style="padding: 14px;">
                            <span>{{item.title}} </span>
                            <div class="bottom clearfix">
                                <el-button-group v-if="!isDelete">
                                    <el-button type="primary" plain class="button" @click="todoc(item.id)">进入文档
                                    </el-button>
                                    <el-button type="danger" plain class="button" icon="el-icon-delete"
                                        @click="deleteFile(index)">删除</el-button>
                                </el-button-group>
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
    </div>
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
<style scoped>
    .box {
        margin-top: 30px;
    }

    .boxes {
        position: relative;
        left: 7%;
    }
</style>