<template>
  <v-app>
  <nav-bar></nav-bar>
   
  <v-main class="grey lighten-3 container">
  <div class="main">
      <v-row>
        <v-col cols="12" md="6">
          <h1>详情页</h1>
        </v-col>
        <v-col cols="12" md="6">
        </v-col>  
        </v-row>
    <v-divider></v-divider>

        <v-row>
        <v-col cols="12" md="6">
          <h3>教室：敬业楼（教四）323</h3>
        </v-col>
        <v-col cols="12" md="6">
          <h3>时间：2021/2/7 12:24</h3>
        </v-col>  
        </v-row>

        <v-row>
        <v-col cols="12" md="6">
          <h3>桌椅是否异常：正常</h3>
        </v-col>
        <v-col cols="12" md="6">
          <h3>空调是否异常：正常</h3>
        </v-col>  
        </v-row>

        <v-row>
        <v-col cols="12" md="6">
          <h3>窗户是否异常：正常</h3>
        </v-col>
        <v-col cols="12" md="6">
          <h3>投影仪是否异常：正常</h3>
        </v-col>  
        </v-row>

        <v-row>
        <v-col cols="12" md="6">
          <h3>门禁是否异常：正常</h3>
        </v-col>
        <v-col cols="12" md="6">
          <h3>实训设备（工具）是否异常：正常</h3>
        </v-col>  
        </v-row>

        <v-row>
        <v-col cols="12" md="6">
          <h3>详细描述：</h3>
        </v-col> 
        </v-row>

        <div class="des">
        </div>

    <v-row class="sub">
    <v-col cols="12" md="6">
    <v-rating
      v-model="rating"
      background-color="red lighten-3"
      color="red"
      large
    ></v-rating>
    </v-col>
    <v-col cols="12" md="6">
        <v-btn>提交</v-btn>
    </v-col>
    </v-row>

  </div>
  </v-main>
    
  </v-app>
</template>

<script>
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'

  export default {
  name: 'Details',
  components: {
    SideBar,
    NavBar
  },
  data(){
    return{}
  },

  created(){},
  methods: {}
  }
</script>
<style scoped>
.container{
  position: relative;
  height: 100%;
  width: 100%;
}
.main{
height: 600px;
width: 700px;
background-color: #fefefe;
border-radius: 10px;
margin-top: 20px;
box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
margin: 0 auto;
text-align: left;
margin-top: 20px;
padding-left: 20px;
}
.des{
    height: 200px;
    width: 660px;
    background-color: gray;
}
.sub{
    margin-top: 20px;
}
</style>