<template>
<el-container class="home">
        <el-aside width="18%" style="background-color: rgba(255,255,255,0.4);">
            <el-menu default-active="2" class="el-menu-vertical-demo"
                style="background-color: rgba(255,255,255,0.4);" text-color="#888" active-text-color="#000">
                <el-submenu index="1" style="background-color: rgba(255,255,255,0.4);">
                    <template slot="title">
                        <span class="sideTitle">我创建的团队</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item class="sidePart" :key="index" v-for="(item,index) in createdTeams" @click="toTeamInfo(item.id)">
                            {{item.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2" style="background-color: rgba(255,255,255,0.4);">
                    <template slot="title">
                        <span class="sideTitle">我加入的团队</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item class="sidePart" :key="index" v-for="(item,index) in joinedTeams" @click="toTeamInfo(item.id)">
                            {{item.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
   
        <el-main class="Teams_layer">
            <router-view @getTeams="getTeams"></router-view>
        </el-main>
        
    
</el-container>
</template>

<script>
    export default {
        data() {
            return {
                createdTeams: [],
                joinedTeams: [],
                userID: ""
            }
        },
        mounted() {
            this.getTeams();
        },
        methods: {
            getTeams() {
                this.userID = window.localStorage.getItem('userid');
                this.$http.get('/team/findTeam?accountId=' + this.userID).then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].creatorId == this.userID) {
                            this.createdTeams.push(res.data[i]);
                        }
                        else {
                            this.joinedTeams.push(res.data[i]);
                        }
                    }
                })
            },
            toTeamInfo(id){
                this.$router.push({
                    path:'/TeamInfo',
                    query:{
                        teamid:id
                    }
                })
            }
        }
    }
</script>

<style>
.el-container{
    height: 100%;  
}
.el-aside{
    background-color: white;
}
.el-row{
    width: 100%;
}
.sideTitle{
    font-weight: bold;
    font-size: 18px;
}
.sidePart{
    //font-weight: bold;
    font-size: 18px;
}
</style>
