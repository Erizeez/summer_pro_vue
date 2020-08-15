<template>
    <el-card shadow="always">
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
            this.getParams();
        },
        watch: {
            '$router': 'getParams'
        },
        methods: {
            getParams() {
                this.teamid = this.$route.query.teamid;
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