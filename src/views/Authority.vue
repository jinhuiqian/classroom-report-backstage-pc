<template>
<v-app class="container">
    <div>
        <h2>添加管理员</h2>
        <v-spacer></v-spacer>
        <v-form class="col" style="height:320px;width:500px">
        <v-text-field label="姓名"></v-text-field>

        <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="工号"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="手机号"></v-text-field>
        </v-col>  
        </v-row>

        <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="密码"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="重复密码"></v-text-field>
        </v-col>  
        </v-row>
            <v-btn class="button">添加管理员</v-btn>
        </v-form>
    </div>

  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="单选"
        class="pa-3"
      ></v-switch>
    </template>
  </v-data-table>
  <v-btn class="button">注销账号</v-btn>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          { text: '工号', value: 'number'},
          { text: '姓名', value: 'name' },
          { text: '手机号', value: 'phone' },
          { text: '权限', value: 'authority' },
          { text: '创建时间', value: 'time' },
          
        ],
        desserts: [
          {
            number: '1902343213',
            name: '钱锦辉',
            phone: '18552415135',
            authority: '管理员',
            time: '2021/2/6',
          },
          
        ],
      }
    },
  }
</script>

<style scoped>
.container {
    height: auto;
    border-radius: 10px;
    box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
    background-color: #fefefe;
}
.button{
    width: 100px;
    margin-top: 20px;
}
.col {
    flex: 0 0 40%;
    background-color: #fefefe;
    border-radius: 10px;
    z-index: 10;
  }
</style>