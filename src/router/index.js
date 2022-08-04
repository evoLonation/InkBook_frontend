import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: "/",
        redirect: 'Welcome'
    },

    //用户相关
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/User/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/User/Register.vue')
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../components/Welcome.vue')
    },
    {
        path: '/topTable',
        name: 'TopTable',
        component: () => import('../views/Table/TopTable')
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import('../views/Table/SideTable'),
        children: [
            {
                path: 'userInfo/:userId?',
                name: 'UserInfo',
                component: () => import('../views/User/UserInfo')
            },

            // 团队相关
            {
                path: "team/information/:teamId",
                name: "team",
                component: () => import('../Team/MyTeam')
            },
            {
                path: "team/list/:key?",
                name: "teamList",
                component: () => import('../Team/TeamList')
            },
            {
                path: "team/create",
                name: "teamCreate",
                component: () => import('../Team/CreateTeam')
            },
            {
                path: "team/qrcode/:teamId",
                name: "qrcode",
                component: () => import('../Team/TestQrcode')
            },
            {
                path: '/teamProject',
                name: 'teamProject',
                component: () => import('../views/project/projectList.vue')
            },

            // UML与原型构建相关
            {
                path: 'graph/create',
                name: 'createGraph',
                component: () => import('../project/Manage/AddSee')
            },

        ],
    },

    // 团队搜索转发
    {
        path: '/team/block/:key?',
        name: "teamBlock",
        component: () => import('../Team/BlockSearch')
    },

    //项目相关
    {
      path: "/uml",
      name: "uml",
      component: () => import('../views/project/UMLEdit/tabs/index')
    },


    //文档相关
    {
        path: "/document/list",
        name: "DocumentList",
        component: () => import('../views/document/list.vue')
    },
    {
        path: "/document/edit/:docId",
        name: "DocumentEdit",
        component: () => import('../views/document/edit.vue')
    },

    // 团队邀请相关
    {
        path: "/team/invite/:teamId",
        name: "teamInvite",
        component: () => import('../Team/TeamInvite')
    },

    // 重新安排项目界面布局
    {
        path: '/adjust',
        name: 'adjust',
        component: () => import('../views/project/projectList')
    }
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
