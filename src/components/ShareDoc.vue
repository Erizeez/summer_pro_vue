<template>
  <span v-loading.fullscreen.lock="fullscreenLoading"></span>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: true,
        uuid: '',
        authority: 0
      }
    },
    created() {
      this.jump();
    },
    methods: {
      jump() {
        this.$http.get('/share/getauth?receiverId=' + localStorage.getItem('userid') + '&DocId=' + this.$route.query.textid).then(res2 => {
          this.authority = res2.data;
          if (this.authority == 0) {
            if (this.$route.query.uuid != null) {
              this.uuid = this.$route.query.uuid;
              this.$http.get('/share/sharedoc?uuid=' + this.uuid + '&accountId=' + localStorage.getItem('userid')).then(res => {

                this.authority = res.data.auth;

                if (this.authority === 0) {
                  this.$message.error("您没有查看权限！");
                  this.$router.push('/index');
                }
                else {
                  this.$router.push('/text?textid=' + this.$route.query.textid);
                }

              })
            }
          }
          else{
            this.$router.push('/text?textid=' + this.$route.query.textid);
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>