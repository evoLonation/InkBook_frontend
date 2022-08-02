import {createStore} from 'vuex'

export default new createStore({
    state(){
        return {
            isLogin : false,
            loginUser: {
                userId: "",
                nickname: "",
            },
        };
    },
    mutations: {
        login(state, user){
            console.log("set login");
            state.isLogin = true;
            state.loginUser.userId = user.userId;
            state.loginUser.nickname = user.nickname;
            localStorage.setItem('isLogin', state.isLogin);
            localStorage.setItem('loginUser', JSON.stringify(state.loginUser));
        },
        logout(state){
            state.isLogin = false;
            localStorage.setItem('isLogin', false);
        },
        init(state){
            state.isLogin = localStorage.getItem('isLogin');
            let localLoginUser = localStorage.getItem('loginUser');
            // state.loginUser = localStorage.getItem('loginUser');
            if(localLoginUser !== null){
                state.loginUser = JSON.parse(localLoginUser);
            }
            console.log("完成初始化，全局状态为：");
            console.log(state.isLogin);
        }
    },
    actions: {

    },
    modules: {

    }
})