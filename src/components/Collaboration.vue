<template>
  <el-button style="height: 50px" text @click="isOpen = true">
    {{editors.length}} 人编辑， 最后修改：{{formatTime(lastModifier.time)}} by {{lastModifier.nickname}}
  </el-button>
  <el-drawer v-model="isOpen" :with-header="false" size="300px" :modal="true">
    <span
        class="participants"
    >
      参与协作成员：
    </span>
    <div class="participant" v-for="editor of editors" v-bind:key="editor" style="display: flex;">
      <el-avatar :size="50" :src="'http://43.138.71.108/api/user/get-avatar/?userId=' + editor.userId" />
      <div
        style="height: 20px; margin: auto auto auto 20px"
      >
        {{editor.nickname}}
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {getData, onDataChange, writeData} from "@/collaboration/db";
import {ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import {ElMessage} from "element-plus";
import {onUnmounted} from "vue";

export default {
  name: "Collaboration",
  props: {
    id: Number,
    type: String, // 可以为 doc, uml , prototype
  },
  expose: ['update', 'setSetter', 'start', 'setGetter', 'save'],
  data() {
    return {
      isOpen: false,
    }
  },

  setup(props) {

    let setContent;
    let getContent;
    const userId = useStore().state.loginUser.userId;
    const nickname = useStore().state.loginUser.nickname;
    // eslint-disable-next-line vue/no-setup-props-destructure
    let id = props.id;
    if(props.type === 'uml'){
      id = useStore().state.graph.graphId;
    }else if(props.type === 'prototype'){
      id = useStore().state.proto.protoId;
    }
    console.log('in collaboration, id is' + id)
    const keepEditTime = 3000;
    const checkUpdateTime = 500;
    let needUpdate = false;
    const editors = ref([]);
    const lastModifier = ref({userId: userId, nickname: nickname, time: new Date().getTime()});
    let intervalId1;
    let intervalId2;

    const getGetRoute = () => {
      if(props.type === 'doc'){
        return 'document/get';
      }else if(props.type === 'uml'){
        return 'graph/get';
      }else if(props.type === 'prototype'){
        return 'prototype/get';
      }
    }
    const getSaveRoute = () => {
      if(props.type === 'doc'){
        return 'document/save';
      }else if(props.type === 'uml'){
        return 'graph/save';
      }else if(props.type === 'prototype'){
        return 'prototype/save';
      }
    }
    const getGetParam = () => {
      if(props.type === 'doc'){
        return {docId: id};
      }else if(props.type === 'uml'){
        return {graphId: id};
      }else if(props.type === 'prototype'){
        return {protoId: id};
      }
    }
    const getSaveParam = (content) => {
      if(props.type === 'doc'){
        return {docId: id, userId : userId, content: content};
      }else if(props.type === 'uml'){
        return {graphId: id, userId : userId, content: content};
      }else if(props.type === 'prototype'){
        return {protoId: id, userId : userId, content: content};
      }
    }

    const getPath = () => {
      if(props.type === 'doc'){
        return 'doc/' + id;
      }else if(props.type === 'uml'){
        return 'uml/' + id;
      }else if(props.type === 'prototype'){
        return 'prototype/' + id;
      }
    }
    const getContentPath = () => {
      return getPath() + '/content'
    }
    const getUsersPath = () => {
      return getPath() + '/users'
    }
    const getLastModifierPath = () => {
      return getUsersPath() + '/lastModifier';
    }
    const getEditorsPath = () => {
      return getUsersPath() + '/editors';
    }

    const setGetter = (getter) => {
      console.log("setGetter!");
      getContent = getter;
    };
    const setSetter = (setter) => {
      console.log("setSetter!");
      setContent = setter;
    };


    const start = () => {
      console.log('共享组件开始执行，准备获得编辑信息')
      getData(getUsersPath()).then((res) => {
        console.log('已获得编辑信息，准备更新编辑信息（申请）')
        let newEditorNumber = 1;
        const newEditors = [{userId: userId, nickname: nickname, time: new Date().getTime()}];

        if(res !== null && res.editors !== null) {
          for (const editor of res.editors) {
            if (editor.userId === userId) {
              continue;
            } else if (new Date().getTime() - editor.time <= keepEditTime) {
              newEditorNumber++;
              newEditors.push(editor);
            } else {
              break;
            }
          }
        }
        console.log('将新的修改信息复制给响应式变量');
        editors.value = newEditors;
        if(res === null || res.lastModifier === null){
          lastModifier.value = {userId: userId, nickname: nickname, time: new Date().getTime()};
        }else {
          lastModifier.value = res.lastModifier;
        }

        writeData(getUsersPath(), {
          lastModifier: lastModifier.value,
          editors: editors.value,
        })


        if (editors.value.length === 1) {
          console.log('编辑人数为1，从数据库获得内容')
          axios.get(getGetRoute(), {
            params: getGetParam()
          }).then(async res => {
            if (res.data.content !== '') {
              console.log('数据库中有内容，获得')
              setContent(JSON.parse(res.data.content))
            }
          }).catch(err => {
            console.log(err)
            ElMessage({message: '获得内容失败', type: 'warning'})
          })
        } else {
          console.log('编辑人数大于1，从firebase获得内容')
          getData(getContentPath()).then(res => {
            setContent(res);
          })
        }

        console.log("设置定时器任务")
        intervalId1 = setInterval(() => {
          getData(getUsersPath()).then((res) => {
            let newEditorNumber = 1;
            const newEditors = [{userId: userId, nickname: nickname, time: new Date().getTime()}];

            for (const editor of res.editors) {
              if (editor.userId === userId) {
                continue;
              } else if (new Date().getTime() - editor.time <= keepEditTime) {
                newEditorNumber++;
                newEditors.push(editor);
              } else {
                break;
              }
            }
            // console.log('将新的修改信息复制给响应式变量');
            editors.value = newEditors;
            writeData(getEditorsPath(), editors.value);
          });
        }, keepEditTime - 1000);
        intervalId2 = setInterval(() => {
          if(needUpdate === false)return;
          needUpdate = false;
          writeData(getContentPath(), getContent()).then(() => {
            lastModifier.value = {userId: userId, nickname: nickname, time: new Date().getTime()};
            writeData(getLastModifierPath(), lastModifier.value);
          });
        }, checkUpdateTime);

        console.log('设置firebase的modifier变化监听器')
        onDataChange(getLastModifierPath(), (res) => {
          if (res.userId !== userId) {
            getData(getContentPath()).then(res => {
              setContent(res);
            });
            lastModifier.value = res;
          }
        });

      });
    }





    const update = () => {
      needUpdate = true;

    };
    onUnmounted(() => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    });
    const save = () => {
      axios.post(getSaveRoute(), getSaveParam(JSON.stringify(getContent()))).then(() => {
        ElMessage({message: '保存成功', type: 'success'})
      }).catch((err) => {
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    };

    const formatTime = (time) => {
      return new Date(time).toString().substring(10, 25)
    }


    return {
      setGetter,
      setSetter,
      update,
      save,
      start,
      editors,
      lastModifier,
      formatTime,
    };
  },
  created() {
    console.log('collaboration are created!')
    console.log('id is ', this.id)
  }

}
</script>

<style scoped>
.participants {
  font-size: 20px;
  font-weight: bold;
  line-height: 25px;
  width: 100%;
  height: 50px;
  border-bottom: 2px dashed lightgrey;
}

.participant {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
}

.participant:hover {
  background-color: rgb(0 0 0 / 8%);
}
</style>