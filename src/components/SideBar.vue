<template>
  <v-card max-width="200">

      <v-list-item @click="$router.push('/allreports')">
        <v-list-item-content>
          <v-list-item-title>所有报告</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="$router.push('/exceptionreport')">
        <v-list-item-content>
          <v-list-item-title>异常报告</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="$router.push('/data')">
        <v-list-item-content>
          <v-list-item-title>查看数据</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="$router.push('/authority')">
        <v-list-item-content>
          <v-list-item-title>权限设置</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item>
      <v-list-item-content>
      <v-list-item-title>Refresh</v-list-item-title>
      </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

  </v-card>
</template>

<script>
export default {

data: () => ({
    
  }),
}
</script>

<style lang="scss">

</style>
