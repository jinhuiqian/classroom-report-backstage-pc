<template>
<div class="bg">

  <div class="a">
    <el-table v-loading="loading" :data="playlist" stripe>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column label="教室"></el-table-column>
      <el-table-column label="卫生情况"></el-table-column>
      <el-table-column label="是否异常"></el-table-column>
      <el-table-column label="时间"></el-table-column>
      <el-table-column label="评分">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>

    <el-row justify="center" type="flex">
      <el-col :span="10">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="20"
      layout="sizes, prev, pager, next"
      :total="1000"
      class="b"
      >
    </el-pagination>
    </el-col>
    </el-row>

  </div>
</div>
</template>

<script>

export default {

}
</script>

<style scoped>
.bg{
      background-color: #d3dce6;
      background-size: cover;
      position: absolute;
      width: 100%;
      height: 100%;
}
.a{
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 30px;
}
.b{
  padding-top: 15px;
}
</style>
