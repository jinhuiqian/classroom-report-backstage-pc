<template>
<div class="bg">

  <div class="a">
    <el-table v-loading="loading" :data="reportList" stripe>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column label="教室" prop="classroom"></el-table-column>
      <el-table-column label="卫生情况" prop="weisheng"></el-table-column>
      <el-table-column label="其他情况" prop="yichang"></el-table-column>
      <el-table-column label="提交时间">
      </el-table-column>
      <el-table-column label="评分">

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

    <!-- 详情对话框 -->
    <el-dialog
    :title="title"
    :visible.sync="detailReportVisible"
    width="60%"
    >
    <el-row :gutter="10">
      <el-col :span="5">
        教室：{{report.classroom}}
      </el-col>
      <el-col :span="5">
        提交时间： {{report.time | parseTime("{y}-{m}-{d} {h}:{i}")}}
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="5">
        桌椅是否有异常：{{reportDetail.yz}}
      </el-col>
      <el-col :span="5">
        空调是否有异常: {{reportDetail.kt}}
      </el-col>
      <el-col :span="5">
        窗户是否有异常: {{reportDetail.ch}}
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="5">
        投影仪是否有异常：{{reportDetail.tyy}}
      </el-col>
      <el-col :span="5">
        门禁是否有异常: {{reportDetail.mj}}
      </el-col>
      <el-col :span="5">
        实训设备是否有异常: {{reportDetail.sxsb}}
      </el-col>
    </el-row>

    <h4>详细描述</h4>
    <el-row :gutter="20">
      {{reportDetail.des}}
    </el-row>

    <h4>图片</h4>
    <el-row :gutter="20">
      <el-col :span="10" v-for="(item,index) in reportDetail.imgs" :key="index" class="col">
        <img :src="item" width="100" height="100"/>
      </el-col>
      <el-col :span="5">
        <div class="block">
            <span class="demonstration">卫生评分</span>
              <el-rate
                v-model="value"
                :colors="colors"
                >
              </el-rate>
        </div>
      </el-col>
      <el-col span="5">
      <el-button @click="editRating">修改评分</el-button>
      <el-button @click="detailReportVisible = false">关闭</el-button>
      </el-col>
    </el-row>
    </el-dialog>

  </div>
</div>
</template>

<script>
import { fetchNList,fetchDetail,update } from "@/api/report"
import scroll from "@/utils/scroll"

export default {
  data() {
    return {
      reportList: [],
      count: 50,
      loading: false,
      detailReportVisible: false,
      report: {},
      reportDetail: [],
      title: "报告详情",
      value1: '',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
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
      fetchNList({
        start: this.reportList.length,
        count: this.count,
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
        this.report = res.data;
        this.reportDetail = res.data.reportDetail[0]
      });
    },
    editRating() {
      const reportId = this.report._id;
      updateScore({
        _id: reportId,
        value: this.value,
      }).then(res => {
        this.value=res.data
      })
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
