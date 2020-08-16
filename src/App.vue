<template>
  <div id="app">
  	<transition :name="transitionName">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  	name: 'App',
  	data () {
      	return {
        	transitionName:''
      	}
    },
    watch: {
      	// 使用watch 监听$router的变化
      	$route (to, from) {
       	// 如果to索引大于from索引,判断为前进状态,反之则为后退状态 
        	if (to.meta.index > from.meta.index){
          		// 设置动画名称
          		console.log("go");
          		this.transitionName = 'slide-left';
       		} else{
          		this.transitionName = 'slide-right';
        	}
    	}
  	}
}
</script>

<style lang="less">
	.slide-right-enter-active,
   	.slide-right-leave-active,
   	.slide-left-enter-active,
   	.slide-left-leave-active {
     	will-change: transform;
     	transition: all 200ms;
     	position: relative; 
     	//这里的定位使用relative可以解决切换时页面残影
   	}
   	.slide-right-enter {
     	opacity: 0.5;
     	filter: blur(400px);
  	}.slide-right-leave-active {
    	opacity: 0.5;
    	filter: blur(400px);
  	}.slide-left-enter {
    	opacity: 0.5;
    	filter: blur(400px);
  	}.slide-left-leave-active {
    	opacity: 0.5;
    	filter: blur(400px);
  	}
    .el-main{
	  background-image: url("./assets/login/login_bg.jpg");
    }
</style>
