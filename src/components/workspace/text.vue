<template>
  <div>


    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <span>文档名： {{this.docData.title}}</span>
        <div class="favorite">
          <span class="favor" v-if="favor">
            <el-button type="warning" icon="el-icon-star-on" style="float: right" round @click="cancellike">取消收藏
            </el-button>
          </span>
          <span class="non-favor" v-else-if="nonfavor">
            <el-button type="warning" icon="el-icon-star-off" style="float: right" round @click="like">收藏</el-button>
          </span>
          <el-button type="primary" style="float: right; margin-right: 10px" round @click="dialogFormVisible=true">存为模板
          </el-button>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" style="float: right; margin-right: 10px" round @click="goEdit" :disabled="!canEdit">
            编辑文本</el-button>
          <el-button type="primary" style="float: right; margin-right: 10px" round @click="goAccess"
            :disabled="!canSee">预览文本</el-button>

          <el-dialog title="保存到模板" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-form :model="form">
              <el-form-item label="模板名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消
              </el-button>
              <el-button type="primary" @click="submitModel">确 定</el-button>
            </div>
          </el-dialog>
        </div>

      </div>
      <div class="text item" style="text-align: left">
        创建者： {{this.userName}}
      </div>
      <div class="text item" style="text-align: left">
        简介： {{this.docData.intro}}
      </div>
      <div class="text item" style="text-align: left">
        创建时间： {{this.docData.createTime}}
      </div>
      <div class="text item" style="text-align: left">
        上次修改时间： {{this.docData.lastTime}}
      </div>
      <el-divider></el-divider>
      <div v-for="(item,i) in comments" :key="i" class="author-title">
        <el-row :gutter="20">
          <el-col :span="4">
            <a @click="toPersonalInfo(item.accountId)">
              <el-tooltip class="item" effect="dark" content="查看个人信息" placement="bottom">
                <el-avatar class="header-img" :size="40" :src="item.photo"></el-avatar>
              </el-tooltip>
            </a>
            <div class="author-info">
              <span class="author-name">{{item.name}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="talk-box">
              <p>
                <span class="reply" :id="generateID(i)">{{item.content}}</span>
              </p>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="comment_time">
              <p>
                <span class="reply">{{item.time}}</span>
              </p>
            </div>
          </el-col>

          <el-col :span="4">
            <div v-if="item.accountId==userId || docData.createId==userId">
              <el-button type="primary" icon="el-icon-edit" circle @click="editComment(i)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteComment(i)"></el-button>
            </div>
            <div v-else>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
      <el-collapse>
        <div v-if="!canComment" class="sorryTitle">很抱歉，您没有评论该文档的权限</div>
        <el-collapse-item title="评论" name="1" v-if="canComment">
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
        docData: {
          id: '',
          createId: '',
          createTime: '',
          lastTime: '',
          text: '',
          status: '',
          title: '',
          intro: ''
        },
        userName: '',
        userId: '',
        submitComment: {
          id: '',
          content: '',
          accountId: '',
          DocId: '',
        },
        comments: [],
        editcomment: {
          id: '',
          content: '',
          accountId: '',
          DocId: ''
        },
        favor: true,
        nonfavor: false,
        dialogFormVisible: false,
        form: {
          DocId: '',
          name: '',
          accountId: ''
        },
        formLabelWidth: "120px",
        canSee: false,
        canEdit: false,
        canComment: false,
        fullscreenLoading: false,
        uuid: '',
        authority: 1,
      }
    },
    created() {
      this.getParams();
      this.checkLike();
      this.getComments();
      this.addRecent();
    },
    watch: {
      '$router': 'getParams'
    },
    methods: {
      addRecent() {
        this.$http.get('/doc/addlatest?DocId=' + this.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {

        })
      },
      goBack() {
        this.$router.go(-1);
      },
      getParams() {

        this.textid = this.$route.query.textid;
        this.$http.get('/share/getauth?receiverId=' + localStorage.getItem('userid') + '&DocId=' + this.$route.query.textid).then(res2 => {

          this.canSee = false,
            this.canEdit = false,
            this.canComment = false,
            this.authority = res2.data;

          if (this.authority === 0) {
            this.$message.error("您没有查看权限！");
            return this.$router.push('/index');
          }
          if (this.authority === 1) {
            canSee = true;
            return;
          }
          if (this.authority - 8 >= 0) {
            this.authority -= 8;
            this.canEdit = true;
            this.canSee = true;
          }
          if (this.authority - 4 >= 0) {
            this.authority -= 4;
            this.canComment = true;
          }
          if (this.authority - 2 >= 0) {
            this.authority -= 2;
            // this.canSee = true;
          }
          if (this.authority === 1) {
            this.canSee = true;
          }
          if (this.authority === 0) {
            this.canSee = false;
            this.canComment = false;
            this.canEdit = false;
            this.$message.error("您没有查看权限！");
            this.$router.push('/index');
          }

        })





        this.$http.get('/doc/read?id=' + this.$route.query.textid).then(res => {
          this.docData.id = res.data.id;
          this.docData.createId = res.data.createId;
          this.docData.createTime = res.data.createTime;
          this.docData.lastTime = res.data.lastTime;
          this.docData.text = res.data.text;
          this.docData.status = res.data.status;
          this.docData.title = res.data.title;
          this.docData.intro = res.data.intro;
          this.userId = window.localStorage.getItem('userid');
          this.$http.get('/account/search?id=' + res.data.createId).then(res1 => {
            this.userName = res1.data.name;
          })

        })

      },
      addComment() {
        this.submitComment.accountId = parseInt(window.localStorage.getItem('userid'));
        this.submitComment.DocId = this.docData.id;
        this.$http.get('/comment/add?DocId=' + this.submitComment.DocId + '&accountId=' + this.submitComment.accountId + '&content=' + this.submitComment.content).then(res => {
          if (res.data === 'success') {
            this.getComments();
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
          this.submitComment.content = ""
        })
      },
      toPersonalInfo(acId) {
        this.activeIndex = 3;
        this.$router.push('/PersonalInfo?id=' + acId);
      },
      deleteComment(index) {
        this.submitComment.accountId = window.localStorage.getItem('userid');
        this.submitComment.id = this.comments[index].id;
        this.submitComment.DocId = this.docData.id;
        this.$http.post('/comment/delete', this.submitComment).then(res => {
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
          this.$http.get('/comment/getcomment?id=' + this.comments[i].id).then(res => {
            this.editcomment = res.data;
          })
          this.$prompt('请输入评论', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: text
          }).then(({ value }) => {
            this.editcomment.content = value;
            this.$http.post('/comment/edit', this.editcomment).then(res => {

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
      checkLike() {
        this.$http.get('/doc/iscollect?DocId=' + this.$route.query.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {

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
      getComments() {
        this.$http.get('/comment/docCom?DocId=' + this.$route.query.textid).then(res => {
          console.log(res);
          this.comments = res.data;
        })
      },
      cancellike() {
        this.favor = false;
        this.nonfavor = true;
        this.$http.get('/doc/discollect?DocId=' + this.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {

        })
      },
      like() {
        this.$http.get('/doc/collect?DocId=' + this.textid + '&accountId=' + localStorage.getItem('userid')).then(res => {

        })
        this.favor = true;
        this.nonfavor = false;
      },
      goEdit() {
        let __this = this;
        this.fullscreenLoading = true;
        this.$http.get("/doc/checkedit?DocId=" + this.docData.id).then(
          function (res) {
            console.log(res);
            if (res.data != "success") {
              __this.$message({
                type: 'error',
                message: '他人正在编辑，请稍后再试',
              });
              __this.fullscreenLoading = false;
            } else {
              __this.$router.push("/edit/" + __this.docData.id);
            }
          }
        );
      },
      goAccess() {
        this.$router.push("/access/" + this.docData.id);
      },
      generateID(index) {
        return "comment_" + index;
      },
      submitModel() {
        this.form.DocId = this.docData.id;
        this.form.accountId = this.userId;
        this.$http.get('/doc/addbydoc?DocId=' + this.form.DocId + '&name=' + this.form.name + '&accountId=' + this.form.accountId).then(res => {
          if (res.data === "success") {
            this.$message.success("添加成功，你可以在用模板创建文档中看到它！")
            this.dialogFormVisible = false;
          }
          else {
            this.$message.error("添加失败！");
          }
        })
      }
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

  a:hover {
    filter: brightness(80%);
  }

  .sorryTitle {
    font-size: 30px;
    color: #888;
  }

  .favorite {
    margin: 5px;
  }
</style>