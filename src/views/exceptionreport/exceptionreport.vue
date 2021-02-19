<template>
<div class="bg">

  <div class="a">
    <el-table v-loading="loading" :data="reportList" stripe>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column label="教室" prop="classroom"></el-table-column>
      <el-table-column label="卫生情况" prop="weisheng"></el-table-column>
      <el-table-column label="是否异常" prop="yichang"></el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <span>
            {{scope.row.updateTime | parseTime("{y}-{m}-{d} {h}:{i}")}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button size="mini" type="text" @click="showDetail(scope.row)"
        >查看详情</el-button>
      </template>
      </el-table-column>
    </el-table>

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

  <!-- 博客详情对话框 -->
    <el-dialog
    :title="reportDetail.content"
    :visible.sync="detailReportVisible"
    width="70%"
    >

    <span slot="footer" class="dialog-footer">
      <el-button @click="detailReportVisible = false">关闭</el-button>
    </span>
    </el-dialog>

</div>
</template>

<script>
import { fetchList } from "@/api/report"
import scroll from "@/utils/scroll"

export default {
  data() {
    return {
      reportList: [],
      count: 50,
      loading: false,
      detailReportVisible: false,
      reportDetail: {}
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    scroll.start(this.getList);
  },
  methods: {
    getList() {
      this.loading = true;
      fetchList({
        start: this.reportList.length,
        count: this.count
      }).then(res => {
        const data = res.data;
        let _reportList = [];
        for (let i = 0, len = data.length; i < len;i++) {
          _reportList.push(JSON.parse(data[i]));
        }
        this.reportList = this.reportList.concat(_reportList);
        if(_reportList.length < this.count) {
          scroll.end();
        }
        this.loading = false;
      });
    },
    //显示详情
    showDetail(report) {
      this.detailReportVisible = true;
      const reportId = report._id;
      fetchDetail({
        reportId
      }).then(res => {
        console.log(res.data);
        this.reportDetail = res.data;
      });
    },
  }
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
