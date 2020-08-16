<template>
    <el-card shadow="always" class="el-card1">
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

<style scope>
.el-card1{
    width:75%;
    position:absolute;
    top:80px;
    min-height: 700px;
    box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.1), inset 0px -2px 10px 2px rgba(255, 255, 255, 1);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;

}
</style>