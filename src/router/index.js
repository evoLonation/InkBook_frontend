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
        component: () => import('../views/Table/SideTable'),
        children: [
            {
                path: 'topTable',
                name: 'TopTable',
                component: () => import('../views/Table/TopTable'),
                children: [
                    {
                        path: "document/list",
                        name: "DocumentList",
                        component: () => import('../views/document/list.vue')
                    },
                    // UML与原型构建相关
                    {
                        path: 'uml/create/:projectId',
                        name: 'createUml',
                        component: () => import('../views/project/Manage/UML')
                    },
                    {
                        path: 'origin/create/:projectId',
                        name: 'createOrigin',
                        component: () => import('../views/project/Manage/Origin')
                    },
                    {
                        path: 'document/list',
                        name: 'documentList',
                        component: () => import('../views/document/edit')
                    },
                ]
            },
            {
                path: 'userInfo/:userId?',
                name: 'UserInfo',
                component: () => import('../views/User/UserInfo')
            },

            // 团队相关
            {
                path: "team/information/:teamId",
                name: "team",
                component: () => import('../views/Team/MyTeam')
            },
            {
                path: "team/list/:key?",
                name: "teamList",
                component: () => import('../views/Team/TeamList')
            },
            {
                path: "team/create",
                name: "teamCreate",
                component: () => import('../views/Team/CreateTeam')
            },
            {
                path: "team/qrcode/:teamId",
                name: "qrcode",
                component: () => import('../views/Team/TestQrcode')
            },
            {
                path: '/teamProject',
                name: 'teamProject',
                component: () => import('../views/project/projectList')
            },
            {
                path: '/projectRec',
                name: 'projectRec',
                component: () => import('../views/project/projectRec')
            }
        ],
    },

    // 团队搜索转发
    {
        path: '/team/block/:key?',
        name: "teamBlock",
        component: () => import('../views/Team/BlockSearch')
    },


    //文档相关

    {
        path: "/document/edit/:docId",
        name: "DocumentEdit",
        component: () => import('../views/document/edit.vue')
    },
    {
        path: "/menu",
        name: "Menu",
        component: () => import('../views/Table/Menu')
    },

    // 团队邀请相关
    {
        path: "/team/invite/:teamId",
        name: "teamInvite",
        component: () => import('../views/Team/TeamInvite')
    },
    {
        path: "/tool",
        name: "Tool",
        component: () => import('../views/unlayer/tool')
    },
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
