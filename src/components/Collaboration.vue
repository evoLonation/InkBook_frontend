<template>
  <el-button @click="isOpen = true">
    {{lastModifyTime.toString().substring(10, 25)}} by {{lastModifier}}
  </el-button>
<div>Collaboration{{docId}}</div>
  <div>编辑人数：{{editorNumber}}</div>
  <div v-for="id in editors" v-bind:key="id">{{id}}</div>
  <el-drawer v-model="isOpen" :with-header="false" size="300px" :modal="true">
    <span style="font-size: 20px">参与协作成员：</span>
    <div></div>
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
    docId: Number,
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
    // eslint-disable-next-line vue/no-setup-props-destructure
    const docId = props.docId;
    const keepEditTime = 2500;
    const checkUpdateTime = 1000;
    let needUpdate = false;
    const editorNumber = ref(0);
    const editors = ref([]);
    const lastModifier = ref('');
    const lastModifyTime = ref(new Date());
    let intervalId1;
    let intervalId2;

    const getPath = () => {
      return 'doc/' + props.docId;
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
        const newEditors = [{userId: userId, time: new Date()}];
        const newEditorIds = [userId];
        if(res !== null && res.editors !== undefined) {
          console.log(res, res.editors)
          for (const editor of res.editors) {
            if (editor.userId === userId) {
              continue;
            } else if (editor.time.getTime() - new Date().getTime() <= keepEditTime) {
              newEditorNumber++;
              newEditors.push(editor);
              newEditorIds.push(editor.userId);
            } else {
              break;
            }
          }
        }
        console.log('将新的修改信息复制给响应式变量');
        editors.value = newEditorIds;
        editorNumber.value = newEditorNumber;
        if(res === null || res.lastModifier === undefined){
          lastModifier.value = userId;
          lastModifyTime.value = new Date().getTime();
        }else {
          lastModifier.value = res.lastModifier.userId;
          lastModifyTime.value = res.lastModifier.time;
        }

        writeData(getUsersPath(), {
          lastModifier: {userId: lastModifier.value, time: lastModifyTime.value},
          editors: newEditors,
        })


        if (editorNumber.value === 1) {
          console.log('编辑人数为1，从数据库获得内容')
          axios.get('document/get', {
            params: {
              userId: userId,
              docId: parseInt(docId),
            }
          }).then(async res => {
            if (res.data.content !== '') {
              console.log('数据库中有内容，获得')
              setContent(JSON.parse(res.data.content))
            }
          }).catch(err => {
            console.log(err)
            ElMessage({message: '获得文档内容失败', type: 'warning'})
          })
        } else {
          console.log('编辑人数不为1，从firebase获得内容')
          getData(getContentPath()).then(res => {
            setContent(res);
          })
        }
        console.log("设置定时器任务")
        intervalId1 = setInterval(() => {
          getData(getEditorsPath()).then((res) => {
            let newEditorNumber = 1;
            const newEditors = [{userId: userId, time: new Date()}];
            const newEditorIds = [userId];

            for (const editor of res) {
              if (editor.userId === userId) {
                continue;
              } else if (editor.time.getTime() - new Date().getTime() <= keepEditTime) {
                newEditorNumber ++;
                newEditors.push(editor);
                newEditorIds.push(editor.userId);
              } else {
                break;
              }
            }
            writeData(getEditorsPath(), newEditors);
            editors.value = newEditorIds;
            editorNumber.value = newEditorNumber;
          });
        }, keepEditTime);
        intervalId2 = setInterval(() => {
          needUpdate = true;
        }, checkUpdateTime);

        console.log('设置firebase的modifier变化监听器')
        onDataChange(getLastModifierPath(), (res) => {
          if (res.userId !== userId) {
            getData(getContentPath()).then(res => {
              setContent(res);
            });
          }
        });

      });
    }





    const update = () => {
      if(needUpdate === false)return;
      needUpdate = false;
      writeData(getContentPath(), getContent());
      writeData(getLastModifierPath(), {userId: userId, time: new Date()});
    };
    onUnmounted(() => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    });
    const save = () => {
      axios.post('document/save', {
        "docId" : parseInt(docId),
        "userId" : userId,
        "content" : getContent(),
      }).then(() => {
        ElMessage({message: '保存成功', type: 'success'})
      }).catch((err) => {
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    };



    return {
      setGetter,
      setSetter,
      update,
      save,
      start,
      editorNumber,
      editors,
      lastModifier,
      lastModifyTime
    };
  },
  created() {
    console.log('i am created!')
  }

}
</script>

<style scoped>

</style>