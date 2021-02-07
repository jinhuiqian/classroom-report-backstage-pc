<template>
<v-app class="container">
    
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
  <v-btn class="button">处理完成</v-btn>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          { text: '编号', value: 'id'},
          { text: '教室', value: 'classroom' },
          { text: '卫生情况', value: 'hygiene' },
          { text: '是否异常', value: 'abnormal' },
          { text: '时间', value: 'time' },
          { text: '评分', value: 'score' },
          { text: '详情', value: 'details' },
        ],
        desserts: [
          {
            id: 1,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '',
            details: '详情',
          },
          {
            id: 2,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '',
            details: '详情',
          },
          {
            id: 3,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '',
            details: '详情',
          },
          {
            id: 4,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '',
            details: '详情',
          },
          {
            id: 5,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '',
            details: '详情',
          },
        ],
      }
    },
  }
</script>

<style scoped>
.container {
    height: 800px;
    border-radius: 10px;
    box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
    background-color: #fefefe;
}
.button{
    width: 100px;
    margin-left: auto;
    margin-top: 20px;
}

</style>