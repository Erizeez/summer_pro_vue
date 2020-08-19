import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import home from '../components/home'
import recentdoc from "../components/workspace/recentdoc"
import index from "../components/index";
import text from "../components/workspace/text";
import collect from "../components/workspace/collect";
import Register from '@/components/Register'
import Edit from '@/components/Edit'
import Access from '@/components/Access'
import Add from '@/components/Add'
import PersonalInfo from '@/components/PersonalInfo'
import created from "../components/workspace/created"
import messageInfo from "../components/message/messageInfo";
import trash from "../components/workspace/trash";
import trashtext from "../components/workspace/trashtext";
import teamtext from "../components/team/teamtext";
import teamCollect from "../components/workspace/teamCollect";
import CreateFromModel from "../components/CreateFromModel"
import TeamDocEdit from '@/components/TeamDocEdit'
import TeamDocAccess from '@/components/TeamDocAccess'
import TeamDocAdd from '@/components/TeamDocAdd'
import HelloWorld from '@/components/HelloWorld'
import ShareDoc from '@/components/ShareDoc'
import NewTeam from "../components/team/NewTeam";
import TeamMember from "../components/team/TeamMember";
import teamRecent from "../components/workspace/teamRecent";

import TeamAside from "../components/team/TeamAside"
import Myteams from "../components/Myteams"
import TeamTabs from "../components/team/TeamTabs"
import TeamInfo from "../components/team/TeamInfo"
import TeamDocs from "../components/team/TeamDocs"

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      meta:{
        title:"黑曜石文档"
      }
    },
    {
      path:'/login',
      component:login,
      meta:{title:"黑曜石文档-登录"}
    },
    {
      path:'/test',
      component:HelloWorld
    },
    {
      path:'/home',
      component:home,
      redirect:'/index',
      children:[
        {path: '/index', name:index, component: index,
        meta:{
                  title:"黑曜石文档-首页"
        }},
        {path: '/recentdoc', name:recentdoc, component: recentdoc,meta:{title:"黑曜石文档-个人最近浏览"}},
        {path:'/teamRecent', name:teamRecent, component:teamRecent,meta:{title:"黑曜石文档-团队最近浏览"}},
        {path: '/text', name:text, component:text,meta:{title:"黑曜石文档-个人文档详情"}},
        {path: '/collect', name:collect, component:collect,meta:{title:"黑曜石文档-个人收藏"}},
        {path: '/trash', name:trash, component:trash,meta:{title:"黑曜石文档-回收站"}},
        {path: '/trashtext', name:trashtext, component:trashtext,meta:{title:"黑曜石文档-回收站"}},
        {path: '/PersonalInfo', name: PersonalInfo, component: PersonalInfo,meta:{title:"黑曜石文档-个人信息"}},
        {path: '/created', name: created, component: created,meta:{title:"黑曜石文档-已创建文档"}},
        {path: '/messageInfo', name:messageInfo, component:messageInfo,meta:{title:"黑曜石文档-消息通知"}},
        {path: '/Add', name:Add, component:Add,meta:{title:"黑曜石文档-个人文档创建"}},
        {path: '/access/:id', name: Access, component: Access,meta:{title:"黑曜石文档-个人文档预览"}},
        {path: '/edit/:id', name: Edit, component: Edit,meta:{title:"黑曜石文档-个人文档编辑"}},
        {path:'/teamtext', name:teamtext, component:teamtext,meta:{title:"黑曜石文档-团队文档详情"}},
        {path:'/teamCollect', name:teamCollect, component:teamCollect,meta:{title:"黑曜石文档-团队收藏"}},
        {path: '/teamdocadd/:teamid', name:TeamDocAdd, component:TeamDocAdd,meta:{title:"黑曜石文档-团队文档创建"}},
        {path: '/teamdocaccess/:id', name: TeamDocAccess, component: TeamDocAccess,meta:{title:"黑曜石文档-团队文档预览"}},
        {path: '/teamdocedit/:id', name: TeamDocEdit, component: TeamDocEdit,meta:{title:"黑曜石文档-团队文档编辑"}},
        {
          path: '/TeamAside', name: TeamAside, component: TeamAside, redirect: '/Myteams',
          children: [
            { path: '/MyTeams', name: Myteams, component: Myteams,meta:{title:"黑曜石文档-团队主页"}},
            {
              path: '/TeamTabs', name: TeamTabs, component: TeamTabs, redirect: '/TeamDocs', children: [{
                path: '/TeamInfo', name: TeamInfo, component: TeamInfo, redirect: '/TeamDocs',
                children: [
                  { path: '/TeamDocs', name: TeamDocs, component: TeamDocs,meta:{title:"黑曜石文档-团队文档"}},
                ]},
              { path: '/TeamMember', name: TeamMember, component: TeamMember,meta:{title:"黑曜石文档-团队成员"}}
              ]
            }
          ]
        },
        { path: '/CreateFromModel', name: CreateFromModel, component: CreateFromModel,meta:{title:"黑曜石文档-从模板创建"}},
        {path:'/NewTeam', name:NewTeam, component:NewTeam,meta:{title:"黑曜石文档-创建团队"}}
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{title:"黑曜石文档-注册"}
    },
    {
      path:'/ShareDoc',
      name:ShareDoc,
      component:ShareDoc
    }
  ]
})


//路由卫士
router.beforeEach((to, from, next) =>{
  document.title = to.meta.title;
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr){
    if(to.path === '/login' || to.path === '/register'){
      console.log("444")
      return next();
    }else{
      console.log("555")
      return next({
        path: "/login",
        query: {redirect: to.fullPath}
      })
    }
  }else {
      return next()
  }
  
  
  
  
  
  // if(to.path === '/login' || to.path === '/register'){
  //   return next();
  // }
  // //获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  // if(!tokenStr){
  //   return next('/login');
  // }
  // next();
})

export default router
