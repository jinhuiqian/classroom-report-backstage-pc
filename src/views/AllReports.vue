<template>
  <v-card class="container">
    <v-card-title>
      所有报告
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: '编号', value: 'id',sortable: false},
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
            hygiene: '正常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '及格',
            details: '详情'
          },
          {
            id: 2,
            classroom: '323教室',
            hygiene: '正常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '及格',
            details: '详情'
          },
          {
            id: 3,
            classroom: '323教室',
            hygiene: '正常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '及格',
            details: '详情'
          },
          {
            id: 4,
            classroom: '323教室',
            hygiene: '正常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '及格',
            details: '详情'
          },
          {
            id: 5,
            classroom: '323教室',
            hygiene: '正常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            score: '及格',
            details: '详情'
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
</style>