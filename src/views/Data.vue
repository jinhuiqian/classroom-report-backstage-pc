<template>
<div class="container">

<v-row>
    <v-col cols="12" md="6">
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        User Registrations
      </div>
      <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
    </v-col>
</v-row>

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
  <v-btn class="button">导出数据</v-btn>

  </div>
</template>

<script>
  export default {
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      singleSelect: false,
        selected: [],
        headers: [
          { text: '编号', value: 'id'},
          { text: '教室', value: 'classroom' },
          { text: '卫生情况', value: 'hygiene' },
          { text: '是否异常', value: 'abnormal' },
          { text: '时间', value: 'time' },
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
            details: '详情',
          },
          {
            id: 2,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            details: '详情',
          },
          {
            id: 3,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            details: '详情',
          },
          {
            id: 4,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            details: '详情',
          },
          {
            id: 5,
            classroom: '323教室',
            hygiene: '异常',
            window: '正常',
            abnormal: '正常',
            time: '2021/2/6',
            details: '详情',
          },
        ],
    }),
  }
</script>

<style scoped>
.container {
    height: 800px;
    border-radius: 10px;
    box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
    background-color: #fefefe;
}
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
  .button{
    width: 100px;
    margin-top: 20px;
}
</style>