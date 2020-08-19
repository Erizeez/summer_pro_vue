<template>
    <span v-loading.fullscreen.lock="fullscreenLoading"></span>
</template>

<script>
    export default {
    data() {
      return {
        fullscreenLoading: true
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>