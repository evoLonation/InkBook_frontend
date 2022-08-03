import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: "/",
        redirect: 'login'
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
        ],
    },
    // {
    //     path: '/userInfo/:userId?',
    //     name: 'UserInfo',
    //     component: () => import('../User/UserInfo')
    // },

    //项目相关
    {
        path: '/teamProject',
        name: 'TeamProject',
        component: () => import('../project/projectList.vue')
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
    }
];

const router = createRouter({
    //采用hash 模式
    history: createWebHashHistory(),
    routes, //使用上方定义的路由配置
});

export default router
