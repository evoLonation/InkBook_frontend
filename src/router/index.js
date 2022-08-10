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
        component: () => import('../views/NewTable/NewSideTable'),
        children: [
            {
                path: 'topTable',
                name: 'TopTable',
                component: () => import('../views/NewTable/NewTopTable'),
                children: [
                    {
                        path: "document/list",
                        name: "DocumentList",
                        component: () => import('../views/NewDocument/documentList')
                    },
                ]
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
                path: "team/qrcode/:teamId",
                name: "qrcode",
                component: () => import('../views/Team/TestQrcode')
            },
            {
                path: 'teamProject',
                name: 'teamProject',
                component: () => import('../views/project/projectList')
            },
            {
                path: 'projectRec',
                name: 'projectRec',
                component: () => import('../views/project/projectRec')
            },
            {
              path: 'file-rec',
              name: 'fileRec',
              component: () => import('../views/docCenter/fileRec')
            },
            {
                path: 'userInfo/:userId?',
                name: 'UserInfo',
                component: () => import('../views/User/UserInfo')
            },
            {
                path: 'doc-center',
                name: 'docCenter',
                component: () => import('../views/docCenter/FolderList')
            },
            {
                path: "topTable",
                name: "topTable",
                component: () => import('../views/NewTable/NewTopTable'),
                children: [
                    {
                        path: 'document/list',
                        name: 'documentList',
                        component: () => import('../views/NewDocument/documentList')
                    },
                    {
                        path: 'uml/list',
                        name: 'umlList',
                        component: () => import('../views/project/Manage/NewUML')
                    },
                    {
                        path: 'proto/list',
                        name: 'protoList',
                        component: () => import('../views/project/Manage/NewOrigin')
                    }
                ]
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

    // 创建团队相关
    {
        path: "/team/create",
        name: "teamCreate",
        component: () => import('../views/Team/CreateTeam')
    },

    //项目相关
    {
        path: '/uml',
        name: 'uml',
        component: () => import('../views/project/UMLEdit/tabs/index')
    },
    {
      path: '/uml/preview',
      name: 'umlPreview',
      component: () => import('../views/project/UMLEdit/flow/Preview')
    },
    {
        path: '/proto',
        name: 'proto',
        component: () => import('../views/project/ProtoEdit/tabs/index')
    },
    {
        path: '/proto/preview/:protoId/:projectId',
        component: () => import('../views/project/ProtoEdit/flow/Preview')
    },

    //文档相关

    {
        path: "/document/edit/:docId",
        name: "DocumentEdit",
        component: () => import('../views/document/edit.vue')
    },
    // {
    //     path: "/menu",
    //     name: "Menu",
    //     component: () => import('../views/Table/Menu')
    // },

    // 团队邀请相关
    {
        path: "/team/invite/:teamId",
        name: "teamInvite",
        component: () => import('../views/Team/TeamInvite')
    },

    //测试
    {
        path: "/image",
        name: "Image",
        component: () => import('../components/Image')
    },
    {
        path: "/button",
        name: "Image",
        component: () => import('../components/button/button')
    },
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
