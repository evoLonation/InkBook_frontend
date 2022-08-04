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
        path: '/table',
        name: 'Table',
        component: () => import('../views/Table/Table'),
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
                component: () => import('../project/projectList.vue')
            },

            // UML与原型构建相关
            {
                path: 'graph/create',
                name: 'createGraph',
                component: () => import('../project/Manage/AddSee')
            }
        ],
    },

    // 团队搜索转发
    {
        path: '/team/block/:key?',
        name: "teamBlock",
        component: () => import('../Team/BlockSearch')
    },

    // {
    //     path: '/userInfo/:userId?',
    //     name: 'UserInfo',
    //     component: () => import('../User/UserInfo')
    // },

    //项目相关



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
        path: "/team/invite",
        name: "teamInvite",
        component: () => import('../Team/TeamInvite')
    },
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
