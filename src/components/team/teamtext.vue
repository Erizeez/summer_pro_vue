<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <span>文档名： {{this.teamdocData.title}}</span>
        <div class="favorite">
          <span class="favor" v-if="favor">
            <el-button type="warning" icon="el-icon-star-on" style="float: right" round @click="cancellike">取消收藏
            </el-button>
          </span>
          <span class="non-favor" v-else-if="nonfavor">
            <el-button type="warning" icon="el-icon-star-off" style="float: right" round @click="like">收藏</el-button>
          </span>
          <el-button type="primary" style="float: right; margin-right: 10px" round @click="goEdit" :disabled="!canEdit">
            编辑文本</el-button>
          <el-button type="primary" style="float: right; margin-right: 10px" round @click="goAccess" :disabled="!canSee">预览文本</el-button>
        </div>
      </div>

      <div class="text item" style="text-align: left">
        创建者： {{this.userName}}
      </div>
      <div class="text item" style="text-align: left">
        简介： {{this.teamdocData.intro}}
      </div>
      <div class="text item" style="text-align: left">
        创建时间： {{this.teamdocData.createTime}}
      </div>
      <div class="text item" style="text-align: left">
        上次修改时间： {{this.teamdocData.lastTime}}
      </div>
      <el-divider></el-divider>

      <div style="font-size: larger; text-align:left; margin-bottom: 30px">评论内容</div>
      <el-divider></el-divider>
      <div v-for="(item,i) in comments" :key="i" class="author-title">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-avatar class="header-img" :size="40" :src="item.photo"></el-avatar>
            <div class="author-info">
              <span class="author-name">{{item.name}}</span>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="talk-box">
              <p>
                <span class="reply">{{item.content}}</span>
              </p>
            </div>
          </el-col>
          <el-col :span="4">
            <div v-if="item.accountId==userId || teamdocData.createId==userId">
              <el-button type="primary" icon="el-icon-edit" circle @click="editComment(i)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteComment(i)"></el-button>
            </div>
            <div v-else>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
      <div v-if="!canComment">很抱歉，您没有评论该文档的权限</div>
      <el-collapse v-if="canComment">
        <el-collapse-item title="评论" name="1">
          <el-input placeholder="请输入内容" v-model="submitComment.content">
            <el-button type="primary" slot="append" @click="addComment()">发送</el-button>
          </el-input>
        </el-collapse-item>


      </el-collapse>






    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        textid: '',
        teamdocData: {
          id: '',
          createId: '',
          createTime: '',
          lastTime: '',
          text: '',
          status: '',
          title: '',
          intro: '',
          teamId: ''
        },
        userId: '',
        userName: '',
        comments: '',
        submitComment: {

          content: '',
          accountId: '',
          teamdocId: '',
        },
        editcomment: {
          id: '',
          content: '',
          accountId: '',
          teamdocId: ''
        },
        favor: true,
        nonfavor: false,
        canSee:false,
        canComment:false,
        canEdit: false,
        authority:0
      }
    },
    created() {
      this.checkLike();
      this.getComments();
      this.getParams();
      this.addRecent();
      this.userId = localStorage.getItem('userid');
    },
    watch: {
      '$router': 'getParams'
    },
    methods: {
      addRecent() {
        this.$http.get('/team/addlatest?DocId=' + this.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {
          console.log(res);
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      getParams() {
        this.textid = this.$route.query.textid;
        this.$http.get('/team/getteamdoc?DocId=' + this.textid).then(res => {
          this.teamdocData.id = res.data.id;
          this.teamdocData.createId = res.data.createId;
          this.teamdocData.createTime = res.data.createTime;
          this.teamdocData.lastTime = res.data.lastTime;
          this.teamdocData.text = res.data.text;
          this.teamdocData.status = res.data.status;
          this.teamdocData.title = res.data.title;
          this.teamdocData.intro = res.data.intro;
          this.teamdocData.teamId = res.data.teamId;
          this.$http.get('/account/search?id=' + res.data.createId).then(res => {
            this.userName = res.data.name;
          })
          this.$http.get('/team/findbelong?accountId=' + window.localStorage.getItem('userid') + '&teamId=' + this.teamdocData.teamId).then(res => {
            this.authority=res.data.authority;
            if(this.authority>=4){
              this.canEdit=true;
              this.authority-=4;
            }
            if(this.authority>=2){
              this.canComment=true;
              this.authority-=2;
            }
            if(this.authority==1){
              this.canSee=true;
            }
          })
        })
      },
      getComments() {
        this.$http.get('/team/getcommentlist?teamdocId=' + this.$route.query.textid).then(res => {
          this.comments = res.data;
        })
      },
      checkLike() {
        this.$http.get('/team/iscollect?DocId=' + this.$route.query.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {
          if (res.data === 'Record exist') { //已收藏
            this.favor = true;
            this.nonfavor = false;
          }
          else {
            this.favor = false;
            this.nonfavor = true;
          }
        })
      },
      cancellike() {
        this.favor = false;
        this.nonfavor = true;
        this.$http.get('/team/discollect?DocId=' + this.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {
          console.log(res);
        })
      },
      like() {
        this.$http.get('/team/collect?DocId=' + this.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {
          console.log(res);
        })
        this.favor = true;
        this.nonfavor = false;
      },
      addComment() {
        this.submitComment.accountId = parseInt(window.localStorage.getItem('userid'));
        this.submitComment.teamdocId = this.teamdocData.id;
        let tc = this.submitComment;
        this.$http.get('/team/addcomment?teamdocId=' + this.submitComment.teamdocId + '&accountId=' + this.submitComment.accountId + '&content=' + this.submitComment.content).then(res => {
          console.log(res);
          if (res.data === 'success') {
            location.reload(true);
            this.$message({
              type: 'success',
              message: '评论成功'
            });
          } else {
            this.$message({
              type: 'error',
              message: '评论失败'
            });
          }
        })
      },
      deleteComment(index) {
        this.submitComment.id = this.comments[index].id;
        this.$http.get('/team/delcomment?id=' + this.submitComment.id).then(res => {
          console.log(res);
          if (res.data === 'success') {
            location.reload(true);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
        })
      },
      editComment(i) {
        var text = this.comments[i].content;
        if (this.comments[i].accountId === parseInt(localStorage.getItem('userid'))) {
          this.editcomment.id = this.comments[i].id;
          this.editcomment.content = this.comments[i].content;
          this.editcomment.accountId = this.comments[i].accountId;
          this.editcomment.teamdocId = this.comments[i].docId;

          this.$prompt('请输入评论', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: text
          }).then(({ value }) => {
            this.editcomment.content = value;
            let tc = this.editcomment
            this.$http.post('/team/editcomment', tc).then(res => {
              console.log(res);
              console.log('hhh');
            })
            location.reload(true);
            this.$message({
              type: 'success',
              message: '更改成功'
            });
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '更改失败'
            });
          })
        }
        else {
          this.$message.error('只有本人可以编辑评论！');
        }

      },
      goEdit() {
        this.$router.push("/teamdocedit/" + this.teamdocData.id);
      },
      goAccess() {
        this.$router.push("/teamdocaccess/" + this.teamdocData.id);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {

    width: 90%;
    min-height: 700px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translate(-50%, 0%);
    box-shadow: 0px 6px 20px 8px rgba(0, 0, 0, 0.3);
    margin: 10px 0px 50px 0px;
    transition-duration: 0.5s;
    text-align: center;
  }

  .favorite {
    margin: 5px;
  }
</style>