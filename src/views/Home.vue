<template>
  <v-app>
  <nav-bar></nav-bar>
   
  <v-main class="grey lighten-3 container">
  <v-row align="start">
    <v-spacer></v-spacer>
    <v-col cols="12" md="2" class="mt-5">
      <side-bar></side-bar>
    </v-col>
    <v-col cols="12" md="7" class="mt-5">
      <router-view />
    </v-col>
        <v-spacer></v-spacer>
  </v-row>
    </v-main>
    
  </v-app>
</template>

<script>
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'

  export default {
  name: 'Home',
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
</style>