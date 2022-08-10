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
            isGraph: false,
            graph: {
                graphId: "",
                graphName: "",
            },
            isProto: false,
            proto: {
                protoId: "",
                protoName: "",
            },
            list: {
                listType: "",
            }
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
        graph(state, graph) {
            state.isGraph = true;
            state.graph.graphId = graph.graphId;
            state.graph.graphName = graph.graphName;
            localStorage.setItem('graph', JSON.stringify(state.graph));
        },
        proto(state, proto){
            state.isProto = true;
            state.proto.protoId = proto.protoId;
            state.proto.protoName = proto.protoName;
            localStorage.setItem('proto', JSON.stringify(state.proto));
        },
        list(state, list){
            state.list.listType = list.listType;
            localStorage.setItem('list', JSON.stringify(state.list))
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
            const localGraph = localStorage.getItem('graph');
            if (localGraph !== null){
                state.graph = JSON.parse(localGraph)
            }
            const localProto = localStorage.getItem('proto');
            if (localProto !== null){
                state.proto = JSON.parse(localProto)
            }
            const localList = localStorage.getItem('list');
            if (localList !== null){
                state.list = JSON.parse(localList)
            }
            state.isSelectTeam = localStorage.getItem('isSelectTeam') !== null;
            state.isSelectProject = localStorage.getItem('isSelectProject') !== null;
            state.isGraph = localStorage.getItem('isGraph') !== null;
            state.isProto = localStorage.getItem('isProto') !== null;
        }
    },
    actions: {

    },
    modules: {

    }
})