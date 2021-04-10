<template>
  <div class="bg">
    <div class="a">
      <el-table
        v-loading="loading"
        :data="
          reportList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        stripe
        class="table"
      >
        <el-table-column type="index" width="50" label="编号"></el-table-column>
        <el-table-column
          label="教室"
          prop="classroom"
          sortable
        ></el-table-column>
        <el-table-column
          label="提交班级"
          prop="user_class"
          sortable
        ></el-table-column>
        <el-table-column label="提交时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.time | parseTime("{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分" prop="score" sortable>
          <template slot-scope="scope">
            <el-rate
              disabled
              text-color="#ff9900"
              v-model="scope.row.score"
              show-score
            >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showDetail(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-row justify="center" type="flex">
        <el-col :span="10">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="reportList.length * 10 - 10"
          >
          </el-pagination>
        </el-col>
      </el-row>

      <el-button @click="showFilter" type="primary" class="button"
        >筛选</el-button
      >
      <el-button @click="exportExcel" type="primary" class="button"
        >导出</el-button
      >
    </div>

    <!-- 详情对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="detailReportVisible"
      width="80%"
      top="50px"
    >
      <el-row :gutter="15">
        <el-col :span="5"> 提交班级：{{ report.user_class }} </el-col>
        <el-col :span="5"> 提交人: {{ reportDetail.username }} </el-col>
        <el-col :span="5">
          提交时间： {{ report.time | parseTime("{y}-{m}-{d} {h}:{i}") }}
        </el-col>
      </el-row>

      <h4>教室信息</h4>
      <el-row :gutter="10">
        <el-col :span="5"> 教室：{{ report.classroom }} </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="5">桌椅是否有异常：{{ reportDetail.table }}</el-col>
        <el-col :span="5"
          >空调是否有异常: {{ reportDetail.air_conditioning }}</el-col
        >
        <el-col :span="5">窗户是否有异常: {{ reportDetail.windows }}</el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="5"
          >投影仪是否有异常：{{ reportDetail.projector }}</el-col
        >
        <el-col :span="5"
          >门禁是否有异常: {{ reportDetail.access_control }}</el-col
        >
        <el-col :span="5"
          >实训设备是否有异常: {{ reportDetail.equipment }}</el-col
        >
      </el-row>

      <h4>详细描述</h4>
      <el-row :gutter="20">
        {{ reportDetail.describe }}
      </el-row>

      <h4>图片</h4>
      <el-row :gutter="20">
        <el-col
          :span="2"
          v-for="(item, index) in report.img"
          :key="index"
          class="col"
        >
          <!-- <img :src="item" width="100" height="100" /> -->
          <el-image
            style="width: 100px; height: 100px"
            :src="item"
            :preview-src-list="report.img"
          >
          </el-image>
        </el-col>
      </el-row>

      <hr />
      <el-row :gutter="15">
        <el-col :span="5">处理人：{{ reportDetail.handler }}</el-col>
        <el-col :span="10">反馈: {{ reportDetail.feedback }}</el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <span class="demonstration">卫生评分</span>
        <el-rate v-model="value" :colors="colors" show-score=""> </el-rate>
        <el-button @click="editRating">修改评分</el-button>
        <!-- <el-button type="primary" @click="onSubmit">处 理</el-button> -->
        <el-button type="primary" @click="open">处 理</el-button>
      </span>
    </el-dialog>

    <!-- 筛选对话框 -->
    <el-dialog
      :title="title1"
      :visible.sync="filterVisible"
      width="70%"
      top="50px"
    >
      <el-row :gutter="14">
        <el-col :span="7">
          教室：
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch1"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>

        <el-col :span="7">
          提交班级：
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch2"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="14">
        <el-col :span="14">
          <div class="block">
            时间范围：
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="14">
        <el-col :span="7">
          评分：
          <el-select v-model="value3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value3"
              :label="item.label1"
              :value="item.value3"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="screening">筛 选</el-button>
        <!-- <el-button type="primary" @click="onSubmit">处 理</el-button> -->
        <el-button type="primary">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchNList,
  fetchDetail,
  updateStatus,
  updateScore,
  updateFeedback,
  filter,
  filtertime,
} from "@/api/report";
import scroll from "@/utils/scroll";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      reportList: [],
      loading: false,
      detailReportVisible: false,
      filterVisible: false,
      report: {},
      reportDetail: [],
      title: "报告详情",
      title1: "筛选",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      value: "",
      currentPage: 1, //初始页
      pagesize: 2, //每页的数据
      restaurants1: [],
      restaurants2: [],
      state1: "",
      state2: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7; //对小于开始日期范围禁用,否则反之即可
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      options: [
        {
          value3: null,
          label1: null,
        },
        {
          value3: 1,
          label1: 1,
        },
        {
          value3: 2,
          label1: 2,
        },
        {
          value3: 3,
          label1: 3,
        },
        {
          value3: 4,
          label1: 4,
        },
        {
          value3: 5,
          label1: 5,
        },
      ],
      value3: "",
      options1: [
        {
          value4: null,
          label2: null,
        },
        {
          value4: 1,
          label2: "已处理",
        },
        {
          value4: 2,
          label2: "未处理",
        },
      ],
      value4: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    scroll.start(this.getList);
    this.restaurants1 = this.loadAll1();
    this.restaurants2 = this.loadAll2();
  },
  computed: {
    ...mapGetters(["admin"]),
  },
  methods: {
    getList() {
      this.loading = true;
      fetchNList({
        start: this.reportList.length,
      }).then((res) => {
        const data = res.data;
        console.log("*****************");
        console.log(data);
        console.log("*****************");
        let _reportList = [];
        for (let i = 0, len = data.length; i < len; i++) {
          _reportList.push(JSON.parse(data[i]));
        }
        this.reportList = this.reportList.concat(_reportList);
        if (_reportList.length < this.count) {
          scroll.end();
        }
        this.loading = false;
      });
    },
    //显示详情
    showDetail(report) {
      this.detailReportVisible = true;
      const reportId = report._id;
      this.value = report.score;
      fetchDetail({
        reportId,
      }).then((res) => {
        this.report = res.data;
        let one = this.report.time.$numberDouble.toString().split('E')[0].split('.')[0]
        let two = this.report.time.$numberDouble.toString().split('E')[0].split('.')[1]
        this.report.time = one+two
        console.log(this.report.time);
        this.reportDetail = res.data.reportDetail[0];
        console.log(this.reportDetail);
      });
    },
    //显示筛选
    showFilter() {
      this.filterVisible = true;
    },
    editRating() {
      const reportId = this.report._id;
      updateScore({
        _id: reportId,
        value: this.value,
      }).then((res) => {
        this.value = res.data;
        this.reportList = [];
        this.getList();
        this.detailReportVisible = false;
      });
    },

    onSubmit() {
      updateStatus(this.report).then((res) => {
        console.log(res);
        if (res.data.modified > 0) {
          this.$message({
            message: "处理完成",
            type: "success",
          });
          this.editRating();
        } else {
          this.$message.error("已处理");
        }
      });
      this.detailReportVisible = false;
    },

    // 导出表格所用
    exportExcel() {
      this.pagesize = 1000;
      this.currentPage = 1;

      this.$nextTick(function () {
        // 设置当前日期
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let name = year + "" + month + "" + day;
        // console.log(name)
        /* generate workbook object from table */
        //  .table要导出的是哪一个表格
        var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          //  name+'.xlsx'表示导出的excel表格名字
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            name + ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        this.pagesize = 2;
        return wbout;
      });
    },

    //分页用到的一些方法
    handleSizeChange: function (size) {
      this.pagesize = size;
      // console.log(this.pagesize)//每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage)  //点击第几页
    },

    open() {
      const reportId = this.report._id;
      this.$prompt("请输入反馈", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          updateFeedback({
            reportId: reportId,
            feedback: value,
            username: this.admin.username,
          }).then((res) => {
            this.onSubmit();
          });
          this.$message({
            type: "success",
            message: "已提交",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    querySearch1(queryString, cb) {
      var restaurants1 = this.restaurants1;
      var results = queryString
        ? restaurants1.filter(this.createFilter(queryString))
        : restaurants1;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2(queryString, cb) {
      var restaurants2 = this.restaurants2;
      var results = queryString
        ? restaurants2.filter(this.createFilter(queryString))
        : restaurants2;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll1() {
      return [
        { value: "教四323" },
        { value: "教四121" },
        { value: "教四123" },
        { value: "教四222" },
      ];
    },
    loadAll2() {
      return [
        { value: "软件1921" },
        { value: "软件1911" },
        { value: "大数据1911" },
        { value: "移动1921" },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    screening() {
      // let report = {
      //   classroom: this.state1,
      //   user_class: this.state2,
      //   score: this.value3,
      //   status: this.value4
      // }
      let start = new Date(this.value2[0]).getTime();
      let end = new Date(this.value2[1]).getTime();
      filtertime({
        start: start,
        end: end,
      }).then((res) => {
        this.reportList = [];
        this.reportList = res.data.data;
        console.log(this.reportList);
      });
      this.filterVisible = false;
    },
  },
};
</script>
<style scoped>
.bg {
  background-color: #d3dce6;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
.a {
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 30px;
}
.b {
  padding-top: 15px;
}
</style>
