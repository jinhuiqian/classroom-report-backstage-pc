<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>
        
        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

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
  export default {
  name: 'Home',
  components: {
    SideBar,
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