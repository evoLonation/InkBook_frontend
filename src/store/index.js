import {createStore} from 'vuex'

export default new createStore({
    state(){
        return {
            isLogin: false,
            loginUser: {
                userId: "",
                nickname: "",
            },

            isSelectTeam: false,
            selectTeam: {
                teamId : "",
                teamName: "",
            },
            isSelectProject: false,
            selectProject: {
                proId : "",
                proName: "",
            },
            graphId: "",
            originId: "",
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
            state.isSelectTeam = false;
            localStorage.setItem('isSelectTeam', state.isSelectTeam);
        },
        logout(state){
            state.isLogin = false;
            localStorage.setItem('isLogin', false);
        },
        selectTeam(state, team) {
            state.isSelectTeam = true;
            state.selectTeam.teamId = team.teamId;
            state.selectTeam.teamName = team.teamName;
            localStorage.setItem('isSelectTeam', state.isSelectTeam);
            localStorage.setItem('selectTeam', JSON.stringify(state.selectTeam));
        },
        selectProject(state, project) {
            state.isSelectProject = true;
            state.selectProject.proId = project.proId;
            state.selectProject.proName = project.proName;
            localStorage.setItem('isSelectProject', state.isSelectProject);
            localStorage.setItem('selectProject', JSON.stringify(state.selectProject));
        },
        init(state){
            state.isLogin = localStorage.getItem('isLogin') !== null;
            const localLoginUser = localStorage.getItem('loginUser');
            if(localLoginUser !== null){
                state.loginUser = JSON.parse(localLoginUser);
            }
            const localSelectTeam = localStorage.getItem('selectTeam');
            if(localSelectTeam !== null){
                state.selectTeam = JSON.parse(localSelectTeam);
            }
            const localSelectProject = localStorage.getItem('selectProject');
            if(localSelectProject !== null){
                state.selectProject = JSON.parse(localSelectProject);
            }
            state.isSelectTeam = localStorage.getItem('isSelectTeam') !== null;
            state.isSelectProject = localStorage.getItem('isSelectProject') !== null;
        }
    },
    actions: {

    },
    modules: {

    }
})