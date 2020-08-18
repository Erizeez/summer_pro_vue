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
      redirect:'/login'
    },
    {
      path:'/login',
      component:login
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
        {path: '/index', name:index, component: index},
        {path: '/recentdoc', name:recentdoc, component: recentdoc},
        {path:'/teamRecent', name:teamRecent, component:teamRecent},
        {path: '/text', name:text, component:text},
        {path: '/collect', name:collect, component:collect},
        {path: '/trash', name:trash, component:trash},
        {path: '/trashtext', name:trashtext, component:trashtext},
        {path: '/PersonalInfo', name: PersonalInfo, component: PersonalInfo },
        {path: '/created', name: created, component: created },
        {path: '/messageInfo', name:messageInfo, component:messageInfo},
        {path: '/Add', name:Add, component:Add},
        {path: '/access/:id', name: Access, component: Access},
        {path: '/edit/:id', name: Edit, component: Edit},
        {path:'/teamtext', name:teamtext, component:teamtext},
        {path:'/teamCollect', name:teamCollect, component:teamCollect},
        {path: '/teamdocadd/:teamid', name:TeamDocAdd, component:TeamDocAdd},
        {path: '/teamdocaccess/:id', name: TeamDocAccess, component: TeamDocAccess},
        {path: '/teamdocedit/:id', name: TeamDocEdit, component: TeamDocEdit},
        {
          path: '/TeamAside', name: TeamAside, component: TeamAside, redirect: '/Myteams',
          children: [
            { path: '/MyTeams', name: Myteams, component: Myteams },
            {
              path: '/TeamTabs', name: TeamTabs, component: TeamTabs, redirect: '/TeamDocs', children: [{
                path: '/TeamInfo', name: TeamInfo, component: TeamInfo, redirect: '/TeamDocs',
                children: [
                  { path: '/TeamDocs', name: TeamDocs, component: TeamDocs },
                ]},
              { path: '/TeamMember', name: TeamMember, component: TeamMember }
              ]
            }
          ]
        },
        { path: '/CreateFromModel', name: CreateFromModel, component: CreateFromModel },
        {path:'/NewTeam', name:NewTeam, component:NewTeam}
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/TeamMember',
      name:TeamMember,
      component:TeamMember
    },

    {
      path: '/add',
     name: 'Add',
      component: Add
    },
    {
      path: '/personalinfo',
      name: 'PersonalInfo',
      component: PersonalInfo
    }
  ]
})

//路由卫士
router.beforeEach((to, from, next) =>{
  if(to.path === '/login' || to.path === '/register'){
    return next();
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr){
    return next('/login');
  }
  next();
})

export default router
