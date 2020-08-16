<template>
    <el-card class="info_box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabs" :key="item.id" :label="item.name" :name="item.id">
                <router-view></router-view>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                tabs: [
                    { id: "1", name: "团队文档" },
                    { id: "2", name: "团队成员" }
                ],
                activeName: "1",
                teamid: ""
            }
        },
        created() {
            this.teamid = this.$route.query.teamid;
        },
        watch: {
            $route() {
                this.teamid = this.$route.query.teamid;
            },
            teamid() {
                this.activeName = "1";

                if (this.$route.path == '/TeamMember') {
                    this.activeName = "2";
                }
            }
        },
        methods: {
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
                        path: '/TeamMember',
                        query: {
                            teamid: this.teamid
                        }
                    })
                }
                else {
                    console.log("error");
                }
            }
        }
    }
</script>

<style>
    .info_box{
        width: 90%;
        height: auto;
        min-height: 800px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 30px;
        position: relative;
        left: 50%;
        top: 5%;
        transform :translate(-50%, 0%);
        box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
        margin: 10px 0px 50px 0px;
        transition-duration: 0.5s;
    }
    .info_box:hover{
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
      transition-duration: 0.5s;
    }
</style>